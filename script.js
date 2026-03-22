/* =============================================
   GABY DIGITAL — JAVASCRIPT
   ============================================= */

// --- Nav scroll behavior ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Mobile hamburger ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- Coverage bar animation ---
const covBars = document.querySelectorAll('.cov-bar');
if (covBars.length) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-bar');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  covBars.forEach(bar => barObserver.observe(bar));
}

// --- Hero flip text ---
const flipWords = ['websites', 'web apps', 'online stores', 'landing pages', 'digital brands'];
let flipIndex = 0;
const flipEl = document.getElementById('heroFlip');

function flipNext() {
  flipEl.classList.add('fade-out');
  setTimeout(() => {
    flipIndex = (flipIndex + 1) % flipWords.length;
    flipEl.textContent = flipWords[flipIndex];
    flipEl.classList.remove('fade-out');
    flipEl.classList.add('fade-in');
    setTimeout(() => flipEl.classList.remove('fade-in'), 300);
  }, 260);
}

setInterval(flipNext, 2800);

// --- Scroll-in animations (Intersection Observer) ---
const animatables = document.querySelectorAll(
  '.service-card, .process-step, .work-card, .testimonial-card, .about__card, .contact-detail'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add initial hidden state via JS (avoids flash without JS)
animatables.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity .5s ease ${(i % 4) * 0.08}s, transform .5s ease ${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// Inject animate-in styles
const style = document.createElement('style');
style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// --- Contact form validation (real submission handled by FormSubmit) ---
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    e.preventDefault();
    showFormMessage('Please fill in your name, email, and project details.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    e.preventDefault();
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }

  // Valid — let the form submit naturally to FormSubmit
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
});

function showFormMessage(text, type) {
  const existing = form.querySelector('.form__feedback');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className = 'form__feedback';
  msg.textContent = text;
  msg.style.cssText = `
    margin-top: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    background:#3a1a0a; color:#F68220; border: 1px solid rgba(246,130,32,.3);
  `;
  form.appendChild(msg);
  setTimeout(() => msg.remove(), 6000);
}

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
