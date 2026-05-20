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
// ── Hero Canvas Animation ─────────────────────────────────────────────────
(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, animId;

    // ── Resize ──
    function resize() {
        const section = canvas.closest('section');
        W = canvas.width  = section.offsetWidth;
        H = canvas.height = section.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); buildNodes(); });

    // ── Config ──
    const NODE_COUNT   = 60;
    const CONN_DIST    = 160;
    const PULSE_CHANCE = 0.004;
    const NODE_SPEED   = 0.25;

    const CYAN   = { r: 0,   g: 229, b: 255 };
    const RED    = { r: 255, g: 45,  b: 45  };
    const GREEN  = { r: 124, g: 252, b: 0   };

    function rgba(c, a) { return `rgba(${c.r},${c.g},${c.b},${a})`; }

    // ── Nodes ──
    let nodes = [];

    function buildNodes() {
        nodes = Array.from({ length: NODE_COUNT }, () => ({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * NODE_SPEED,
            vy: (Math.random() - 0.5) * NODE_SPEED,
            r:  1 + Math.random() * 1.8,
            col: Math.random() < 0.7 ? CYAN : Math.random() < 0.5 ? RED : GREEN,
            pulse: 0,
            pulseDir: 1
        }));
    }
    buildNodes();

    // ── Pulses traveling along edges ──
    let pulses = [];

    function spawnPulse(fromIdx, toIdx) {
        pulses.push({ from: fromIdx, to: toIdx, t: 0, col: nodes[fromIdx].col });
    }

    // ── Floating binary rain particles ──
    let bits = Array.from({ length: 28 }, () => ({
        x: Math.random() * 1,
        y: Math.random(),
        speed: 0.0004 + Math.random() * 0.0008,
        val: Math.random() < 0.5 ? '0' : '1',
        alpha: 0.06 + Math.random() * 0.12,
        size: 10 + Math.random() * 8
    }));

    // ── Hex ring decorations ──
    const hexRings = [
        { cx: 0.82, cy: 0.18, r: 55, alpha: 0.06, rot: 0, rotSpeed: 0.0003 },
        { cx: 0.12, cy: 0.72, r: 38, alpha: 0.05, rot: 1, rotSpeed: -0.0004 },
        { cx: 0.92, cy: 0.78, r: 28, alpha: 0.04, rot: 2, rotSpeed: 0.0005 }
    ];

    function drawHex(cx, cy, r, alpha, rot) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r)
                    : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }

    // ── Shield / target reticle ──
    let reticle = { alpha: 0, grow: true };

    // ── Main draw loop ──
    function draw(ts) {
        animId = requestAnimationFrame(draw);

        ctx.clearRect(0, 0, W, H);

        // Reticle (center glow ring)
        reticle.alpha += reticle.grow ? 0.005 : -0.005;
        if (reticle.alpha >= 0.18) reticle.grow = false;
        if (reticle.alpha <= 0.04) reticle.grow = true;
        const cx = W * 0.5, cy = H * 0.5;
        for (let ring = 1; ring <= 3; ring++) {
            ctx.beginPath();
            ctx.arc(cx, cy, 90 + ring * 45, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,229,255,${reticle.alpha / ring})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        // crosshair ticks
        [[cx, cy-150,cx,cy-130],[cx,cy+130,cx,cy+150],[cx-150,cy,cx-130,cy],[cx+130,cy,cx+150,cy]].forEach(([x1,y1,x2,y2]) => {
            ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
            ctx.strokeStyle = `rgba(0,229,255,${reticle.alpha * 1.5})`; ctx.lineWidth = 1; ctx.stroke();
        });

        // Hex rings
        hexRings.forEach(h => {
            h.rot += h.rotSpeed;
            drawHex(h.cx * W, h.cy * H, h.r, h.alpha, h.rot);
            drawHex(h.cx * W, h.cy * H, h.r * 0.65, h.alpha * 0.6, -h.rot * 1.5);
        });

        // Binary rain
        bits.forEach(b => {
            b.y += b.speed;
            if (b.y > 1) { b.y = 0; b.x = Math.random(); b.val = Math.random() < 0.5 ? '0' : '1'; }
            ctx.font = `${b.size}px monospace`;
            ctx.fillStyle = `rgba(0,229,255,${b.alpha})`;
            ctx.fillText(b.val, b.x * W, b.y * H);
        });

        // Move nodes
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
            n.x = Math.max(0, Math.min(W, n.x));
            n.y = Math.max(0, Math.min(H, n.y));
        });

        // Draw edges + maybe spawn pulses
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[j].x - nodes[i].x;
                const dy = nodes[j].y - nodes[i].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < CONN_DIST) {
                    const alpha = (1 - dist / CONN_DIST) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = rgba(CYAN, alpha);
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    if (Math.random() < PULSE_CHANCE) spawnPulse(i, j);
                }
            }
        }

        // Draw pulses
        pulses = pulses.filter(p => {
            p.t += 0.018;
            if (p.t > 1) return false;
            const fn = nodes[p.from], tn = nodes[p.to];
            const px = fn.x + (tn.x - fn.x) * p.t;
            const py = fn.y + (tn.y - fn.y) * p.t;
            const a = Math.sin(p.t * Math.PI) * 0.9;
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = rgba(p.col, a);
            ctx.fill();
            // glow trail
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fillStyle = rgba(p.col, a * 0.25);
            ctx.fill();
            return true;
        });

        // Draw nodes
        nodes.forEach(n => {
            // pulse ripple
            if (Math.random() < 0.002) { n.pulse = 1; }
            if (n.pulse > 0) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r + n.pulse * 10, 0, Math.PI * 2);
                ctx.strokeStyle = rgba(n.col, (1 - n.pulse) * 0.4);
                ctx.lineWidth = 0.8;
                ctx.stroke();
                n.pulse = Math.min(n.pulse + 0.04, 1);
                if (n.pulse >= 1) n.pulse = 0;
            }
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = rgba(n.col, 0.8);
            ctx.fill();
        });
    }

    draw(0);

    // Pause animation when section scrolls out of view (perf)
    const heroSection = canvas.closest('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) { cancelAnimationFrame(animId); }
            else { draw(0); }
        });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
})();
