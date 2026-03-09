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

    // Live Search Redirects
    const btnFlights = document.getElementById('btn-search-flights');
    const btnHotels = document.getElementById('btn-search-hotels');
    const btnTours = document.getElementById('btn-search-tours');

    function animateSearchButton(btn, callback) {
        if (!btn) return;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Redirecting...';
        btn.style.opacity = '0.9';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-plane-departure"></i> Opening...';
            btn.style.backgroundColor = '#00D2FF'; // Brand Teal
            btn.style.color = '#001F3F'; // Deep Navy

            setTimeout(() => {
                callback();
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            }, 1000); // Short delay before opening tab and resetting
        }, 800); // Simulated "API fetching" time
    }

    if (btnFlights) {
        btnFlights.addEventListener('click', function (e) {
            e.preventDefault();
            const from = document.getElementById('flight-from').value.trim() || 'London';
            const to = document.getElementById('flight-to').value.trim() || 'Dubai';
            // Google Flights Search Query
            const query = encodeURIComponent(`Flights from ${from} to ${to}`);
            const url = `https://www.google.com/travel/flights?q=${query}`;
            animateSearchButton(this, () => window.open(url, '_blank'));
        });
    }

    if (btnHotels) {
        btnHotels.addEventListener('click', function (e) {
            e.preventDefault();
            const dest = document.getElementById('hotel-dest').value.trim() || 'Dubai';
            const date = document.getElementById('hotel-date').value;
            // Booking.com Search
            let url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}`;
            if (date) url += `&checkin=${date}`;
            animateSearchButton(this, () => window.open(url, '_blank'));
        });
    }

    if (btnTours) {
        btnTours.addEventListener('click', function (e) {
            e.preventDefault();
            const categoryElement = document.getElementById('tour-category');
            const category = categoryElement.options[categoryElement.selectedIndex].text;
            const dest = document.getElementById('tour-dest').value.trim() || 'Maldives';
            // TripAdvisor Search for Tours & Restaurants
            const query = encodeURIComponent(`${category} in ${dest}`);
            const url = `https://www.tripadvisor.com/Search?q=${query}`;
            animateSearchButton(this, () => window.open(url, '_blank'));
        });
    }

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

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current FAQ
            if (!isOpen) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Booking Form Submission Logic
    const bookingForm = document.getElementById('main-booking-form');
    let isSubmitting = false;

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (isSubmitting) return;

            isSubmitting = true;
            const submitBtn = document.getElementById('btn-submit-booking');
            const originalText = submitBtn.innerHTML;

            // Loading state
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Request...';
            submitBtn.style.opacity = '0.9';
            submitBtn.style.cursor = 'not-allowed';

            // Simulate Network Request
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent Successfully!';
                submitBtn.style.backgroundColor = '#25D366'; // WhatsApp/Success Green
                submitBtn.style.color = 'white';
                submitBtn.style.boxShadow = '0px 10px 20px rgba(37, 211, 102, 0.4)';

                // Reset Form
                bookingForm.reset();

                // Reset Button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                    submitBtn.style.boxShadow = '';
                    isSubmitting = false;
                }, 3000);
            }, 2000);
        });
    }
});
