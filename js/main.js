document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.prepend(progressBar);

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.createElement('button');
    backToTop.classList.add('back-to-top');
    backToTop.setAttribute('aria-label', 'Lên đầu trang');
    backToTop.innerHTML = '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>';
    document.body.appendChild(backToTop);
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');

    // ========================================
    // COMBINED SCROLL HANDLER (performance)
    // ========================================
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;

                // --- Progress Bar ---
                const progress = (scrollY / docHeight) * 100;
                progressBar.style.width = progress + '%';

                // --- Navbar ---
                if (scrollY > 50) {
                    navbar.classList.add('bg-apex-dark/95', 'shadow-lg');
                    navbar.classList.remove('py-4', 'border-white/5');
                    navbar.classList.add('py-2', 'border-apex-gold/20');
                } else {
                    navbar.classList.remove('bg-apex-dark/95', 'shadow-lg', 'py-2', 'border-apex-gold/20');
                    navbar.classList.add('py-4', 'border-white/5');
                }

                // --- Back to Top ---
                if (scrollY > 400) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }

                // --- Active Nav Link ---
                updateActiveNav();

                // --- Scroll Reveal ---
                revealOnScroll();

                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active-link');
            }
        });
    }

    // ========================================
    // SCROLL REVEAL (multi-direction)
    // ========================================
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const revealElements = document.querySelectorAll(revealSelectors);

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 50;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    // Trigger once on load
    revealOnScroll();

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
        });
    }

    // ========================================
    // HERO PARALLAX EFFECT
    // ========================================
    const heroSection = document.querySelector('section.bg-hero-pattern');
    if (heroSection) {
        const heroContent = heroSection.querySelector('.container');
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
            }
        });
    }

    // ========================================
    // ANIMATED COUNTERS
    // ========================================
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * (target - start) + start);
                    el.textContent = current + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========================================
    // SMOOTH ANCHOR SCROLL (override default)
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // CONTACT FORM AJAX SUBMISSION
    // ========================================
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (contactForm && successModal && closeModalBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            submitBtn.innerHTML = 'Đang gửi...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(async (response) => {
                if (response.ok) {
                    successModal.classList.remove('opacity-0', 'pointer-events-none');
                    successModal.firstElementChild.classList.remove('scale-95');
                    successModal.firstElementChild.classList.add('scale-100');
                    contactForm.reset();
                } else {
                    let json = await response.json();
                    console.log(response);
                    if (Object.hasOwn(json, 'errors')) {
                        alert(json["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.');
                    }
                }
            })
            .catch(error => {
                console.log(error);
                alert('Không thể kết nối. Vui lòng kiểm tra lại mạng.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });

        closeModalBtn.addEventListener('click', () => {
            successModal.classList.add('opacity-0', 'pointer-events-none');
            successModal.firstElementChild.classList.remove('scale-100');
            successModal.firstElementChild.classList.add('scale-95');
        });

        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModalBtn.click();
            }
        });
    }
});
