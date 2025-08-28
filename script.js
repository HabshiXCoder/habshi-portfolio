// Portfolio: Habshi Ahamed
// Enhanced, clean, human-written, and commented JS for UI interactivity

// ----------- NAV BAR HAMBURGER FOR MOBILE -----------
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', primaryNav.classList.contains('open'));
  });
  // Close on nav link click (mobile)
  primaryNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => primaryNav.classList.remove('open'));
  });
}

// ----------- MODAL POPUP LOGIC -----------
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Show modal with given content
function showModal(title, details) {
  modalTitle.innerHTML = title || '';
  modalBody.innerHTML = details || '';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent scroll
}
// Hide modal
function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
if (modalClose) modalClose.addEventListener('click', closeModal);
// Click outside modal closes it
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
// Escape key closes modal
window.addEventListener('keydown', e => {
  if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') closeModal();
});
// All clickable cards/sections
document.querySelectorAll('.clickable').forEach(card => {
  card.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') return; // Don't trigger on links
    const title = this.getAttribute('data-title') || '';
    const details = this.getAttribute('data-details') || '';
    showModal(title, details);
  });
});

// ----------- CONTACT FORM HANDLING -----------
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Basic client-side validation
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const msg = this.message.value.trim();
    if (!name || !email || !msg) {
      formStatus.textContent = 'Please fill out all fields.';
      formStatus.style.color = '#ff4d55';
      return;
    }
    // Simulate sending (replace with real backend call as desired)
    formStatus.textContent = 'Sending...';
    formStatus.style.color = '#0068d6';
    setTimeout(() => {
      formStatus.textContent = 'Thank you! Your message has been sent 🎉';
      formStatus.style.color = '#05c7a3';
      contactForm.reset();
    }, 1000);
  });
  contactForm.addEventListener('reset', () => {
    formStatus.textContent = '';
  });
}

// ----------- SECTION FADE-UP ANIMATION ON SCROLL -----------
function animateOnScroll() {
  document.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    const visible = rect.top < window.innerHeight - 80;
    el.style.opacity = visible ? 1 : 0;
    el.style.transform = visible ? 'none' : 'translateY(38px)';
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// ----------- ACCESSIBILITY: Focus Trap for Modal -----------
modal.addEventListener('keydown', e => {
  if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Tab') {
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
});

// ----------- ENHANCED: Ripple Effect on .btns -----------
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    circle.className = 'ripple';
    this.appendChild(circle);
    const d = Math.max(this.offsetWidth, this.offsetHeight);
    circle.style.width = circle.style.height = `${d}px`;
    circle.style.left = `${e.offsetX - d/2}px`;
    circle.style.top = `${e.offsetY - d/2}px`;
    setTimeout(() => circle.remove(), 700);
  });
});

// Footer enhancements: smooth scroll for anchor links, heart animation restart on focus
document.querySelectorAll('.footer-link[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      target.focus && target.focus();
    }
  });
});

const heart = document.querySelector('.footer-heart');
if (heart) {
  heart.addEventListener('focus', () => {
    heart.style.animation = 'none';
    void heart.offsetWidth; // trigger reflow
    heart.style.animation = '';
  });
}