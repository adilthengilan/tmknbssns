// TamkinExpress Website Interactive Features

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const heroCards = document.querySelectorAll('.hero-card');
const serviceCards = document.querySelectorAll('.service-card');
const impactCards = document.querySelectorAll('.impact-card');
const statValues = document.querySelectorAll('.stat-value');

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 11, 0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 11, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .cta-button[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
            const href = link.getAttribute('href');

            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    if (navMenu.classList.contains('active')) toggleMobileMenu();
                }
            }
        });
    });
}

function setupScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.hero-card, .service-card, .impact-card, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;

                if (target) {
                    const numericValue = parseInt(target.replace(/\D/g, ''));
                    const suffix = target.replace(/[\d\s]/g, '');

                    if (!isNaN(numericValue)) {
                        animateValue(counter, 0, numericValue, 2000, suffix);
                        observer.unobserve(counter);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOutCubic);
        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = end + suffix;
        }
    }

    requestAnimationFrame(updateValue);
}

function setupParallax() {
    const heroBackground = document.querySelector('.hero-background');

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (heroBackground) heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    }

    let ticking = false;

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', () => {
        requestParallaxUpdate();
        ticking = false;
    });
}

function setupCardEffects() {
    const cards = document.querySelectorAll('.hero-card, .service-card, .impact-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    if (!text) return;

    heroTitle.textContent = '';
    heroTitle.style.visibility = 'visible';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    setTimeout(typeWriter, 500);
}

function setupLogoSlider() {
    const logoSlider = document.querySelector('.logo-slider');
    if (!logoSlider) return;

    logoSlider.addEventListener('mouseenter', () => {
        logoSlider.style.animationPlayState = 'paused';
    });

    logoSlider.addEventListener('mouseleave', () => {
        logoSlider.style.animationPlayState = 'running';
    });
}

function setupThemeHandling() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function updateTheme(e) {
        console.log('Theme preference:', e.matches ? 'dark' : 'light');
    }

    prefersDark.addEventListener('change', updateTheme);
    updateTheme(prefersDark);
}

function setupPerformanceOptimizations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            element.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
    });

    const animatedElements = document.querySelectorAll('.card-lines, .card-device, .card-growth, .card-location, .growth-chart');
    animatedElements.forEach(el => observer.observe(el));
}

function setupEnhancedScrolling() {
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleNavbarScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

function setupContactForm() {
    const contactButtons = document.querySelectorAll('.cta-button[href="#contact"]');

    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const footer = document.getElementById('contact');
            if (footer) {
                const offsetTop = footer.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            console.log('Opening contact form...');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('TamkinExpress website loaded \ud83d\ude80');
    setupSmoothScrolling();
    setupScrollAnimations();
    setupCardEffects();
    setupParallax();
    setupLogoSlider();
    setupThemeHandling();
    setupPerformanceOptimizations();
    setupEnhancedScrolling();
    setupContactForm();
    animateCounters();

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggleMobileMenu();
        });
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) toggleMobileMenu();
});

function preloadResources() {
    const criticalImages = [];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadResources();
