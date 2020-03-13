$(function() {

  var modal = $('.modal'),
      overlay = $('.overlay'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close'),
      top_show = 500,
      delay = 1000,
      data = [overlay, modalBtn, closeBtn];

      /* Modal window */

      function switchModal() {
        modal.toggleClass('modal_visible');
        overlay.toggleClass('overlay_visible');
      }

      $.each(data, function(index, value) {
        value.click(function(e) {
          e.preventDefault();
          switchModal();
        });
      });

      $(document).keydown(function(e) {
        if(e.which === 27) {
          if(modal.hasClass('modal_visible')) {
            switchModal();
          }
        }
      });

      /* Scroll top */

      $(window).scroll(function () {
        if ($(this).scrollTop() > top_show) {
          $('.top-btn').fadeIn();
        } 
        else {
          $('.top-btn').fadeOut();
        } 
      });
      $('.top-btn').click(function () {
        $('body, html').animate({
          scrollTop: 0
        }, delay);
      });
  
});