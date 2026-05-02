# C2C Tech Solutions Enterprise Platform

A premium MERN-stack C2C Tech Solutions website inspired by the structure and flow of large consulting platforms, while using fully original content, styling, and data models.

## Stack

- MongoDB
- Express + Node.js
- React + Vite
- Tailwind CSS
- Framer Motion
- JWT authentication with learner phone OTP support

## Highlights

- Dynamic company profile powered by MongoDB
- Secure admin dashboard with JWT login
- Learner email/password login and phone number OTP authentication
- CRUD management for services, blogs, jobs, and case studies
- Editable contact details, logo, homepage hero, about content, industries, testimonials, and leadership team
- Careers page with resume upload
- Contact form API with email hook via Nodemailer
- Rich text blog editor support
- SEO meta handling on public pages
- Responsive premium UI with animation

## Dynamic Content Stored In MongoDB

- `AdminUsers`
- `Services`
- `Blogs`
- `Jobs`
- `Applications`
- `Contacts`
- `CaseStudies`
- `SiteSettings`

`SiteSettings` holds brand-wide editable content such as company name, logo, contact details, homepage hero content, leadership team, testimonials, industries, and social links.

## Project Structure

```text
.
|-- client
|   |-- src
|   |   |-- api
|   |   |-- components
|   |   |-- context
|   |   |-- hooks
|   |   |-- pages
|   |   |-- routes
|   |   `-- utils
|   |-- .env.example
|   `-- package.json
|-- server
|   |-- src
|   |   |-- config
|   |   |-- controllers
|   |   |-- middleware
|   |   |-- models
|   |   |-- routes
|   |   |-- seed
|   |   `-- utils
|   |-- uploads
|   |-- .env.example
|   `-- package.json
|-- package.json
`-- README.md
```

## Seeded Defaults

On first server startup, the app ensures default records exist for:

- Company name: `C2C Tech Solutions`
- Contact details:
  - `info@c2ctech.com`
  - `+91-7093182525`
  - `Vijayawada, Andhra Pradesh`
- Services:
  - EduTech Solutions
  - Digital Marketing
  - IT Services
  - Staffing Solutions
- Premium blog content
- Sample jobs
- Case studies
- Courses
- Default admin user

## Default Admin Login

These values are controlled by server environment variables and seeded if missing:

- Email: `admin@c2ctech.com`
- Password: `Admin@123`

Change them in `server/.env` before running in a shared or production environment.

## Environment Setup

### 1. Server

Copy `server/.env.example` to `server/.env` and update values:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/c2c-tech-solutions
MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1
MONGODB_SERVER_SELECTION_TIMEOUT_MS=10000
JWT_SECRET=replace-with-a-strong-secret
CLIENT_URL=http://localhost:5173

ADMIN_EMAIL=admin@c2ctech.com
ADMIN_PASSWORD=change-this-before-production

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
CONTACT_RECEIVER_EMAIL=

OTP_LENGTH=6
OTP_EXPIRES_MINUTES=10
OTP_HASH_SECRET=replace-with-a-strong-otp-secret
SMS_PROVIDER_URL=
SMS_PROVIDER_TOKEN=
SMS_SENDER_ID=C2C

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=c2c-tech
```

Notes:

- If SMTP variables are not provided, contact inquiries are still stored in MongoDB and email sending is skipped gracefully.
- If Cloudinary variables are not provided, uploads use the local `server/uploads` directory.

### 2. Client

Copy `client/.env.example` to `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation

From the project root:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

Or use the helper script after root install:

```bash
npm run install-all
```

## Run Locally

### Start MongoDB

Make sure MongoDB is running locally or point `MONGODB_URI` to your hosted database.

### Start both apps

```bash
npm run dev
```

### Start separately

```bash
npm run dev --prefix server
npm run dev --prefix client
```

Server:

- API: `http://localhost:5000/api`

Client:

- App: `http://localhost:5173`

## Useful Scripts

```bash
npm run dev
npm run build
npm run seed
npm run content:refresh
```

Server only:

```bash
npm run dev --prefix server
npm run seed --prefix server
npm run content:refresh --prefix server
```

Client only:

```bash
npm run build --prefix client
```

Content refresh:

```bash
npm run content:refresh
```

This reapplies the refreshed premium website content, images, video-backed hero settings, services, blogs, jobs, case studies, and courses to an existing MongoDB database. It updates site settings and replaces known seeded/default content records, while leaving users, contacts, applications, enrollments, and admin accounts intact.

## Admin Features

The admin panel supports:

- JWT login authentication
- Dashboard analytics
- CRUD for services
- CRUD for blogs
- CRUD for jobs
- CRUD for case studies
- Editable global site settings
- Inquiry review workflow
- Application review workflow
- Asset uploads

## Public Site Pages

- Home
- Services
- Service detail
- About
- Case studies
- Case study detail
- Blog
- Blog detail
- Careers
- Contact

## Validation and Security Notes

- Public forms use backend validation for required fields and email formats
- Admin actions are protected by JWT middleware
- Public blog rendering is sanitized with DOMPurify before HTML output
- File uploads are restricted by mime type and size

## Verification

Verified locally in this workspace:

- `npm run build --prefix client`
- server module import check via `node -e "import('./src/app.js')..."`

## Notes

- The current Quill 2 editor wrapper still reports a low-severity upstream advisory in `npm audit`; the app sanitizes rendered blog HTML on the public site.
- This project is intentionally branded for `C2C Tech Solutions`, but all company-specific content is editable through MongoDB-backed admin settings and content collections.
