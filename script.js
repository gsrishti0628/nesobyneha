// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Custom order form submission
const form = document.getElementById('order-form');
const submitBtn = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formId = form.action.includes('YOUR_FORM_ID');
  if (formId) {
    // Demo mode — show success without actually submitting
    showSuccess();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showSuccess();
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send My Request ✦';
      alert('Something went wrong. Please try again or email directly via Instagram DM.');
    }
  } catch {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send My Request ✦';
    alert('Network error. Please try again.');
  }
});

function showSuccess() {
  form.reset();
  submitBtn.style.display = 'none';
  formSuccess.classList.add('visible');
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Smooth fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-card, .process-steps li, .about-text, .about-image').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
