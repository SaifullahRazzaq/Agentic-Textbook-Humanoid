import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const db = new Database("auth.db");

const allowedOrigins = process.env.TRUSTED_ORIGINS
    ? process.env.TRUSTED_ORIGINS.split(",")
    : ["http://localhost:3000"];

const auth = betterAuth({
    database: db,
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            softwareBackground: {
                type: "string",
                required: false,
                input: true,
            },
            hardwareBackground: {
                type: "string",
                required: false,
                input: true,
            },
        },
    },
    trustedOrigins: allowedOrigins,
});

const app = new Hono();

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

app.on(["POST", "GET"], "/api/auth/**", (c) => {
    console.log(`[Auth] ${c.req.method} ${c.req.url}`);
    return auth.handler(c.req.raw);
});

const port = parseInt(process.env.PORT || "3001");

serve({
    fetch: app.fetch,
    port: port,
}, (info) => {
    console.log(`Auth server listening on http://localhost:${info.port}`);
});
