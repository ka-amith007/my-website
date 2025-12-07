// Modern Portfolio JavaScript with Smooth Animations

class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        // this.setupCustomCursor(); // Disabled for better cursor visibility
        this.setupMobileNav();
        this.setupTypingEffect();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupFormValidation();
        this.setupSmoothScrolling();
        this.setupParallaxEffect();
        this.setupGlowEffects();
        this.observeElements();
        this.createAnimatedBackground();
    }

    // Create Animated Particle Background
    createAnimatedBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connecting lines
            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // Custom Cursor
    setupCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (!cursor || !cursorFollower) return;

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follower animation
        const animateCursor = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-item');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }

    // Mobile Navigation
    setupMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;

        if (!hamburger || !mobileMenu) return;

        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Update aria-expanded
            const isExpanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);

            // Prevent body scroll when menu is open
            if (isExpanded) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a mobile link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });

        // Close menu on window resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }

    // Typing Effect
    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'CS Engineering Student',
            'Web Developer',
            'AI Enthusiast',
            'Problem Solver',
            'Tech Innovator'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeWriter = () => {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 200;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        };

        typeWriter();
    }

    // Scroll Animations with Intersection Observer
    setupScrollAnimations() {
        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Special animations for different elements
                    if (entry.target.classList.contains('project-card')) {
                        entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                    }

                    if (entry.target.classList.contains('skill-category')) {
                        entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                    }

                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Elements to animate
        const elementsToAnimate = document.querySelectorAll(`
            .about-content > *,
            .skill-category,
            .project-card,
            .service-card,
            .internship-card,
            .stat-card
        `);

        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Animated Skill Bars
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        const animateSkillBars = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const percent = skillBar.dataset.percent;

                    setTimeout(() => {
                        skillBar.style.width = percent + '%';
                    }, 300);

                    observer.unobserve(entry.target);
                }
            });
        };

        const skillObserver = new IntersectionObserver(animateSkillBars, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Form Validation and Animation
    setupFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');

        // Add focus/blur animations
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));

                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Parallax Effect
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Parallax for hero background
            const heroGrid = document.querySelector('.hero-grid');
            if (heroGrid) {
                heroGrid.style.transform = `translateY(${rate}px)`;
            }

            // Floating elements rotation
            const floatingElements = document.querySelectorAll('.float-item');
            floatingElements.forEach((el, index) => {
                const rotation = scrolled * 0.1 * (index + 1);
                el.style.transform = `rotate(${rotation}deg)`;
            });
        });
    }

    // Glow Effects
    setupGlowEffects() {
        // Add glow effect on hover for interactive elements
        const glowElements = document.querySelectorAll('.btn, .social-link, .project-card, .service-card');

        glowElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))';
            });

            el.addEventListener('mouseleave', () => {
                el.style.filter = '';
            });
        });
    }

    // Observe elements for scroll animations
    observeElements() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });

        // Active navigation link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Particle System for Background
class ParticleSystem {
    constructor() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };

        this.init();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.3';

        document.body.appendChild(canvas);
        return canvas;
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                particle.x -= dx * 0.01;
                particle.y -= dy * 0.01;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.createLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-circle">
                    <div class="loader-inner"></div>
                </div>
                <h3>Loading...</h3>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-circle {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(0, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: var(--accent-primary);
                animation: loader-spin 1s ease-in-out infinite;
                margin: 0 auto 1rem;
            }
            
            .loader-inner {
                width: 40px;
                height: 40px;
                border: 2px solid rgba(0, 255, 255, 0.2);
                border-radius: 50%;
                border-bottom-color: var(--accent-primary);
                animation: loader-spin 0.7s ease-in-out infinite reverse;
                margin: 7px auto;
            }
            
            @keyframes loader-spin {
                to { transform: rotate(360deg); }
            }
            
            .loader-content h3 {
                color: var(--text-primary);
                font-size: 1.2rem;
                font-weight: 500;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(loader);

        // Remove loader after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading animation
    new LoadingAnimation();

    // Initialize portfolio animations
    new PortfolioAnimations();

    // Initialize particle system
    new ParticleSystem();

    // Add CSS animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-link.active {
            color: var(--accent-primary) !important;
        }
        
        .nav-link.active::before {
            width: 100% !important;
        }
        
        .form-group.focused label {
            top: -0.5rem !important;
            left: 0.5rem !important;
            font-size: 0.8rem !important;
            color: var(--accent-primary) !important;
            background: var(--bg-card) !important;
            padding: 0 0.5rem !important;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;

    document.head.appendChild(animationStyles);
});

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images when they come into viewport
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Easter egg: Konami Code
document.addEventListener('DOMContentLoaded', () => {
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);

        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === konami.join(',')) {
            // Activate party mode!
            document.body.style.animation = 'rainbow 2s linear infinite';

            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);

            konamiCode = [];
        }
    });

    // CV Download Analytics
    setupCVDownload();

    // Social Links Analytics
    setupSocialTracking();
});



// CV Download Tracking
function setupCVDownload() {
    const cvLinks = document.querySelectorAll('a[href*="Resume"]');

    cvLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Track download
            console.log('CV Downloaded');

            // Google Analytics tracking (if you have GA setup)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'CV',
                    'event_label': 'Resume PDF'
                });
            }

            // Show thank you message
            showNotification('Thank you for downloading my CV!', 'success');
        });
    });
}

// Social Links Tracking
function setupSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-link, .contact-method');

    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.querySelector('i').className.includes('github') ? 'GitHub' :
                link.querySelector('i').className.includes('linkedin') ? 'LinkedIn' :
                    link.querySelector('i').className.includes('envelope') ? 'Email' : 'Unknown';

            console.log(`${platform} link clicked`);

            // Track social media clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'event_category': 'Social Media',
                    'event_label': platform
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' :
            type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        padding: 15px 20px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid #007bff;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: #28a745;
    }
    
    .notification-error {
        border-left-color: #dc3545;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification-success i {
        color: #28a745;
    }
    
    .notification-error i {
        color: #dc3545;
    }
    
    .notification-info i {
        color: #007bff;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Project Link Management
class ProjectLinkManager {
    constructor() {
        this.projectLinks = {
            'disease-prediction': {
                demo: 'https://multiple--disease--prediction-gud8iidadwshktalr2gmcp.streamlit.app/',
                code: 'https://github.com/ka-amith007/Multiple--Disease--Prediction'
            },
            'weather-website': {
                demo: 'https://weather-app-4002-50-82.netlify.app/',
                code: 'https://github.com/ka-amith007/weather-app'
            },
            'crop-recommendation': {
                demo: 'https://crop-recommendation-system-xvequzasfs6vg9tfnzanah.streamlit.app/',
                code: 'https://github.com/ka-amith007/Crop-Recommendation-System'
            },
            'sign-language-converter': {
                demo: '#',
                code: 'https://github.com/ka-amith007/Sign-Language-to-Text-Converter'
            }
        };

        this.setupProjectLinks();
    }

    // Update a specific project's links
    updateProjectLinks(projectName, demoUrl, codeUrl) {
        if (this.projectLinks[projectName]) {
            this.projectLinks[projectName].demo = demoUrl || '#';
            this.projectLinks[projectName].code = codeUrl || '#';

            // Update the actual links in the DOM
            const demoLink = document.querySelector(`a[data-project="${projectName}"][data-type="demo"]`);
            const codeLink = document.querySelector(`a[data-project="${projectName}"][data-type="code"]`);

            if (demoLink) {
                demoLink.href = demoUrl || '#';
                demoLink.title = demoUrl ? 'Live Demo' : 'Live Demo - Coming Soon';
            }

            if (codeLink) {
                codeLink.href = codeUrl || '#';
                codeLink.title = codeUrl ? 'View Code' : 'View Code - Coming Soon';
            }

            console.log(`Updated ${projectName}:`, { demo: demoUrl, code: codeUrl });
        }
    }

    // Setup click handlers for project links
    setupProjectLinks() {
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href === '#' || link.href.endsWith('#')) {
                    e.preventDefault();
                    showNotification('Project link coming soon! 🚀', 'info');
                }
            });
        });
    }

    // Batch update multiple projects
    updateMultipleProjects(updates) {
        Object.entries(updates).forEach(([projectName, urls]) => {
            this.updateProjectLinks(projectName, urls.demo, urls.code);
        });
    }
}

// Initialize Project Link Manager
const projectManager = new ProjectLinkManager();

// Global function to update project links (easy to use)
window.updateProjectLinks = (projectName, demoUrl, codeUrl) => {
    projectManager.updateProjectLinks(projectName, demoUrl, codeUrl);
};

// Global function to update multiple projects
window.updateMultipleProjects = (updates) => {
    projectManager.updateMultipleProjects(updates);
};

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('PWA: Service Worker registered successfully');
            })
            .catch(error => {
                console.log('PWA: Service Worker registration failed:', error);
            });
    });
}