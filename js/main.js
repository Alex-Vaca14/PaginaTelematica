// Menú adaptable para pantallas pequeñas
const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

// Validación accesible del formulario (demostración, no envía datos a un servidor).
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const fields = [
  { input: document.querySelector('#nombre'), error: document.querySelector('#error-nombre'), message: 'Escribe tu nombre completo.' },
  { input: document.querySelector('#correo'), error: document.querySelector('#error-correo'), message: 'Escribe un correo válido, por ejemplo nombre@correo.com.' },
  { input: document.querySelector('#mensaje'), error: document.querySelector('#error-mensaje'), message: 'Escribe tu mensaje.' }
];

function validateField(field) {
  const value = field.input.value.trim();
  let valid = value.length > 0;
  if (field.input.type === 'email' && valid) {
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  field.input.setAttribute('aria-invalid', String(!valid));
  field.input.closest('.form-field').classList.toggle('invalid', !valid);
  field.error.textContent = valid ? '' : field.message;
  return valid;
}

fields.forEach((field) => {
  field.input.addEventListener('input', () => {
    if (field.input.getAttribute('aria-invalid') === 'true') validateField(field);
    if (formStatus) formStatus.classList.remove('success');
  });
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const results = fields.map(validateField);
    const firstInvalid = fields.find((field, index) => !results[index]);
    if (firstInvalid) {
      firstInvalid.input.focus();
      if (formStatus) {
        formStatus.textContent = 'Revisa los campos señalados antes de continuar.';
        formStatus.classList.remove('success');
      }
      return;
    }
    if (formStatus) {
      formStatus.textContent = '¡Formulario validado! Esta demostración no envía el mensaje a un servidor.';
      formStatus.classList.add('success');
    }
    contactForm.reset();
    fields.forEach((field) => {
      field.input.setAttribute('aria-invalid', 'false');
      field.error.textContent = '';
      field.input.closest('.form-field').classList.remove('invalid');
    });
  });
}

// Año del pie de página actualizado automáticamente.
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
