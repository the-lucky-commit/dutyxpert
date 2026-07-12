# Duty Xpert Security Website

Production-oriented Next.js website for บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด.

## Stack

- Next.js 16 / React 19
- TypeScript strict
- Tailwind CSS v4
- File-backed admin translations/contact submissions
- File-backed articles/news CMS for admin-managed SEO content
- Vercel for temporary/dev public URL
- cPanel/Nokhosting-compatible Node runtime via `server.js`

## Scripts

```bash
npm run dev        # local development
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run build      # production build using webpack fallback
npm run check      # lint + typecheck + build
npm run build:cpanel-bundle # local build + create cPanel deploy artifact
npm start          # production Node server for cPanel/Passenger
```

`npm run build` intentionally uses `next build --webpack` and `next.config.ts` limits worker usage. This keeps builds stable on shared hosting environments that restrict process/thread creation.

## Required environment variables

Copy `.env.example` and configure real values outside git.

```bash
ADMIN_USERNAME=
ADMIN_PASSWORD=
SESSION_SECRET=
DUTYXPERT_DATA_DIR=
```

Notes:

- `SESSION_SECRET` must be at least 32 characters.
- `DUTYXPERT_DATA_DIR` should point outside the app directory on persistent servers, for example `/home/dutyxcnk/dutyxpert-data`.
- On Vercel, use `/tmp/dutyxpert-data`; this is writable but ephemeral, so do not treat it as permanent storage.
- Admin-created articles are stored in `articles.json` under `DUTYXPERT_DATA_DIR`. Back up this directory before server moves or redeploy workflows that replace hosting storage.

## Optional email notification

Contact submissions are persisted to `contact-submissions.jsonl`. To also send email notifications, configure:

```bash
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASSWORD=
CONTACT_RECIPIENT=
```

## Deployment

### Vercel temporary URL

The current temporary/dev public URL is:

```text
https://dutyxpert.vercel.app
```

Deploy:

```bash
vercel deploy . --prod -y
```

### Nokhosting/cPanel

Node app configuration:

- Application root: `/home/dutyxcnk/dutyxpert-app`
- Startup file: `server.js`
- Node version: 22.x
- Production env should include `DUTYXPERT_DATA_DIR=/home/dutyxcnk/dutyxpert-data`

Duty Xpert deploys to cPanel from a prebuilt artifact at:

```text
deploy/dutyxpert-cpanel.tar.gz
```

Do not run `npm install` or `npm run build` on cPanel as a routine deploy step. This is a shared hosting environment and process/resource limits can interrupt Next.js builds. Build locally, commit the refreshed artifact, then use cPanel Git Version Control.

Deploy flow:

```bash
npm run check
npm run build:cpanel-bundle
git add .
git commit -m "..."
git push origin main
```

Then in cPanel Git Version Control:

1. Click `Update from Remote`.
2. Click `Deploy HEAD Commit`.
3. Verify production.

`.cpanel.yml` extracts `deploy/dutyxpert-cpanel.tar.gz` into `/home/dutyxcnk/dutyxpert-app` and touches `tmp/restart.txt` to restart the Node app.

## Production checklist

- Run `npm run check` before deploy.
- Run `npm run build:cpanel-bundle` and commit `deploy/dutyxpert-cpanel.tar.gz` before cPanel deploys that need a new `.next` build.
- Confirm required env variables exist on the target platform.
- Confirm `/login` does not expose any mock credentials.
- Confirm `/admin` redirects without a valid session and loads after login.
- Confirm `/admin` article create/edit/publish writes to persistent `DUTYXPERT_DATA_DIR`.
- Configure SMTP before expecting contact-form email notifications.
- After domain migration, run/verify AutoSSL on hosting.
