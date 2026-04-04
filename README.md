# WebDisha — React Website

Complete production-ready React website for WebDisha digital services agency.
SpaceEdu-inspired dark space aesthetic with full mobile responsiveness.

---

## 🚀 Quick Start (5 Minutes)

### Step 1 — Create React App

```bash
npx create-react-app webdisha
cd webdisha
```

### Step 2 — Delete default files you don't need

```bash
# Mac / Linux
rm src/App.css src/App.test.js src/logo.svg src/reportWebVitals.js src/setupTests.js

# Windows (Command Prompt)
del src\App.css src\App.test.js src\logo.svg src\reportWebVitals.js src\setupTests.js
```

### Step 3 — Create folders

```bash
# Mac / Linux
mkdir src/components src/data src/hooks src/styles

# Windows
mkdir src\components src\data src\hooks src\styles
```

### Step 4 — Copy all files

Copy every file from this project into the matching folders.

### Step 5 — Replace package.json

Replace the contents of `package.json` with the one from this project.

### Step 6 — Run the project

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. ✅

---

## 📁 Complete File Structure

```
webdisha/
├── package.json                  ← Project config & dependencies
├── public/
│   └── index.html                ← HTML shell with Google Fonts
└── src/
    ├── index.js                  ← React entry point
    ├── App.js                    ← Main app — assembles all sections
    │
    ├── data/
    │   └── index.js              ← ⭐ ALL content lives here
    │
    ├── hooks/
    │   ├── useReveal.js          ← Scroll-reveal (IntersectionObserver)
    │   ├── useScrollProgress.js  ← Nav + progress bar (rAF throttled)
    │   └── useCounter.js         ← Animated number counters
    │
    ├── styles/
    │   └── global.css            ← Stars, marquee, shared base styles
    │
    └── components/
        ├── Navbar.jsx            ← Desktop nav + mobile hamburger drawer
        ├── Hero.jsx              ← Typewriter + SVG sphere + stat counters
        ├── Marquee.jsx           ← Scrolling ticker banner
        ├── Packages.jsx          ← 4 pricing cards
        ├── Process.jsx           ← 4-step how we work
        ├── Services.jsx          ← 3D tilt hover cards
        ├── Portfolio.jsx         ← Before & after hover reveal
        ├── Testimonials.jsx      ← Star-rated client reviews
        ├── SocialPacks.jsx       ← Social media packages
        ├── Maintenance.jsx       ← Monthly maintenance plans + notes
        ├── WhyUs.jsx             ← 6 reason grid
        ├── Contact.jsx           ← CTA section with all contact links
        ├── Footer.jsx            ← Footer with nav links
        └── WhatsAppButton.jsx    ← Fixed floating WhatsApp button
```

---

## ✏️ How to Edit Content

### Change phone, email, WhatsApp, address
Open `src/data/index.js` → edit the `SITE` object at the top:

```js
export const SITE = {
  name: 'WebDisha',
  phone: '75871 82520',
  phoneHref: 'tel:7587182520',
  whatsapp: 'https://wa.me/917587182520',  // Replace with your number
  email: 'webdishaa@gmail.com',
  instagram: 'https://instagram.com/webdishaa',
  instagramHandle: '@webdishaa',
  location: 'Raipur, Chhattisgarh',
};
```

### Change pricing
Open `src/data/index.js` → edit the `PACKAGES` array:

```js
{ name: 'Starter Website', price: '₹4,999', delivery: '2–3 Days', ... }
```

### Add a testimonial
Open `src/data/index.js` → add to `TESTIMONIALS` array:

```js
{
  stars: 5,
  text: 'Your client review here.',
  name: 'Client Name',
  role: 'Business, City',
  init: 'C',   // First letter for avatar
},
```

### Add a portfolio project
Open `src/data/index.js` → add to `PORTFOLIO` array:

```js
{
  tag: 'Category',
  name: 'Business Name',
  meta: 'Package · City',
  before: 'What was wrong before',
  after: 'What we delivered',
},
```

### Remove a section
Open `src/App.js` and comment out the component:

```jsx
{/* <Portfolio /> */}   ← This hides the Portfolio section
```

---

## 📱 Mobile Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|---------------|
| 1024px    | Reduced padding, smaller sphere |
| 768px     | Hamburger nav, sphere hidden, single column cards |
| 480px     | Smaller fonts, 2-column grids |
| 360px     | Full single column, stacked buttons |

---

## ⚡ Performance Features

- **CSS-only stars** — Zero JavaScript canvas loop
- **rAF-throttled scroll** — Direct DOM for progress bar, no re-renders
- **Single IntersectionObserver** — One observer watches ALL scroll-reveal elements
- **React.memo on Sphere** — SVG sphere never re-renders
- **3D tilt disabled on mobile** — Saves battery on touch devices
- **will-change: transform** — GPU compositing on animated elements

---

## 🏗️ Build for Production

```bash
npm run build
```

This creates a `build/` folder ready to deploy on:
- **Netlify** — Drag & drop the `build/` folder
- **Vercel** — `vercel --prod`
- **cPanel / Shared Hosting** — Upload contents of `build/` to `public_html/`

---

## 🔧 Common Issues

**Fonts not loading?**
Make sure your internet is connected when running locally.
The Google Fonts are loaded in `public/index.html`.

**Styles look broken?**
Make sure `src/styles/global.css` is imported in `src/index.js`.

**WhatsApp link not working?**
Update the phone number in `src/data/index.js`:
```js
whatsapp: 'https://wa.me/91XXXXXXXXXX'  // Replace X with your 10-digit number
```

---

## 📞 Support

Built for WebDisha, Raipur CG
Contact: webdishaa@gmail.com | @webdishaa
