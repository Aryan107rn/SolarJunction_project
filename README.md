# SolarJunction LLP ☀️

**Clean Energy. Smarter Future.**

A full-stack marketing and lead generation website built for SolarJunction LLP, a local solar panel installation business based in Nagpur, Maharashtra. The goal of this project is to establish a professional online presence, convert visitors into leads, and give the business owner full control over their projects and customer reviews without needing a developer.

---

## Tech Stack

**Frontend** — React 19, Vite, Tailwind CSS v4, Framer Motion, React Icons, pnpm

**Backend** — Node.js, Express, Nodemailer, MongoDB Atlas, Mongoose, Cloudinary, JWT, Multer

---

## Project Structure

```
solarjunction/
├── client/                   # React frontend
│   ├── src/
│   │   ├── assets/           # Logo, hero image, certificates
│   │   ├── components/       # Navbar, Marquee, Loader, CursorGlow, ScrollToTop, CalcButton, WhatsApp
│   │   ├── sections/         # Hero, Services, About, FAQ, Contact, Footer
│   │   └── pages/            # Admin dashboard
└── server/                   # Express backend
    ├── models/               # Project and Review schemas
    ├── routes/               # projects, reviews, admin, contact
    ├── middleware/            # JWT auth, Cloudinary upload
    └── index.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/solarjunction.git
cd solarjunction
```

### 2. Setup the backend

```bash
cd server
pnpm install
```

Create a `.env` file inside `server/` using `.env.example` as reference and fill in all values.

```bash
node index.js
```

Server runs at `http://localhost:5000`

### 3. Setup the frontend

```bash
cd client
pnpm install
pnpm run dev
```

Frontend runs at `http://localhost:5173`

---

## Environment Variables

### server/.env

| Variable | Description |
|----------|-------------|
| `EMAIL_USER` | Gmail address used to send emails |
| `EMAIL_PASS` | Gmail App Password (not your account password) |
| `OWNER_EMAIL` | Email where lead notifications are sent |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary dashboard |
| `JWT_SECRET` | Random 32 character string (`openssl rand -hex 32`) |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `ALLOWED_ORIGINS` | Comma separated allowed frontend URLs |

### client/.env

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend URL (localhost in dev, Render URL in production) |

---

## Features

**Public Website**
- Animated hero section with real project background image
- Services and Projects tabs in one section
- About us with team values
- Customer reviews (approved by admin before going live)
- FAQ and Legal/Compliance section with certificate modal
- Contact form that sends branded email to user and lead notification to owner
- Solar Savings Calculator popup — user enters their monthly bill and gets a full savings report
- WhatsApp direct chat button
- Custom cursor, page loader, scroll to top, marquee strip

**Admin Dashboard** (`/admin`)
- Password protected login
- Upload real project photos with details (stored on Cloudinary)
- View and delete projects
- Approve or reject customer submitted reviews
- All changes reflect on the live website instantly

---

## Deployment

**Backend → Render (free tier)**
1. Push code to GitHub
2. Create new Web Service on Render
3. Set build command: `pnpm install`
4. Set start command: `node index.js`
5. Add all environment variables from `server/.env`

**Frontend → Vercel (free tier)**
1. Import GitHub repo on Vercel
2. Set root directory to `client`
3. Add environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy

After deploying, update `ALLOWED_ORIGINS` on Render to include your Vercel URL.

---

## Security Notes

- Never commit `.env` files to GitHub — both are in `.gitignore`
- Gmail App Password is different from your account password
- JWT tokens expire in 24 hours
- Image uploads are restricted to jpg, png, webp under 5MB
- Customer reviews require admin approval before appearing publicly

---

## Built By

**Aryan** — [aryangoing100x.com](https://aryangoing100x.com)

---

## License

Proprietary. Built exclusively for SolarJunction LLP. All rights reserved © 2025.
