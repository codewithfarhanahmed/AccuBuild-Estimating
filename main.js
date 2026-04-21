/* ============================================
   ACCUBUILD ESTIMATING – MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ---- Active nav link ----
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ---- Hamburger / Mobile Nav ----
  const hamburger = document.getElementById('hamburger');
  let mobileNav = document.querySelector('.mobile-nav');

  if (!mobileNav) {
    mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
      <button class="mobile-nav-close" id="mobileClose">✕</button>
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="trades.html">Our Trades</a>
      <a href="pricing.html">Pricing</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="contact.html" style="color: var(--gold); margin-top: 20px;">Get Estimate →</a>
    `;
    document.body.appendChild(mobileNav);
  }

  hamburger?.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  document.getElementById('mobileClose')?.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });

  // ---- Scroll Animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.serve-card, .svc-card, .process-step, .testi-card, .trade-card, .price-card, .svc-overview-card, .trade-item, .why-feat, .faq-item, .contact-detail'
  ).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      contactForm.reset();
      const success = document.getElementById('formSuccess');
      if (success) { success.style.display = 'block'; setTimeout(() => success.style.display = 'none', 5000); }
    }, 1800);
  });

  // ---- Ticker speed control on hover ----
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
  }

  // ---- Counter animations ----
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const end = parseFloat(target.dataset.count);
      const duration = 1800;
      const step = 16;
      const increment = end / (duration / step);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) { current = end; clearInterval(timer); }
        target.textContent = Number.isInteger(end)
          ? Math.floor(current).toLocaleString()
          : current.toFixed(0) + '%';
      }, step);
      countObs.unobserve(target);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));

});
