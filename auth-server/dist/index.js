"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const better_auth_1 = require("better-auth");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const hono_rate_limiter_1 = require("hono-rate-limiter");
const db = new better_sqlite3_1.default("auth.db");
const allowedOrigins = process.env.TRUSTED_ORIGINS
    ? process.env.TRUSTED_ORIGINS.split(",")
    : ["http://localhost:3000"];
const auth = (0, better_auth_1.betterAuth)({
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
const app = new hono_1.Hono();
// Rate Limiter middleware
const limiter = (0, hono_rate_limiter_1.rateLimiter)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // Temporarily increased limit for debugging
    standardHeaders: 'draft-6', // draft-6: `RateLimit-...` headers; draft-7: `Sec-RateLimit-...` headers
    keyGenerator: (c) => c.req.header('x-forwarded-for') || 'unknown',
    // store: ... , // Use an external store for more resilient rate limiting
});
app.use("*", (0, cors_1.cors)({
    origin: allowedOrigins,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
}));
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
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: port,
}, (info) => {
    console.log(`Auth server listening on http://localhost:${info.port}`);
});
