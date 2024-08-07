(function ($) {
    "use strict";

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        // Verificar o estado de rolagem imediatamente após o carregamento
        checkScroll();
    });

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }

        // Verificar o estado de rolagem para o botão "Back to Top"
        checkScroll();
    });

    // Função para verificar o estado de rolagem e mostrar/ocultar o botão "Back to Top"
    function checkScroll() {
        if ($(window).scrollTop() > 150) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    }

    // Back to top button
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Initialize Fancybox
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "share",
            "zoom",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ],
        loop: true,
        protect: true,
        slideShow: {
            autoStart: true,
            speed: 3000
        }
    });

    // Gallery filter
    $(".filter-button").click(function() {
        var value = $(this).attr('data-filter');
        if(value == "all") {
            $('.filter').show('1000');
        } else {
            $(".filter").not('.' + value).hide('3000');
            $('.filter').filter('.' + value).show('3000');
        }
    });

      /**
   * Init swiper sliders
   */
    function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
            swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
            initSwiperWithCustomPagination(swiperElement, config);
        } else {
            new Swiper(swiperElement, config);
        }
        });
    }

    window.addEventListener("load", initSwiper);

    /*--------------------
        Gallery Items Animation
    --------------------*/
    let progress = 50;
    let startX = 0;
    let active = 0;
    let isDown = false;

    const speedWheel = 0.02;
    const speedDrag = -0.1;

    const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)));

    const $items = document.querySelectorAll('.carousel-item');
    const $cursors = document.querySelectorAll('.cursor');

    const displayItems = (item, index, active) => {
        const zIndex = getZindex([...$items], active)[index];
        item.style.setProperty('--zIndex', zIndex);
        item.style.setProperty('--active', (index - active) / $items.length);
    };

    const animate = () => {
        progress = Math.max(0, Math.min(progress, 100));
        active = Math.floor(progress / 100 * ($items.length - 1));
        $items.forEach((item, index) => displayItems(item, index, active));
    };
    animate();

    $items.forEach((item, i) => {
        item.addEventListener('click', () => {
            progress = (i / $items.length) * 100 + 10;
            animate();
        });
    });

    const handleWheel = e => {
        const wheelProgress = e.deltaY * speedWheel;
        progress = progress + wheelProgress;
        animate();
    };

    const handleMouseMove = (e) => {
        if (e.type === 'mousemove') {
            $cursors.forEach(($cursor) => {
                $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
        }
        if (!isDown) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const mouseProgress = (x - startX) * speedDrag;
        progress = progress + mouseProgress;
        startX = x;
        animate();
    };

    const handleMouseDown = e => {
        isDown = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };

    const handleMouseUp = () => {
        isDown = false;
    };

    document.addEventListener('wheel', handleWheel);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    // Toggle menu visibility
    const toggleMenu = () => {
        $('.menu').toggleClass('show');
    };

    // Hide menu when clicking outside
    $(document).click(function (event) {
        if (!$(event.target).closest('.menu, .menu-button').length) {
            $('.menu').removeClass('show');
        }
    });

    // Toggle menu on button click
    $('.menu-button').click(function () {
        toggleMenu();
    });

})(jQuery);
