const bookingModal = document.querySelector('#booking-modal');
const bookingForm = document.querySelector('#booking-form');
document.querySelectorAll('[data-booking-open]').forEach((button) => button.addEventListener('click', () => bookingModal?.showModal()));
document.querySelector('.modal-close')?.addEventListener('click', () => bookingModal?.close());
bookingModal?.addEventListener('click', (event) => { if (event.target === bookingModal) bookingModal.close(); });
bookingForm?.addEventListener('submit', (event) => { event.preventDefault(); const message = bookingForm.querySelector('.form-message'); message.textContent = 'Kiitos! Soittopyyntösi on vastaanotettu. Otamme yhteyttä mahdollisimman pian.'; bookingForm.reset(); });

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menuButton?.setAttribute('aria-expanded', 'false')));

document.querySelector('#year').textContent = new Date().getFullYear();
