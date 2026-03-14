# My Portfolio

A personalized, interactive portfolio website showcasing my skills, projects, and experiences as a Computer Science & Engineering graduate.

## Features
- **Responsive Design**: Looks great on desktop and mobile devices.
- **Glassmorphism UI**: Modern frosted-glass aesthetics with dark mode tuning.
- **Interactive Background**: Procedurally generated constellation background that reacts to the mouse.
- **Custom Cursor**: A glowing star pointer perfectly blending with the background.
- **Contact Form**: Functional EmailJS integration to send emails directly from the site.

## Tech Stack
- **HTML5** for structure
- **CSS3** for styling, animations, and custom UI components
- **Vanilla JavaScript** for logic, visual effects, and form submission

## How to Run Locally

You can simply open `index.html` in your web browser. 

Alternatively, if you'd like to run it using a local development server (which is recommended for avoiding CORS issues during local testing of some features):

### Using Python:
1. Open a terminal in the project directory.
2. Run the following command:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000/`.

## Deployment
This project is static (HTML, CSS, JS) and is perfectly ready to be deployed to GitHub Pages, Netlify, or Vercel out of the box. Ensure that the main HTML file is named `index.html`.

## Contact Integration details
The contact form works through EmailJS. If you are forking this repo and want form submissions to arrive in your inbox:
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Connect your desired email service
3. Create an email template
4. Update `script.js` with your own `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, and `EMAILJS_TEMPLATE_ID`.
