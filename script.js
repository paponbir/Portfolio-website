// =============================================================
    // EMAILJS CONFIGURATION
    // -------------------------------------------------------------
    // STEP 1 — Sign up at https://www.emailjs.com (free plan works)
    // STEP 2 — Go to Account → API Keys and copy your Public Key
    // STEP 3 — Create an Email Service (Gmail, Outlook, etc.) and
    //           copy its Service ID from the "Email Services" page
    // STEP 4 — Create an Email Template under "Email Templates".
    //           In your template body use these exact variables:
    //             {{from_name}}   → sender's name
    //             {{from_email}}  → sender's email
    //             {{subject}}     → subject line
    //             {{message}}     → message body
    //           Copy the Template ID once saved.
    // STEP 5 — Paste all three values into the constants below.
    // =============================================================

    const EMAILJS_PUBLIC_KEY  = "k4LAuh3bG9Nfw2JpS";   // ← Replace with your EmailJS Public Key
    const EMAILJS_SERVICE_ID  = "service_damry8z";   // ← Replace with your EmailJS Service ID
    const EMAILJS_TEMPLATE_ID = "template_8uivp4h";  // ← Replace with your EmailJS Template ID

    // Initialize EmailJS with your Public Key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // =============================================================

    document.addEventListener('DOMContentLoaded', () => {

        // ---------------------------------------------------------
        // Contact Form — EmailJS submission
        // ---------------------------------------------------------
        const contactForm = document.getElementById('contactForm');
        const submitBtn   = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form values to pass to the EmailJS template.
            // The keys here MUST match the variable names in your
            // EmailJS template (e.g. {{from_name}}, {{from_email}}).
            const templateParams = {
                from_name:  document.getElementById('name').value.trim(),
                from_email: document.getElementById('email').value.trim(),
                subject:    document.getElementById('subject').value.trim(),
                message:    document.getElementById('message').value.trim(),
            };

            // Disable the button while sending to prevent duplicate sends
            submitBtn.disabled    = true;
            submitBtn.textContent = 'Sending...';
            formMessage.className = 'form-message'; // reset classes
            formMessage.style.display = 'none';

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(() => {
                    // Success — show green confirmation and reset form
                    formMessage.className   = 'form-message success';
                    formMessage.textContent = '✓ Message sent! I will get back to you soon.';
                    contactForm.reset();
                })
                .catch((error) => {
                    // Failure — show red error message
                    console.error('EmailJS error:', error);
                    formMessage.className   = 'form-message error';
                    formMessage.textContent = '✗ Something went wrong. Please try again or email me directly.';
                })
                .finally(() => {
                    // Re-enable the button regardless of outcome
                    submitBtn.disabled    = false;
                    submitBtn.textContent = 'Send Message';
                });
        });

        // ---------------------------------------------------------
        // Sticky Navbar & Mobile Menu
        // ---------------------------------------------------------
        const navbar = document.getElementById('navbar');
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon from bars to X
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Scroll animations
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.fade-in-up, .fade-in').forEach(el => observer.observe(el));

        // Hero always visible
        setTimeout(() => {
            document.querySelectorAll('#hero .fade-in-up, #hero .fade-in').forEach(el => el.classList.add('visible'));
        }, 80);

        // Animated Counters
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        const decimals = parseInt(counter.getAttribute('data-decimals'));
                        const duration = 2000; // 2 seconds
                        const frameRate = 30; // 30fps
                        const totalFrames = Math.round(duration / frameRate);
                        let frame = 0;
                        const counterInterval = setInterval(() => {
                            frame++;
                            const progress = frame / totalFrames;
                            const current = target * (1 - (1 - progress) * (1 - progress));
                            counter.innerText = current.toFixed(decimals);
                            if (frame === totalFrames) {
                                clearInterval(counterInterval);
                                counter.innerText = target.toFixed(decimals);
                            }
                        }, frameRate);
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.about-stats').forEach(el => counterObserver.observe(el));

        // Custom Cursor
        const cursorDot     = document.createElement('div');
        const cursorOutline = document.createElement('div');
        cursorDot.className     = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        let dotX = window.innerWidth / 2, dotY = window.innerHeight / 2;
        let outX = dotX, outY = dotY;

        document.addEventListener('mousemove', e => {
            dotX = e.clientX; dotY = e.clientY;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top  = dotY + 'px';
        });

        (function animateCursor() {
            outX += (dotX - outX) * 0.2;
            outY += (dotY - outY) * 0.2;
            cursorOutline.style.left = outX + 'px';
            cursorOutline.style.top  = outY + 'px';
            requestAnimationFrame(animateCursor);
        })();

        document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width           = '60px';
                cursorOutline.style.height          = '60px';
                cursorOutline.style.backgroundColor = 'rgba(125,211,252,0.15)';
                cursorOutline.style.borderColor     = 'rgba(125,211,252,0.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width           = '30px';
                cursorOutline.style.height          = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor     = 'rgba(125,211,252,0.5)';
            });
        });

        // Project Modal Logic
        const modalOverlay = document.getElementById('projectModal');
        const modalCloseBtn = document.querySelector('.modal-close');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const modalTech = document.getElementById('modalTech');
        const modalDesc = document.getElementById('modalDesc');

        document.querySelectorAll('.view-project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Populate modal
                modalTitle.textContent = btn.getAttribute('data-title');
                modalSubtitle.textContent = btn.getAttribute('data-subtitle');
                modalDesc.textContent = btn.getAttribute('data-desc');
                
                // Clear and repopulate tech stack
                modalTech.innerHTML = '';
                const techArray = btn.getAttribute('data-tech').split(',');
                techArray.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech.trim();
                    modalTech.appendChild(span);
                });

                // Show modal
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling in background
            });
        });

        // Close modal functions
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        };

        modalCloseBtn.addEventListener('click', closeModal);

        modalOverlay.addEventListener('click', (e) => {
            // Close only if clicking the overlay backdrop itself, not content
            if (e.target === modalOverlay) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
        });

        // CV Modal Logic
        const cvOverlay = document.getElementById('cvOverlay');
        const openCvBtn = document.getElementById('openCvBtn');
        const cvCloseBtn = document.querySelector('.cv-close-btn');

        const openCvModal = () => {
            cvOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeCvModal = () => {
            cvOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        openCvBtn.addEventListener('click', openCvModal);
        cvCloseBtn.addEventListener('click', closeCvModal);
        cvOverlay.addEventListener('click', (e) => {
            if (e.target === cvOverlay) closeCvModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cvOverlay.classList.contains('active')) closeCvModal();
        });

        // Constellation Canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'bg-canvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let W = canvas.width  = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
            initParticles();
        });

        const PARTICLE_COUNT = 80, MAX_VEL = 0.5, LINE_LEN = 150, MOUSE_R = 200;
        const particles = [];

        class Particle {
            constructor() {
                this.x  = Math.random() * W;
                this.y  = Math.random() * H;
                this.vx = (Math.random() * 2 - 1) * MAX_VEL;
                this.vy = (Math.random() * 2 - 1) * MAX_VEL;
            }
            update() {
                if (this.x + this.vx > W || this.x + this.vx < 0) this.vx *= -1;
                if (this.y + this.vy > H || this.y + this.vy < 0) this.vy *= -1;
                const dx = dotX - this.x, dy = dotY - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < MOUSE_R) {
                    const f = (MOUSE_R - dist) / MOUSE_R;
                    this.x -= (dx/dist) * f * 2;
                    this.y -= (dy/dist) * f * 2;
                }
                this.x += this.vx;
                this.y += this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2.5, 0, Math.PI*2);
                ctx.fillStyle = '#4b5d6a';
                ctx.fill();
            }
        }

        function initParticles() {
            particles.length = 0;
            for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i+1; j < particles.length; j++) {
                    const dx = particles[j].x - particles[i].x;
                    const dy = particles[j].y - particles[i].y;
                    const d  = Math.sqrt(dx*dx + dy*dy);
                    if (d < LINE_LEN) {
                        ctx.strokeStyle = `rgba(139,69,80,${(1 - d/LINE_LEN)*0.7})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                const dx = dotX - particles[i].x;
                const dy = dotY - particles[i].y;
                const d  = Math.sqrt(dx*dx + dy*dy);
                if (d < MOUSE_R) {
                    ctx.strokeStyle = `rgba(171,106,116,${(1 - d/MOUSE_R)*0.85})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(dotX, dotY);
                    ctx.stroke();
                }
            }
        }

        document.addEventListener('click', e => {
            particles.forEach(p => {
                const dx = p.x - e.clientX, dy = p.y - e.clientY;
                const d  = Math.sqrt(dx*dx + dy*dy);
                if (d < MOUSE_R * 1.5) { p.vx += (dx/d)*10; p.vy += (dy/d)*10; }
            });
        });

        initParticles();

        (function loop() {
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
        })();

    });
