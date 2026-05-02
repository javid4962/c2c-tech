# Render Deployment Guide

This project deploys best on Render as two services:

- Backend API: Render **Web Service** from `server/`
- Frontend app: Render **Static Site** from `client/`

The backend connects to MongoDB Atlas, serves `/api/*`, handles admin and learner authentication, stores content, and handles uploads. The frontend is a Vite React app that calls the backend through `VITE_API_URL`.

## 1. Prerequisites

Before deploying, prepare:

- A GitHub repository containing this project.
- A MongoDB Atlas cluster and connection string.
- A strong `JWT_SECRET`.
- A strong `OTP_HASH_SECRET`.
- Optional Cloudinary credentials for persistent image uploads.
- Optional SMTP credentials for contact inquiry emails.
- Optional SMS provider webhook credentials for phone OTP delivery.

## 2. MongoDB Atlas Setup

1. Open MongoDB Atlas.
2. Create or select a cluster.
3. Create a database user with read/write permissions.
4. In **Network Access**, allow Render to connect.
5. For a first deployment, you can temporarily allow `0.0.0.0/0`.
6. Copy the connection string.

Use a database name in the connection string, for example:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/c2c-tech?retryWrites=true&w=majority
```

This app also supports public DNS fallback for Atlas SRV lookups:

```env
MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1
MONGODB_SERVER_SELECTION_TIMEOUT_MS=10000
```

## 3. Deploy Backend API On Render

The API service must not use Render's default `npm run build` command from the server folder. Use the commands below.

1. In Render, click **New +**.
2. Choose **Web Service**.
3. Connect the GitHub repository.
4. Configure the service:

```text
Name: c2c-tech-api
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm run start
```

5. Add environment variables:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your-mongodb-atlas-uri
MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1
MONGODB_SERVER_SELECTION_TIMEOUT_MS=10000
JWT_SECRET=use-a-long-random-secret
CLIENT_URL=https://your-frontend-name.onrender.com

ADMIN_EMAIL=admin@c2ctech.com
ADMIN_PASSWORD=use-a-strong-admin-password

OTP_LENGTH=6
OTP_EXPIRES_MINUTES=10
OTP_HASH_SECRET=use-a-long-random-otp-secret
SMS_PROVIDER_URL=
SMS_PROVIDER_TOKEN=
SMS_SENDER_ID=C2C

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
CONTACT_RECEIVER_EMAIL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=c2c-tech
```

6. Deploy the service.
7. After deployment, open:

```text
https://your-api-name.onrender.com/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "API is running"
}
```

The base backend URL also returns a clean API status:

```text
https://your-api-name.onrender.com/
```

If you already created the service and it failed with `npm error Missing script: "build"`, open the Render service settings and change:

```text
Build Command: npm install
Start Command: npm run start
```

Then click **Manual Deploy > Deploy latest commit**.

## Optional: Render Blueprint

This repository includes `render.yaml`. You can deploy both services from Render's **New + > Blueprint** flow. Render will still ask you to fill secret values such as `MONGODB_URI`, `JWT_SECRET`, `OTP_HASH_SECRET`, `CLIENT_URL`, and `VITE_API_URL`.

## 4. Deploy Frontend Static Site On Render

1. In Render, click **New +**.
2. Choose **Static Site**.
3. Connect the same GitHub repository.
4. Configure the static site:

```text
Name: c2c-tech-client
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: dist
```

5. Add the frontend environment variable:

```env
VITE_API_URL=https://your-api-name.onrender.com/api
```

6. Add a rewrite rule for React Router:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

7. Deploy the static site.

## 5. Update Backend CORS

After the frontend deploys, copy the frontend URL and update the backend `CLIENT_URL` variable:

```env
CLIENT_URL=https://your-frontend-name.onrender.com
```

If you use multiple frontend URLs, separate them with commas:

```env
CLIENT_URL=https://your-frontend-name.onrender.com,https://www.yourdomain.com
```

Redeploy the backend after changing this value.

## 6. Apply Seeded Website Content

The server creates default data on first startup. To force-refresh the updated website content in an existing database, use Render Shell on the backend service:

```bash
npm run content:refresh
```

This refreshes site settings, services, blogs, jobs, case studies, and courses. It does not delete users, contacts, applications, enrollments, or admin accounts.

If Render Shell is unavailable on your plan, run the same command locally with the production `MONGODB_URI` in `server/.env`.

## 7. Uploads And Cloudinary

Without Cloudinary, uploaded files are stored on the Render instance filesystem. Render disks are ephemeral unless you configure persistent storage, so production image uploads should use Cloudinary.

Set these variables on the backend service:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=c2c-tech
```

Resume uploads that are not images remain local unless you extend the upload logic for document storage.

## 8. Phone OTP Notes

Phone OTP works in two modes:

- Development/no SMS provider: OTP is logged by the server and returned as `devOtp` outside production.
- Production/SMS provider: configure `SMS_PROVIDER_URL` and `SMS_PROVIDER_TOKEN`.

The current SMS integration posts this JSON payload:

```json
{
  "to": "+917093182525",
  "message": "Your C2C Tech Solutions verification code is 123456. It expires in 10 minutes.",
  "sender": "C2C"
}
```

If your SMS provider requires a different request format, update `server/src/utils/sendSms.js`.

## 9. Admin Login

The first backend startup creates an admin user if one does not exist:

```env
ADMIN_EMAIL=admin@c2ctech.com
ADMIN_PASSWORD=use-a-strong-admin-password
```

Admin login URL:

```text
https://your-frontend-name.onrender.com/admin/login
```

Change the default admin password before deploying to a public environment.

## 10. Deployment Checklist

- Backend health endpoint returns success.
- Frontend opens without a blank screen.
- Browser console has no CORS errors.
- Public pages load settings, services, blogs, courses, and case studies.
- Admin login works.
- Learner email login/register works.
- Phone OTP request/verify works with your SMS provider.
- Contact form stores inquiries.
- Career application form works.
- Cloudinary image upload works if configured.

## 11. Common Render Issues

`MongoDB connection failed: querySrv ECONNREFUSED`

Set:

```env
MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1
```

Then redeploy the backend.

`MongoDB host is not reachable`

Check MongoDB Atlas **Network Access**. Render must be allowed to connect. Temporarily use `0.0.0.0/0` if you do not have stable outbound IPs.

`CORS error in browser`

Set backend `CLIENT_URL` to the exact frontend Render URL and redeploy the backend.

`Frontend API calls go to localhost`

Set frontend `VITE_API_URL` to:

```env
VITE_API_URL=https://your-api-name.onrender.com/api
```

Then redeploy the frontend.

`Page refresh returns 404`

Add the static site rewrite:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

`Uploaded images disappear`

Configure Cloudinary. Render instance storage is not reliable for production uploads unless persistent disk storage is explicitly configured.
