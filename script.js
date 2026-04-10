/* ========================================
   script.js — Rivaldy Portfolio
   ======================================== */

  // ===== PRELOADER =====
(function () {
    const preloader = document.getElementById('preloader');
    const fill      = document.getElementById('preloaderFill');
    const glow      = document.getElementById('preloaderGlow');
    const percent   = document.getElementById('preloaderPercent');
    const logo      = document.getElementById('preloaderLogo');
    const canvas    = document.getElementById('preloaderCanvas');
    const ctx       = canvas.getContext('2d');

    // Set logo data-text untuk glitch
    logo.setAttribute('data-text', logo.textContent);

    // Canvas resize
    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles
    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.5 + 0.3,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.1,
        });
    }

    // Lines between close particles
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(192,57,43,${p.alpha})`;
            ctx.fill();
        });

        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(192,57,43,${0.12 * (1 - dist / 130)})`;
                    ctx.lineWidth   = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // Progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 4;
        if (progress >= 100) progress = 100;
        setProgress(progress);
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(hidePreloader, 500);
        }
    }, 100);

    window.addEventListener('load', () => {
        progress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(hidePreloader, 500);
    });

    function setProgress(val) {
        const v = Math.min(val, 100);
        fill.style.width      = v + '%';
        glow.style.right      = (100 - v) + '%';
        percent.textContent   = Math.floor(v) + '%';
    }

    function hidePreloader() {
        preloader.classList.add('hide');
        setTimeout(() => preloader.remove(), 800);
    }
})();

// ===== CUSTOM CURSOR =====
const cursor   = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top  = e.clientY + 'px';
    }, 80);
});

document.querySelectorAll('a, button, .tech-item, .portfolio-item, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform   = 'translate(-50%,-50%) scale(2)';
        follower.style.transform = 'translate(-50%,-50%) scale(1.4)';
        follower.style.opacity   = '0.25';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
        follower.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.opacity   = '0.55';
    });
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left              = Math.random() * 100 + 'vw';
    p.style.width             = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 14 + 10) + 's';
    p.style.animationDelay    = (Math.random() * 14) + 's';
    particlesContainer.appendChild(p);
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
});

nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
});

// Click outside nav on mobile closes it
document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
    }
});

// ===== ACTIVE NAV ON SCROLL =====
function updateActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 160;
    sections.forEach(section => {
        const id      = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (!navLink) return;
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

// ===== SCROLL REVEAL =====
document.querySelectorAll('.reveal').forEach(el => {
    new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }).observe(el);
});

// ===== SKILL BARS =====
document.querySelectorAll('.skill-fill').forEach(fill => {
    new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }).observe(fill);
});

// ===== PORTFOLIO FILTER =====
const filterBtns   = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        portfolioItems.forEach(item => {
            const match = filter === 'all' || item.dataset.category === filter;
            if (match) {
                item.classList.remove('hidden');
                // tiny re-trigger for visible animation
                item.classList.remove('visible');
                requestAnimationFrame(() => item.classList.add('visible'));
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===== LIGHTBOX =====
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc  = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let currentIndex = 0;

function getVisibleItems() {
    return [...portfolioItems].filter(item => !item.classList.contains('hidden'));
}

function openLightbox(item) {
    const btn   = item.querySelector('.zoom-btn');
    lightboxImg.src           = btn.dataset.img;
    lightboxImg.alt           = btn.dataset.title;
    lightboxTitle.textContent = btn.dataset.title;
    lightboxDesc.textContent  = btn.dataset.desc;

    // Tampilkan link project jika ada (Fix #1)
    const lightboxLink = document.getElementById('lightboxLink');
    if (lightboxLink) {
        const link = btn.dataset.link;
        if (link && link !== '#') {
            lightboxLink.href = link;
            lightboxLink.style.display = 'inline-flex';
        } else {
            lightboxLink.style.display = 'none';
        }
    }

    const visible = getVisibleItems();
    currentIndex = visible.indexOf(item);

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

function navigateLightbox(dir) {
    const visible = getVisibleItems();
    currentIndex  = (currentIndex + dir + visible.length) % visible.length;
    const next    = visible[currentIndex];
    const btn     = next.querySelector('.zoom-btn');
    // Fade transition
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src           = btn.dataset.img;
        lightboxImg.alt           = btn.dataset.title;
        lightboxTitle.textContent = btn.dataset.title;
        lightboxDesc.textContent  = btn.dataset.desc;
        lightboxImg.style.opacity = '1';

        // Update project link
        const lightboxLink = document.getElementById('lightboxLink');
        if (lightboxLink) {
            const link = btn.dataset.link;
            if (link && link !== '#') {
                lightboxLink.href = link;
                lightboxLink.style.display = 'inline-flex';
            } else {
                lightboxLink.style.display = 'none';
            }
        }
    }, 180);
}

lightboxImg.style.transition = 'opacity 0.18s';

// Open on zoom button click
document.querySelectorAll('.zoom-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const item = btn.closest('.portfolio-item');
        openLightbox(item);
    });
});

// Also open on card click
portfolioItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', e => { e.stopPropagation(); navigateLightbox(-1); });
lightboxNext.addEventListener('click', e => { e.stopPropagation(); navigateLightbox(1); });

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    if (e.key === 'ArrowRight')  navigateLightbox(1);
});

// ===== CONTACT FORM — EmailJS (Fix #3) =====
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn  = document.getElementById('submitBtn');
        const orig = btn.innerHTML;

        // Validasi sederhana
        const name  = document.getElementById('from_name').value.trim();
        const email = document.getElementById('from_email').value.trim();
        const msg   = document.getElementById('message').value.trim();

        if (!name || !email || !msg) {
            setFormStatus('error', '⚠️ Please fill in all required fields.');
            return;
        }

        // Loading state
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        btn.disabled  = true;
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        /*
         * ✏️ SETUP EMAILJS (gratis, tidak perlu backend):
         * 1. Daftar di https://www.emailjs.com
         * 2. Buat Email Service (Gmail/Outlook dll) → catat SERVICE_ID
         * 3. Buat Email Template → catat TEMPLATE_ID
         *    Template variables yang dipakai: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
         * 4. Ganti YOUR_PUBLIC_KEY di <head> index.html
         * 5. Ganti SERVICE_ID dan TEMPLATE_ID di bawah ini
         */
        emailjs.sendForm('service_j1azf0n', 'template_7c2wfvn', this)
            .then(() => {
                setFormStatus('success', '✓ Message sent! I\'ll get back to you soon.');
                btn.innerHTML = orig;
                btn.disabled  = false;
                contactForm.reset();
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                setFormStatus('error', '✗ Oops! Something went wrong. Please try emailing me directly.');
                btn.innerHTML = orig;
                btn.disabled  = false;
            });
    });
}

function setFormStatus(type, message) {
    formStatus.className = 'form-status ' + type;
    formStatus.textContent = message;
    // Auto-clear success after 6s
    if (type === 'success') {
        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 6000);
    }
}

// ===== STAGGER DELAY on cards =====
document.querySelectorAll('.services-grid, .portfolio-grid, .tech-stack').forEach(grid => {
    [...grid.children].forEach((child, i) => {
        child.style.transitionDelay = (i * 0.07) + 's';
    });
});

// ===== TYPING EFFECT =====
const typingSpan = document.querySelector('.typing-text span');
const words = ['Web Developer', 'Vibe Coder', 'UI/UX Designer', 'Pengangguran', 'Mahasiswa'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(type, speed);
}

type();
