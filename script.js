const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const dialog = document.querySelector('[data-dialog]');
const bookingForm = document.querySelector('[data-booking-form]');
const bookingSuccess = document.querySelector('[data-booking-success]');

function closeMenu() {
  menuToggle?.classList.remove('is-open');
  navigation?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.classList.toggle('is-open', !isOpen);
  navigation.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 6);
}, { passive: true });

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.primary-nav a')];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => navObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('[data-book-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    if (dialog?.showModal) {
      dialog.showModal();
      document.body.classList.add('dialog-open');
      dialog.querySelector('input')?.focus();
    }
  });
});

document.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  bookingForm.hidden = true;
  bookingSuccess.hidden = false;
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
