document.addEventListener('DOMContentLoaded', function(event) {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => {
    modal.classList.toggle('modal_visible');
    overlay.classList.toggle('overlay_visible');
  };

  modalBtn.forEach(elem => {
    elem.addEventListener('click', switchModal);
  });

  closeBtn.addEventListener('click', switchModal);
  overlay.addEventListener('click', switchModal);

  document.addEventListener('keydown', (event) => {
    if(event.code == 'Escape') {
      if(modal.classList.contains('modal_visible')) {
        switchModal();
      }
    }
  });
});