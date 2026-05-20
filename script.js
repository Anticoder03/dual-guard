  // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Fade in elements on scroll
        const fadeInElements = document.querySelectorAll('.service-card, .vapt-item, .partner-logo');
        
        fadeInElements.forEach((element) => {
            gsap.fromTo(
                element,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Animate section headings
        const headings = document.querySelectorAll('h2');
        headings.forEach((heading) => {
            gsap.fromTo(
                heading,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: heading,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Button hover animations
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, { scale: 1.05, duration: 0.2 });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button, { scale: 1, duration: 0.2 });
            });
        });

        // Counter animation for stats (if needed)
        function animateCounter(element, target) {
            gsap.to(element, {
                textContent: target,
                duration: 2,
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Smooth scroll for anchor links — use native smooth scroll and ignore empty hashes
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return; // ignore empty/hash-only links
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Parallax effect on hero section
        const heroSection = document.querySelector('section:first-of-type');
        gsap.to(heroSection, {
            backgroundPosition: '0 100px',
            ease: 'none',
            scrollTrigger: {
                trigger: heroSection,
                scrub: true,
                start: 'top top',
                end: 'bottom top'
            }
        });

        // Global cursor-follow blob + floating particles in the hero
        const heroEffects = heroSection ? heroSection.querySelector('.hero-effects') : null;
        const heroParticles = document.getElementById('hero-particles');
        const cursorBlob = document.querySelector('.cursor-blob-layer .hero-cursor-glow');

        if (cursorBlob) {
            const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const particleCount = isCoarsePointer ? 10 : 18;
            function createHeroParticles() {
                if (!heroParticles) return;
                heroParticles.innerHTML = '';

                for (let i = 0; i < particleCount; i += 1) {
                    const particle = document.createElement('span');
                    particle.className = 'hero-particle';

                    const size = 2 + Math.random() * 4;
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const driftX = (Math.random() * 140 - 70).toFixed(1) + 'px';
                    const driftY = (Math.random() * 120 - 60).toFixed(1) + 'px';
                    const delay = (Math.random() * 6).toFixed(2) + 's';
                    const duration = (6 + Math.random() * 8).toFixed(2) + 's';

                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${left}%`;
                    particle.style.top = `${top}%`;
                    particle.style.setProperty('--drift-x', driftX);
                    particle.style.setProperty('--drift-y', driftY);
                    particle.style.animationDelay = delay;
                    particle.style.animationDuration = duration;

                    heroParticles.appendChild(particle);
                }
            }

            createHeroParticles();

            gsap.set(cursorBlob, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

            const xTo = gsap.quickTo(cursorBlob, "x", { duration: 0.6, ease: "power3" });
            const yTo = gsap.quickTo(cursorBlob, "y", { duration: 0.6, ease: "power3" });
            const scaleTo = gsap.quickTo(cursorBlob, "scale", { duration: 0.4, ease: "power2" });

            let lastX = window.innerWidth / 2;
            let lastY = window.innerHeight / 2;
            let isMoving = false;

            const updatePosition = (clientX, clientY) => {
                xTo(clientX);
                yTo(clientY);
                
                const dx = clientX - lastX;
                const dy = clientY - lastY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                let scaleTarget = 1 + Math.min(distance * 0.005, 0.4);
                scaleTo(scaleTarget);
                
                lastX = clientX;
                lastY = clientY;
                
                cursorBlob.style.setProperty('--cursor-opacity', '1');
                
                clearTimeout(isMoving);
                isMoving = setTimeout(() => scaleTo(1), 100);
            };

            document.addEventListener('pointermove', (event) => {
                updatePosition(event.clientX, event.clientY);
            });

            document.addEventListener('pointerdown', (event) => {
                updatePosition(event.clientX, event.clientY);
                scaleTo(0.85);
            });

            document.addEventListener('pointerup', () => {
                scaleTo(1.1);
                setTimeout(() => scaleTo(1), 150);
            });

            document.addEventListener('pointerleave', () => {
                cursorBlob.style.setProperty('--cursor-opacity', '0');
            });

            document.addEventListener('touchstart', (event) => {
                const touch = event.touches && event.touches[0];
                if (!touch) return;
                updatePosition(touch.clientX, touch.clientY);
            }, { passive: true });

            document.addEventListener('touchmove', (event) => {
                const touch = event.touches && event.touches[0];
                if (!touch) return;
                updatePosition(touch.clientX, touch.clientY);
            }, { passive: true });

            document.addEventListener('touchend', () => {
                cursorBlob.style.setProperty('--cursor-opacity', '0');
            }, { passive: true });
        }

        // Add scroll to top button functionality
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                // Add visible class to scroll-to-top button if it exists
            }
        });

        // Initialize animations on page load
        window.addEventListener('load', () => {
            gsap.fromTo(
                '.fade-in',
                { opacity: 0 },
                { opacity: 1, duration: 0.8 }
            );
        });

        // Mobile nav toggle
        const navToggle = document.getElementById('nav-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        if (navToggle && mobileMenu) {
            navToggle.addEventListener('click', function () {
                const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', String(!isOpen));
                mobileMenu.classList.toggle('hidden');
                // toggle button icon
                navToggle.textContent = isOpen ? '☰' : '✕';
            });

            // Close mobile menu when a mobile link is clicked
            mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.textContent = '☰';
                });
            });
        }


// Partner logos data (images optional) — populate the partner-track
const trusted_companies = [
    {name: "Netskope", logo: "./img/Netskope.png"},
    {name: "CrowdStrike", logo: "./img/CrowdStrike.png"},
    {name: "Cloudflare", logo: "./img/cloudflare.png"},
    {name: "AWS", logo: "./img/aws.svg"},
    {name: "Reinfosec", logo: "./img/Reinfosec.png"},
    {name: "K-NEXTGENTECH", logo: "./img/k_nextgentech.jpg"},
    {name: "Xploreteq", logo: "./img/Xploreteq.jpeg"}
];

const partnerSlider = document.getElementById('trusted-companies');
const partnerTrack = partnerSlider ? partnerSlider.querySelector('.partner-track') : null;

if (partnerTrack) {
    // Clear any static content and populate from data
    partnerTrack.innerHTML = '';
    trusted_companies.forEach(company => {
        const item = document.createElement('div');
        item.className = 'partner-item partner-logo';

        const img = document.createElement('img');
        img.src = company.logo;
        img.alt = company.name + ' Logo';
        img.className = 'partner-logo-img';
        img.style.maxHeight = '40px';
        img.onerror = function () { this.style.display = 'none'; };

        // const label = document.createElement('span');
        // label.className = 'text-sm font-bold text-cyan-400';
        // label.textContent = company.name;

        item.appendChild(img);
        // item.appendChild(label);
        partnerTrack.appendChild(item);
    });

    // Slider pagination + page-based scrolling
    const prevBtn = document.getElementById('partner-prev');
    const nextBtn = document.getElementById('partner-next');
    let currentPage = 0;
    let autoplayId = null;

    function computeLayout() {
        const items = partnerTrack.querySelectorAll('.partner-item');
        const itemWidth = items[0] ? items[0].getBoundingClientRect().width : 160;
        const gap = parseFloat(getComputedStyle(partnerTrack).gap) || 36;
        const containerWidth = partnerTrack.getBoundingClientRect().width;
        const itemsPerPage = Math.max(1, Math.floor((containerWidth + gap) / (itemWidth + gap)));
        const pages = Math.max(1, Math.ceil(items.length / itemsPerPage));
        return { items, itemWidth, gap, containerWidth, itemsPerPage, pages };
    }

    // Create pagination dots
    const pagination = document.createElement('div');
    pagination.className = 'partner-pagination';
    partnerSlider.appendChild(pagination);

    function buildDots() {
        pagination.innerHTML = '';
        const layout = computeLayout();
        for (let i = 0; i < layout.pages; i++) {
            const dot = document.createElement('div');
            dot.className = 'partner-dot' + (i === 0 ? ' active' : '');
            dot.dataset.page = i;
            dot.addEventListener('click', () => { goToPage(i); });
            pagination.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = pagination.querySelectorAll('.partner-dot');
        dots.forEach(d => d.classList.remove('active'));
        const idx = Math.max(0, Math.min(pagination.children.length - 1, currentPage));
        if (dots[idx]) dots[idx].classList.add('active');
    }

    function updateTransform(left) {
        partnerTrack.style.transform = `translateX(-${left}px)`;
    }

    function goToPage(page) {
        const layout = computeLayout();
        currentPage = ((page % layout.pages) + layout.pages) % layout.pages;
        const targetIndex = currentPage * layout.itemsPerPage;
        const targetItem = layout.items[targetIndex];
        let left = 0;
        if (targetItem) {
            const sliderRect = partnerSlider.getBoundingClientRect();
            const itemRect = targetItem.getBoundingClientRect();
            left = Math.round(itemRect.left - sliderRect.left + partnerSlider.scrollLeft);
        }
        updateTransform(left);
        updateDots();
    }

    function nextPage() { const layout = computeLayout(); goToPage(currentPage + 1); }
    function prevPage() { goToPage(currentPage - 1); }

    if (nextBtn) nextBtn.addEventListener('click', nextPage);
    if (prevBtn) prevBtn.addEventListener('click', prevPage);

    // Autoplay by page
    function startAutoplay() { stopAutoplay(); autoplayId = setInterval(nextPage, 3000); }
    function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }

    partnerTrack.addEventListener('mouseenter', stopAutoplay);
    partnerTrack.addEventListener('mouseleave', startAutoplay);

    // Touch / swipe support (page change)
    let startX = 0, isDown = false;
    partnerTrack.addEventListener('pointerdown', (e) => { isDown = true; startX = e.clientX; partnerTrack.setPointerCapture(e.pointerId); stopAutoplay(); });
    partnerTrack.addEventListener('pointerup', (e) => { if (!isDown) return; isDown = false; const dx = e.clientX - startX; if (Math.abs(dx) > 40) { if (dx < 0) nextPage(); else prevPage(); } startAutoplay(); });
    partnerTrack.addEventListener('pointercancel', () => { isDown = false; startAutoplay(); });

    // Rebuild dots on resize
    window.addEventListener('resize', () => { buildDots(); goToPage(currentPage); });

    // Build initial dots and start
    buildDots();
    goToPage(0);
    startAutoplay();
}