# ⚔️ Warrior Dad Stories — Team Development Guide

Welcome to the Warrior Dad Stories project.

This is a collaborative React + Vite + Tailwind website built to match the approved Figma designs while giving students real-world frontend development experience.

Please read this ENTIRE document before starting work.

---

# 🌐 Live Project Goal

Warrior Dad Stories is a cinematic storytelling platform focused on:
- military service
- fatherhood
- leadership
- poetry
- storytelling
- book/media promotion

This project includes:
- public-facing pages
- responsive layouts
- admin dashboard scaffolding
- reusable UI systems
- future CMS/backend expansion

---

# 🛠️ Tech Stack

This project uses:

- React
- Vite
- Tailwind CSS
- React Router DOM

---

# 📁 Project Structure

```txt
src
 ├── components
 │    └── layout
 │         ├── Navbar.jsx
 │         └── Footer.jsx
 │
 ├── pages
 │    ├── Home.jsx
 │    ├── About.jsx
 │    ├── Blog.jsx
 │    ├── Contact.jsx
 │    ├── Forge.jsx
 │    ├── Shop.jsx
 │    ├── PreOrder.jsx
 │    │
 │    └── admin
 │         ├── AdminAccess.jsx
 │         ├── AdminDash.jsx
 │         ├── BlogManagement.jsx
 │         ├── MediaLibrary.jsx
 │         ├── NewPost.jsx
 │         ├── NewProduct.jsx
 │         ├── ProductManagement.jsx
 │         ├── SiteSettings.jsx
 │         └── TimeLineManagement.jsx


 🚀 How To Run The Project
1. Clone The Repository
git clone https://github.com/laurenabigailparker/warrior-dad-stories.git
2. Open The Project
cd warrior-dad-stories
3. Install Dependencies
npm install
4. Start Development Server
npm run dev
⚠️ IMPORTANT RULES
🚫 NEVER PUSH DIRECTLY TO MAIN

DO NOT DO THIS:

git push origin main

Main is protected.

You MUST create your own branch first.

🌿 HOW TO CREATE YOUR OWN BRANCH

Before starting ANY ticket:

git checkout -b feature/about-page

OR

git checkout -b feature/blog-page

Branch names should match your ticket.

Examples:

feature/about-page
feature/blog-page
feature/contact-page
feature/admin-dashboard
feature/media-library
🔄 BEFORE STARTING WORK

Always pull the newest version first:

git pull origin main

Then create your branch.

💾 HOW TO SAVE YOUR WORK
1. Add Changes
git add .
2. Commit Changes
git commit -m "Built About page layout"
3. Push Your Branch
git push origin feature/about-page
🔥 HOW TO SUBMIT YOUR WORK

After pushing your branch:

Open GitHub
Click:
Compare & Pull Request
Submit your PR
Wait for review before merging
🎨 DESIGN RULES

All pages should match the Warrior Dad Stories design system.

Use:
dark navy/black backgrounds
gold accent colors
uppercase headings
cinematic spacing
serif italic supporting text
rounded dark cards
smooth hover effects
📱 RESPONSIVENESS

ALL pages must work on:

desktop
tablet
mobile

Test responsiveness before submitting PRs.

🧱 ADMIN DASHBOARD

The admin system is currently:
✅ frontend scaffold only

NOT implemented yet:

authentication
backend
CMS
uploads
database
protected routes

Use mock data arrays only for now.

🔗 ROUTES
Public Routes
/
/about
/blog
/contact
/forge
/shop
/preorder
Admin Routes
/admin
/admin/dashboard
/admin/blog
/admin/blog/new
/admin/products
/admin/products/new
/admin/media
/admin/settings
/admin/timeline
🧠 STUDENT EXPECTATIONS

YOU are expected to:

refine layouts
improve responsiveness
match Figma spacing
replace placeholders
build reusable components
clean up typography
improve hover states

YOU are NOT expected to:

build backend
implement authentication
configure databases
create APIs
implement Stripe
deploy production backend systems
📦 DEPLOYMENT

This project uses:

Vercel

Deployment should ONLY happen from:

main branch
🪖 Final Notes

This project is structured intentionally to simulate a real-world frontend team workflow.

Take your time.
Ask questions.
Communicate clearly.
Keep code organized.
Do not panic.

You are here to learn and build.

# ⚠️ Files You Should NOT Edit

Unless specifically assigned, DO NOT edit:

```txt
src/App.jsx
src/main.jsx
vite.config.js
tailwind.config.cjs
postcss.config.cjs
package.json
```

These files affect the entire application and can break routing, styling, or builds.

Most work should happen inside:

```txt
src/pages/
src/pages/admin/
src/components/
```

— Lauren Parker