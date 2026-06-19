# Bajoria Consultancy

Modern, professional single-page website for **Bajoria Consultancy**.

**Tagline:** "Empowering Minds, Shaping Futures"

## 🚀 Quick Start

1. **Open directly**
   - Double-click `index.html` in your file explorer
   - Or drag the file into any modern browser (Chrome, Edge, Firefox, Safari)

2. **Recommended: Serve locally** (better for development)
   ```bash
   # Using Python (built-in)
   python -m http.server 8000

   # Then visit http://localhost:8000
   ```

   Or with Node.js:
   ```bash
   npx http-server -p 8000
   ```

## ✨ Features (Redesigned)

- **Corporate premium UI/UX** inspired by TCS, Infosys, Wipro
- Deep navy + teal professional palette
- Large, confident hero with powerful messaging
- **Industries We Serve** section
- **Insights / Thought Leadership** teasers
- **Trusted By** + prominent client stories
- **FAQ** + strong lead generation
- Working contact form with consent
- Floating "Talk to Us" mobile CTA
- Fully responsive + dark/light mode
- Clean, spacious layout with modern cards and interactions

## 📁 Project Structure

```
my-first-grok-site/
├── index.html          # Complete single-page website
├── README.md           # This file
├── css/
│   └── style.css       # Additional custom CSS
├── js/
│   └── main.js         # Dark mode, mobile menu, form handling, animations
└── assets/             # Place images, logos, icons here
```

### Sections Included
- Hero + Stats + Trusted By
- About Us
- Our Values (6 core values)
- How We Work (your exact 6-step process)
- Services (6 editable placeholders)
- Testimonials (3 client quotes)
- FAQ (5 common questions)
- Contact (fully working form)

## 🛠️ How to Customize

### Edit Content
- Most text lives in `index.html`
- Services, values descriptions, and process steps can be edited directly

### Colors & Branding
- Primary colors use Tailwind classes (`indigo`, `slate`, `teal`)
- To change the overall look, search for color classes in `index.html`
- You can extend Tailwind config in the `<script>` tag inside `index.html`

### Add a Real Logo
1. Add your logo file to the `assets/` folder
2. Replace the text logo in the navbar and hero with an `<img>` tag

### Contact Form
Currently the form:
- Prevents default submit
- Logs form data to the browser console
- Shows a nice success message

**To connect Formspree (recommended free option):**
1. Go to https://formspree.io and create a free account
2. Create a new form and copy the endpoint (e.g. `https://formspree.io/f/xxxxxx`)
3. In `index.html`, update the `<form>` tag:
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST" id="contact-form">
   ```
4. Optionally remove or simplify the JavaScript form handler in `js/main.js`

### Add More Services
Duplicate a service card inside the `#services` section grid.

## 🚀 Deployment Options (Free & Easy)

- **Netlify** (drag & drop `index.html` + folders)
- **Vercel**
- **GitHub Pages**
- **Cloudflare Pages**

Just push the entire folder to a repo and connect.

## 📝 Next Steps Suggestions

- [ ] Replace placeholder services with real offerings
- [ ] Add client testimonials
- [ ] Add real contact information (phone, address, email)
- [ ] Connect the form to Formspree or your own backend
- [ ] Add Google Analytics / tracking
- [ ] Optimize images and add a proper logo
- [ ] Create a `/blog` or multi-page version later

---

Built with ❤️ using HTML + Tailwind CSS (CDN) + vanilla JavaScript as a first Grok project.

Feel free to iterate and make it your own!
