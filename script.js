// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Active-section highlighting in nav
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
  const map = new Map();
  navAnchors.forEach((a) => map.set(a.getAttribute('href').slice(1), a));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

// Contact form: submits to Google Forms via a hidden iframe so the
// page doesn't navigate away, and shows a confirmation message.
const contactForm = document.getElementById('contactForm');
const hiddenIframe = document.getElementById('hidden_iframe');
const cfStatus = document.getElementById('cfStatus');

if (contactForm && hiddenIframe && cfStatus) {
  let submitted = false;

  contactForm.addEventListener('submit', () => {
    submitted = true;
    cfStatus.textContent = 'Sending...';
  });

  hiddenIframe.addEventListener('load', () => {
    if (!submitted) return; // ignore the initial blank iframe load
    cfStatus.textContent = "Thanks, your message has been sent. I'll get back to you soon.";
    contactForm.reset();
    submitted = false;
  });
}
