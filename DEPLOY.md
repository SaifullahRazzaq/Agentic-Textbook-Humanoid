# Deployment Guide

This guide explains how to deploy the **Auth Server** and connect it to your **Frontend** on Vercel.

## 1. Deploying the Auth Server (Backend)

Since your backend uses `better-sqlite3` (a local file database), you need a hosting provider that supports persistent storage or Docker. **Railway** or **Render** are great choices.

### Option A: Deploy on Railway (Recommended)

1.  **Push your code** to GitHub.
2.  Go to [Railway.app](https://railway.app/) and sign up/login.
3.  Click **"New Project"** -> **"Deploy from GitHub repo"**.
4.  Select your repository.
5.  **Important Configuration**:
    *   Click on the new service card.
    *   Go to **Settings** -> **Root Directory**. Set it to `/auth-server`.
    *   Go to **Variables**. Add the following:
        *   `PORT`: `3001`
        *   `TRUSTED_ORIGINS`: `https://your-vercel-frontend-url.vercel.app` (Replace with your actual Vercel URL).
6.  **Persistent Storage** (Optional but recommended):
    *   To keep your user data after redeploys, you need to mount a volume for the database file.
    *   In Railway, add a Volume and mount it to `/app` (or wherever the db is). *Note: SQLite on serverless can be tricky. For production, consider switching to PostgreSQL (Supabase/Neon) supported by `better-auth`.*

### Option B: Deploy on Render

1.  Go to [Render.com](https://render.com/).
2.  Create a **"Web Service"**.
3.  Connect your GitHub repo.
4.  **Settings**:
    *   **Root Directory**: `auth-server`
    *   **Runtime**: Docker
    *   **Environment Variables**:
        *   `TRUSTED_ORIGINS`: `https://your-vercel-frontend-url.vercel.app`
5.  **Disk**: Add a Disk to persist `auth.db` if needed.

## 2. Updating Frontend on Vercel

Once your backend is live (e.g., `https://auth-server-production.up.railway.app`), you need to tell your frontend where to find it.

1.  Go to your project on **Vercel**.
2.  Go to **Settings** -> **Environment Variables**.
3.  Add a new variable:
    *   **Key**: `NEXT_PUBLIC_BETTER_AUTH_URL`
    *   **Value**: `https://your-backend-url.com` (The URL from Railway/Render).
4.  **Redeploy** your frontend (Go to Deployments -> Redeploy).

## Summary of Changes Made

*   **`auth-server/Dockerfile`**: Created to allow deployment on any platform supporting Docker.
*   **`auth-server/package.json`**: Added `build` and `start` scripts.
*   **`auth-server/index.ts`**: Updated to read `TRUSTED_ORIGINS` and `PORT` from environment variables.
*   **`src/lib/auth-client.ts`**: Updated to read `NEXT_PUBLIC_BETTER_AUTH_URL` from environment variables.
