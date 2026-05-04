---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm

```bash
npm install -g pnpm
```

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/solarjunction.git
cd solarjunction
```

### 2. Run Frontend

```bash
cd client
pnpm install
pnpm run dev
```

Frontend runs at → `http://localhost:5173`

### 3. Run Backend

```bash
cd server
pnpm install
```

Create `server/.env`:

```env
EMAIL_USER=solarjunctionllp@gmail.com
EMAIL_PASS=your_gmail_app_password
OWNER_EMAIL=solarjunctionllp@gmail.com
```

> ⚠️ Never push `.env` to GitHub. It is already in `.gitignore`.

```bash
node index.js
```

Backend runs at → `http://localhost:5000`

---
## Structure

solarjunction/
├── client/          # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Marquee.jsx
│   │   │   ├── CursorGlow.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── CalcButton.jsx
│   │   │   └── WhatsApp.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── server/          # Node/Express backend
├── index.js
├── mailer.js
├── .env
└── package.json

## ✨ Features

- 🎨 Earthy Sage & Sunburst color theme
- 🌀 Smooth Framer Motion animations throughout
- ⚡ Solar Savings Calculator popup
- 📧 Auto email to user + owner on form submit
- 💬 WhatsApp floating button with pre-filled message
- 📱 Fully responsive with mobile hamburger menu
- 🖱️ Custom cursor glow effect
- 🔄 Page loader on first visit
- ☝️ Scroll to top button
- 🏅 Legal, FAQ & Certifications section
- 📊 Animated stats counter in Hero
- 🎯 Marquee scrolling strip

---

## 📬 Contact

**SolarJunction LLP**

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:solarjunctionllp@gmail.com)

- 📍 Nagpur, Maharashtra, India

---

## 👨‍💻 Developer

Built with ❤️ by **Aryan** — [going100x](https://aryangoing100x.com)

---

## 📄 License

This project is proprietary and built exclusively for **SolarJunction LLP**.
All rights reserved © 2025 SolarJunction.
