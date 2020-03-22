$(function() {

  var modal = $('.modal'),
      overlay = $('.overlay'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal-close'),
      top_show = 0,
      delay = 1000;
      /* Modal window */

      function modalOpen(className) {
        $('.' + className).addClass('modal_visible');
        overlay.addClass('overlay_visible');
      }

      function modalClose(className) {
        $('.' + className).removeClass('modal_visible');
        overlay.removeClass('overlay_visible');
      }

      modalBtn.click(function() {
        modalOpen('modal-wind');
      });

      closeBtn.click(function() {
        closeBtn.parents('.modal').removeClass('modal_visible');
        overlay.removeClass('overlay_visible');
      });

      overlay.click(function() {
        modalClose('modal');
      });

      $(document).keydown(function(e) {
        if(e.which === 27) {
          modalClose('modal');
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

      /* Scroll down btn */

      $("a[href^='#']").click(function(e) {
        e.preventDefault();
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"}, (delay / 2));
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

      /* Wow init */

      new WOW().init();

      /* Validation forms */

      function loadIcon(form) {
        $(form).find('.load').css('display', 'inline-block');
      }

      $('#modal-form').validate({
        errorClass: 'invalid',
        errorElement: 'div',
        errorPlacement: function(error, element) {
          error.prependTo(element.parent());
        },      
        rules: {
          name: {
            required: true,
            minlength: 2,
            maxlength: 15
          },
          phone: {
            required: true,
            minlength: 18
          },
          email: {
            required: true,
            email: true
          },
          policy: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Это обязательное поле',
            minlength: 'Минимальная длина 2 символа',
            maxlength: 'Максимальная длина 15 символов'
          },
          phone: {
            required: 'Это обязательное поле',
            minlength: 'Введите номер плностью'
          },
          email: {
            required: 'Это обязательное поле',
            email: 'Некорректный email'
          },
          policy: {
            required: 'Дайте согласие на обработку данных'
          }
        },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: 'send.php',
            data: $(form).serialize(),
            beforeSend: function() {
              $(form).find('.load').fadeIn();
            },
            success: function(res) {
              $(form).find('.load').fadeOut();
              if(res == 1) {
                $('.modal-alert__text').html('Сообщение успешно отправлено').addClass('success');
              }
              else {
                $('.modal-alert__text').html('Ошибка отправки сообщения').addClass('error');
              }
              modalClose('modal-wind');   
            },
            complete: function() {
              $(form)[0].reset();
              modalOpen('modal-alert');
            }
          });
        }             
      });

      $('#footer-form').validate({
        errorClass: 'invalid',
        errorElement: 'div',
        errorPlacement: function(error, element) {
          error.prependTo(element.parent());
        },
        rules: {
          name: {
            required: true,
            minlength: 2,
            maxlength: 15
          },
          phone: {
            required: true,
            minlength: 18
          },
          quest: {
            required: true,
            minlength: 2,
          },
          policy: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Это обязательное поле',
            minlength: 'Минимальная длина 2 символа',
            maxlength: 'Максимальная длина 15 символов'
          },
          phone: {
            required: 'Это обязательное поле',
            minlength: 'Введите номер плностью'
          },
          quest: {
            required: 'Это обязательное поле',
            minlength: 'Минимальная длина 2 символа',
          },
          policy: {
            required: 'Дайте согласие на обработку данных'
          }
        },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: 'send.php',
            data: $(form).serialize(),
            beforeSend: function() {
              $(form).find('.load').fadeIn();
            },
            success: function(res) {
              $(form).find('.load').fadeOut();
              if(res == 1) {
                $('.modal-alert__text').html('Сообщение успешно отправлено').addClass('success');
              }
              else {
                $('.modal-alert__text').html('Ошибка отправки сообщения').addClass('error');
              }
            },
            complete: function() {
              $(form)[0].reset();
              modalOpen('modal-alert');
            }
          });
        }   
      });

      $('#control-form').validate({
        errorClass: 'invalid',
        errorElement: 'div',
        errorPlacement: function(error, element) {
          error.prependTo(element.parent());
        },
        rules: {
          name: {
            required: true,
            minlength: 2,
            maxlength: 15
          },
          phone: {
            required: true,
            minlength: 18
          },
          policy: {
            required: true
          }
        },
        messages: {
          name: {
            required: 'Это обязательное поле',
            minlength: 'Минимальная длина 2 символа',
            maxlength: 'Максимальная длина 15 символов'
          },
          phone: {
            required: 'Это обязательное поле',
            minlength: 'Введите номер плностью'
          },
          policy: {
            required: 'Дайте согласие на обработку данных'
          }
        },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: 'send.php',
            data: $(form).serialize(),
            beforeSend: function() {
              $(form).find('.load').fadeIn();
            },
            success: function(res) {
              $(form).find('.load').fadeOut();
              if(res == 1) {
                $('.modal-alert__text').html('Сообщение успешно отправлено').addClass('success');
              }
              else {
                $('.modal-alert__text').html('Ошибка отправки сообщения').addClass('error');
              }
            },
            complete: function() {
              $(form)[0].reset();
              modalOpen('modal-alert');
            }
          });
        }      
      });

      /* Mask */

      $('.mask-tel').mask('+7 (000) 000-00-00', {placeholder: '+7 (___) ___-__-__'});

      /* Yandex Map */

      function init(){
          var myMap = new ymaps.Map('map', {
              center: [47.24472357536472,39.72318282705297],
              zoom: 18
          });

          myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Россия, Ростов-на-Дону, улица Нансена, 239',
            balloonContent: 'Вход со двора'
          }, {
              iconLayout: 'default#image',
              iconImageHref: 'img/location.png',
              iconImageSize: [32, 32],
              iconImageOffset: [-5, -38]
          });

          myMap.geoObjects.add(myPlacemark);
          myMap.behaviors.disable('scrollZoom');
      }

      $(window).bind('scroll', function() {
        if($(this).scrollTop() > $('#team').offset().top) {
          ymaps.ready(init);
          $(this).unbind('scroll');
        }
      });
});