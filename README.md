# Duty Xpert Security Website

Production-oriented Next.js website for บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด.

## Stack

- Next.js 16 / React 19
- TypeScript strict
- Tailwind CSS v4
- File-backed admin translations/contact submissions
- Vercel for temporary/dev public URL
- cPanel/Nokhosting-compatible Node runtime via `server.js`

## Scripts

```bash
npm run dev        # local development
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run build      # production build using webpack fallback
npm run check      # lint + typecheck + build
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

After uploading source:

```bash
npm ci --include=dev
npm run build
npm prune --omit=dev
mkdir -p tmp && touch tmp/restart.txt
```

## Production checklist

- Run `npm run check` before deploy.
- Confirm required env variables exist on the target platform.
- Confirm `/login` does not expose any mock credentials.
- Confirm `/admin` redirects without a valid session and loads after login.
- Configure SMTP before expecting contact-form email notifications.
- After domain migration, run/verify AutoSSL on hosting.
