$(function() {

  var modal = $('.modal'),
      overlay = $('.overlay'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close'),
      top_show = 0,
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

      /* Slider in projects */

      var projectsSwiper = new Swiper ('.projects-slider', {
        loop: true,

        pagination: {
          el: '.projects__slider-pagination',
          clickable: true,
        },

        navigation: {
          nextEl: '.projects__slider-button-next',
          prevEl: '.projects__slider-button-prev',
        },
      });

      var projectsSwiperRight = new Swiper('.projects-slider_right', {
        loop: true,
        effect: 'fade',

        pagination: {
          el: '.projects__slider-pagination',
          clickable: true
        },

        navigation: {
          nextEl: '.projects__slider-button-next',
          prevEl: '.projects__slider-button-prev',
        },
      });

      /* Sliders in steps */
      
      var stepsSwiperLeft = new Swiper('.steps-slider', {
        loop: true,

        pagination: {
          el: '.steps__slider-pagination',
          type: 'bullets',
          clickable: true
        },

        navigation: {
          nextEl: '.steps__slider-button-next',
          prevEl: '.steps__slider-button-prev',
        },

      });

      var sliderTilels = $('.steps-slider__slide:not(.swiper-slide-duplicate)').find('.steps-slider__title');
      var slideCount = sliderTilels.length;
      var activeSlide = stepsSwiperLeft.activeIndex;

      function createStepsCounter(activeIndex, countSlides) {
        $('.steps-counter').html('<span class="steps-current">' + activeIndex + '</span>/<span class="steps-total">' + countSlides + '</span>');
      }

      function createChaptersPagination(count, titles) {
        var html = '';
        var countCeils = 3;
        var countRows = Math.ceil(count / countCeils);
        var progres = 0;

        for(var i = 0; i < countRows; i++) {
          html += '<div class="slider-chapters__row">';
          for(var j = 1; j <= countCeils; j++) {
            html += '<div class="slider-chapters-text ' + ((activeSlide == (j + progres)) ? 'slider-chapters-text_active' : '') + ' slider-chapters__text" data-index="' + (j + progres) + '"><div class="slider-chapters-text__number">' + ((count < 10) ? '0' : '') + (j + progres) + '</div><div class="slider-chapters-text__descr">' + getTitileText(titles, j + progres - 1) + '</div></div>';
            if(j + progres == count) break;
          }
          html += '</div>';
          progres += countCeils;
        }
        
        return html;
      }

      function getTitileText(data, index) {
        return data[index].innerHTML;
      }

      $('.slider-chapters').html(createChaptersPagination(slideCount, sliderTilels));
      createStepsCounter(activeSlide, slideCount);

      stepsSwiperLeft.on('slideChange', function() {
        var activeIndex = stepsSwiperLeft.realIndex;
        var chapterElems = $('.slider-chapters-text');
        for(var i = 0; i < chapterElems.length; i++) {
          if($(chapterElems[i]).attr('data-index') == (activeIndex + 1)) {
            $(chapterElems[i]).addClass('slider-chapters-text_active');
          }
          else {
            $(chapterElems[i]).removeClass('slider-chapters-text_active');
          }
        }
        
        $('.steps-current').html(activeIndex + 1);
      });

      $('.slider-chapters-text').click(function() {
        var dataIndex = $(this).attr('data-index');
        stepsSwiperLeft.slideTo(dataIndex);
        stepsSwiperRight.slideTo(dataIndex);
      });

      var stepsSwiperRight = new Swiper('.steps-slider_right', {
        loop: true,
        effect: 'cube',

        pagination: {
          el: '.steps__slider-pagination',
          type: 'bullets',
          clickable: true
        },
        
        navigation: {
          nextEl: '.steps__slider-button-next',
          prevEl: '.steps__slider-button-prev',
        },

      });
});