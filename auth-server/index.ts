import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { rateLimiter } from "hono-rate-limiter";

const db = new Database("auth.db");

const allowedOrigins = process.env.TRUSTED_ORIGINS
    ? process.env.TRUSTED_ORIGINS.split(",")
    : ["http://localhost:3000"];

const auth = betterAuth({
    database: db,
    emailAndPassword: {
        enabled: true,
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
    },
    session: {
        expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        autoRefresh: true,
    },
    user: {
        additionalFields: {
            softwareBackground: {
                type: "string",
                required: false,
                input: true,
            },
            learningGoal: {
                type: "string",
                required: false,
                input: true,
            },
        },
    },
    trustedOrigins: allowedOrigins,
});

const app = new Hono();

// Rate Limiter middleware
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // Temporarily increased limit for debugging
    standardHeaders: 'draft-6', // draft-6: `RateLimit-...` headers; draft-7: `Sec-RateLimit-...` headers
    keyGenerator: (c) => c.req.header('x-forwarded-for') || 'unknown',
    // store: ... , // Use an external store for more resilient rate limiting
});

app.use(
    "*",
    cors({
        origin: allowedOrigins,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true,
    })
);

// Apply rate limiter to auth routes
app.use("/api/auth/*", limiter);

app.get("/", (c) => {
    return c.json({ message: "Auth server is running!" });
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
    console.log(`[Auth] ${c.req.method} ${c.req.url}`);
    return auth.handler(c.req.raw);
});

// Basic error handling for auth routes
app.onError((err, c) => {
    console.error(`[Auth Error] ${err.message}`);
    return c.json({ error: err.message }, 500);
});

const port = parseInt(process.env.PORT || "3001");

serve({
    fetch: app.fetch,
    port: port,
}, (info) => {
    console.log(`Auth server listening on http://localhost:${info.port}`);
});
