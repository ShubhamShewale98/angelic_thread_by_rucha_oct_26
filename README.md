# Angelic Thread product manager

React storefront and admin UI with a Node.js serverless API. Product fields follow the included catalog: `name` (legacy JSON also uses `title`), `price`, `category`, `image`, `description`, and optional `tag`. Products are stored in MongoDB; uploaded product images are hosted by ImageKit.

## Local setup

1. Install Node.js 20 or newer and run `npm install`.
2. Copy `.env.example` to `.env` and fill in MongoDB and ImageKit credentials.
3. Run `npm run dev`. The React app runs on Vite; the local API runs on port 3001.
4. Open `/admin` to manage products.

Create a MongoDB Atlas database and allow network access from your deployment (Atlas can allow Vercel IP ranges only if using a suitable network setup; for a quick deployment, configure Atlas network access appropriately). Create an ImageKit account and use its URL endpoint and keys.

## API

- `GET /api/products` — list products.
- `POST /api/products` — create product; requires `x-user-id`.
- `PUT /api/products/:id` — replace product details; requires `x-user-id`.
- `DELETE /api/products/:id` — delete product; requires `x-user-id`.
- `POST /api/upload` — upload an image; requires `x-user-id`. Send `multipart/form-data` with a `file` field (max 5 MB).

Set `ADMIN_USER_ID` and `VITE_ADMIN_USER_ID` to the same private value in production. The default `shubham123` is included only to match the requested header check and is not suitable as a production secret. Header checks are not a substitute for real user authentication because browser users can inspect and reuse them.

## Vercel deploy

Import this repository in Vercel with the project root set to `New folder/angelic-thread` (or deploy from this directory using the Vercel CLI). Configure `MONGODB_URI`, `MONGODB_DB`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT`, `ADMIN_USER_ID`, and `VITE_ADMIN_USER_ID` in Project Settings → Environment Variables, then deploy. The `api/` handlers and `vercel.json` route the React app and product API.

## Git

The workspace has an existing Git repository one directory above this app. Review `git status` and the remote before committing so the new app is pushed to the intended repository. Push with `git add`, `git commit`, then `git push` after configuring the desired remote.
