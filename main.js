/* ============================================
   ACCUBUILD ESTIMATING – MAIN JS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ---- Active nav link ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > li > a').forEach(a => {
    const href = a.getAttribute('href')?.split('#')[0];
    if (href === currentPage) a.classList.add('active');
  });

  /* ---- Mobile Nav (accordion) ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('is-open');
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });
  mobileClose?.addEventListener('click', () => {
    hamburger?.classList.remove('is-open');
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  });

  /* Mobile accordion groups */
  document.querySelectorAll('.mob-group').forEach(group => {
    const trigger = group.querySelector('.mob-link');
    trigger?.addEventListener('click', () => {
      const isOpen = group.classList.contains('open');
      document.querySelectorAll('.mob-group.open').forEach(g => g.classList.remove('open'));
      if (!isOpen) group.classList.add('open');
    });
  });

  /* ---- Scroll Animations ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.serve-card,.svc-card,.process-step,.testi-card,.trade-card,.price-card,.svc-overview-card,.trade-item,.why-feat,.faq-item,.contact-detail,.g-item,.sw-badge'
  ).forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

  /* ---- FAQ ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig; btn.disabled = false;
      contactForm.reset();
      const s = document.getElementById('formSuccess');
      if (s) { s.style.display = 'block'; setTimeout(() => s.style.display = 'none', 5000); }
    }, 1800);
  });

  /* ---- Ticker pause on hover ---- */
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
  }

  /* ---- Counter animations ---- */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const end = parseFloat(target.dataset.count);
      const step = 16;
      const increment = end / (1800 / step);
      let cur = 0;
      const t = setInterval(() => {
        cur += increment;
        if (cur >= end) { cur = end; clearInterval(t); }
        target.textContent = Number.isInteger(end) ? Math.floor(cur).toLocaleString() : Math.floor(cur) + '%';
      }, step);
      countObs.unobserve(target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(c => countObs.observe(c));

});
