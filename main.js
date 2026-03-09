document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navBtn = document.querySelector('.glass-nav .btn');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navBtn) navBtn.classList.toggle('active');

            // Icon change
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // Search Console Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchPanels = document.querySelectorAll('.search-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            searchPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        if (navBtn) navBtn.classList.remove('active');
                        mobileMenuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                    }

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    // Apply reveal-up class to elements we want to animate
    const animatedElements = document.querySelectorAll('.service-card, .tour-card, .logistics-card, .timeline-item, .gallery-item, .testimonial-card, .section-header');
    animatedElements.forEach(el => {
        el.classList.add('reveal-up');
        observer.observe(el);
    });

    // Search Button Interactive Feedback
    const searchBtns = document.querySelectorAll('.btn-search');
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const originalText = this.innerHTML;

            // Loading State
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';
            this.style.opacity = '0.9';
            this.style.pointerEvents = 'none';

            // Success State (Simulated API Call)
            setTimeout(() => {
                this.innerHTML = '<i class="fa-solid fa-check"></i> Found Deals!';
                this.style.backgroundColor = '#25D366'; // Success Green
                this.style.color = 'white';
                this.style.boxShadow = '0px 10px 20px rgba(37, 211, 102, 0.4)';

                // Reset State
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = '';
                    this.style.color = '';
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    this.style.boxShadow = '';
                }, 3000);
            }, 1500);
        });
    });

    // Weather Widget Rotation
    const weatherData = [
        { loc: 'Maldives', temp: '28°C', icon: 'fa-sun' },
        { loc: 'Paris', temp: '15°C', icon: 'fa-cloud-sun' },
        { loc: 'Dubai', temp: '34°C', icon: 'fa-sun' },
        { loc: 'Swiss Alps', temp: '-2°C', icon: 'fa-snowflake' },
        { loc: 'Tokyo', temp: '22°C', icon: 'fa-cloud' },
        { loc: 'London', temp: '12°C', icon: 'fa-cloud-rain' }
    ];

    const weatherWidget = document.querySelector('.floating-weather');
    if (weatherWidget) {
        let weatherIdx = 0;
        const tempEl = weatherWidget.querySelector('.weather-temp');
        const locEl = weatherWidget.querySelector('.weather-loc');
        const iconEl = weatherWidget.querySelector('.weather-icon i');

        setInterval(() => {
            weatherIdx = (weatherIdx + 1) % weatherData.length;
            const data = weatherData[weatherIdx];

            weatherWidget.style.opacity = '0';
            setTimeout(() => {
                tempEl.textContent = data.temp;
                locEl.textContent = data.loc;
                iconEl.className = `fa-solid ${data.icon} text-teal`;
                weatherWidget.style.opacity = '1';
            }, 400); // Wait for fade out
        }, 5000); // Change every 5 seconds
    }

    // Hero Background Slider Rotation
    const heroBgSlider = document.querySelector('header.hero .hero-bg-slider');
    if (heroBgSlider) {
        const slides = heroBgSlider.querySelectorAll('.hero-slide');
        if (slides.length > 1) {
            let currentSlide = 0;
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000); // Change every 5 seconds
        }
    }
});
