$(document).ready(function() {

    // Левое меню открытие/закрытие
    $('.nav-btn, .nav-btn-close, nav .navigation-link').on('click', function(){
        $('.nav-btn').toggle();
        $('nav').toggleClass('nav-open');
        $('body').toggleClass('body-hidden');
    });



    // Карусель слайдер
    let elms = document.querySelectorAll('.slider');
    for (let i = 0, len = elms.length; i < len; i++) {
        // инициализация elms[i] в качестве слайдера
        new ChiefSlider(elms[i], {
            loop: true,
                autoplay: true,
                interval: 5000,
                swipe: true,
                refresh: true
        });
    }

    // Галлерея
    $('.material_gallery').on('click', function() {
        $.fancybox.open([
            {src: "img/material-5.jpg"},
            {src: "img/material-6.jpg"},
            {src: "img/material-1.jpg"},
            {src: "img/material-3.jpg"},
            {src: "img/material-4.jpg"},
            {src: "img/material-7.jpg"}
        ], {
            loop: true,
            keyboard: true,
            baseClass: 'smirnov-gallery',
            slideShow: false
        });
    });


    // Modal
    function openModal(id) {
        const modal = document.getElementById(id);
        modal.showModal();
        if (modal._activateCarousel) {
            modal._activateCarousel();
        } else {
            modal.querySelectorAll('video').forEach(v => v.play());
        }
        requestAnimationFrame(() => requestAnimationFrame(() => {
            modal.classList.add('open-modal');
        }));
        $('body').addClass('body-hidden');
    }

    function closeModal() {
        const modal = document.querySelector('.modal[open]');
        if (!modal) return;
        modal.classList.remove('open-modal');
        $('body').removeClass('body-hidden');
        modal.querySelectorAll('video').forEach(v => v.pause());
        modal.addEventListener('transitionend', function handler() {
            modal.removeEventListener('transitionend', handler);
            modal.close();
        });
    }

    $('.btn-close-modal').click(closeModal);

    // Escape: перехватываем cancel-событие диалога и запускаем анимацию закрытия
    $('.modal').on('cancel', function(e) {
        e.preventDefault();
        closeModal();
    });

    $('#openModalUvaga').click(function(){ openModal('modalUvaga'); });
    $('#openModalPeak').click(function(){ openModal('modalPeak'); });
    $('#openModalSmirnovform').click(function(){ openModal('modalSmirnovform'); });
    $('#openModalQurator').click(function(){ openModal('modalQurator'); });
    $('#openModalCmw').click(function(){ openModal('modalCmw'); });
    $('#openModalTetrika').click(function(){ openModal('modalTetrika'); });
    $('#openModalVesna').click(function(){ openModal('modalVesna'); });

    let vidAdmin = document.getElementById("qurator-admin");
    vidAdmin.playbackRate = 2;

    let vidProf = document.getElementById("qurator-prof");
    vidProf.playbackRate = 2.5;

    // UVAGA: карусель воркспейсов — у каждого слайда своё зацикленное видео
    let uvagaModal = document.getElementById("modalUvaga");
    let uvagaCarousel = uvagaModal && uvagaModal.querySelector(".carousel");
    if (uvagaCarousel) {
        let track = uvagaCarousel.querySelector(".carousel__track");
        let slides = uvagaCarousel.querySelectorAll(".carousel__slide");
        let videos = uvagaCarousel.querySelectorAll("video");
        let dots = uvagaModal.querySelectorAll(".carousel__dot");
        let caption = uvagaModal.querySelector(".carousel__caption");
        let captions = [
            "<b>Investor workspace</b> &mdash; for private-equity deal teams: market sizing, target scanning, due diligence, and exit modeling on data that refreshes daily.",
            "<b>Hospital groups</b> &mdash; where to open, where to expand, and where the public system is leaving patients waiting.",
            "<b>Diagnostics &amp; labs</b> &mdash; demand signals, equipment gaps, and white-space opportunities by region and specialty.",
            "<b>Insurers</b> &mdash; pricing, network design, and regional risk modeling on the same live data."
        ];
        let cur = 0;

        function uvagaGo(i) {
            cur = (i + slides.length) % slides.length;
            track.style.transform = "translateX(" + (-cur * 100) + "%)";
            caption.innerHTML = captions[cur];
            dots.forEach(function(d, n){ d.classList.toggle("active", n === cur); });
            videos.forEach(function(v, n){
                if (n === cur) {
                    v.currentTime = 0;
                    let p = v.play();
                    if (p && p.catch) { p.catch(function(){}); }
                } else {
                    v.pause();
                }
            });
        }

        uvagaCarousel.querySelector(".carousel__arrow_prev").addEventListener("click", function(){ uvagaGo(cur - 1); });
        uvagaCarousel.querySelector(".carousel__arrow_next").addEventListener("click", function(){ uvagaGo(cur + 1); });
        dots.forEach(function(d, n){ d.addEventListener("click", function(){ uvagaGo(n); }); });

        // запустить активный слайд при открытии модалки
        uvagaModal._activateCarousel = function(){ uvagaGo(cur); };

        uvagaGo(0);
    }


    // Магия скролла
    let controller = new ScrollMagic.Controller();


    /* Цитата */
    let quote_2 = new ScrollMagic.Scene({triggerElement: ".lastname", offset: 250})
        .setClassToggle(".quote-span-2", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_3 = new ScrollMagic.Scene({triggerElement: ".lastname", offset: 400})
        .setClassToggle(".quote-span-3", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_7 = new ScrollMagic.Scene({triggerElement: "#quote", offset: 150})
        .setClassToggle(".quote-span-7", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_31 = new ScrollMagic.Scene({triggerElement: "#quote", offset: 250})
        .setClassToggle(".quote-span-31", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_10 = new ScrollMagic.Scene({triggerElement: ".quote-span-7", offset: 100})
        .setClassToggle(".quote-span-10", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_11 = new ScrollMagic.Scene({triggerElement: ".quote-span-7", offset: 200})
        .setClassToggle(".quote-span-11", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_14 = new ScrollMagic.Scene({triggerElement: ".quote-span-7", offset: 300})
        .setClassToggle(".quote-span-14", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_20 = new ScrollMagic.Scene({triggerElement: ".quote-span-14", offset: 10})
        .setClassToggle(".quote-span-20", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_21 = new ScrollMagic.Scene({triggerElement: ".quote-span-14", offset: 50})
        .setClassToggle(".quote-span-21", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_16 = new ScrollMagic.Scene({triggerElement: ".quote-span-14", offset: 90})
        .setClassToggle(".quote-span-16", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_All = new ScrollMagic.Scene({triggerElement: ".quote-span-14", offset: 90})
        .setClassToggle(".quote-title", "quote-title_active")
        //.addIndicators({name: "active"})
        .addTo(controller);
    let quote_19 = new ScrollMagic.Scene({triggerElement: ".quote-span-14", offset: 130})
        .setClassToggle(".quote-span-19", "active")
        //.addIndicators({name: "active"})
        .addTo(controller);



    /* Весна буквы */
    let vesna = new ScrollMagic.Scene({triggerElement: "#vesna", offset: 300})
        .setClassToggle(".vesna-title-date", "active")
        //.addIndicators({name: "vesna"})
        .addTo(controller);


    /* Затемнения */
    let overlayHome = new ScrollMagic.Scene({triggerElement: "#quote", duration: 300, offset: -300})
        .setTween("#overlay-home-screen", 1, {opacity: 1})
        //.addIndicators({name: "overlay-home"})
        .addTo(controller);

    let overlayQuote = new ScrollMagic.Scene({triggerElement: "#recent", duration: 400, offset: -200})
        .setTween("#overlay-quote", 1, {opacity: 1})
        //.addIndicators({name: "overlay-quote"})
        .addTo(controller);


    let overlayRecent = new ScrollMagic.Scene({triggerElement: "#recent", duration: 400, offset: -100})
        .setTween("#overlay-recent", 1, {opacity: 0})
        //.addIndicators({name: "overlay-recent"})
        .addTo(controller);

    let overlayRecent2 = new ScrollMagic.Scene({triggerElement: "#uvaga", duration: 300, offset: -150})
        .setTween("#overlay-recent", 1, {opacity: 1})
        //.addIndicators({name: "overlay-recent-2"})
        .addTo(controller);

    let overlayQurator = new ScrollMagic.Scene({triggerElement: "#qurator", duration: 400, offset: -100})
        .setTween("#overlay-qurator", 1, {opacity: 0})
        //.addIndicators({name: "overlay-qurator"})
        .addTo(controller);

    let overlayQurator2 = new ScrollMagic.Scene({triggerElement: "#qurator", duration: 400, offset: -160})
        .setTween("#overlay-qurator-2", 1, {opacity: 0})
        //.addIndicators({name: "overlay-qurator-2"})
        .addTo(controller);


    let overlayVesna = new ScrollMagic.Scene({triggerElement: "#about", duration: 300, offset: -200})
        .setTween("#overlay-vesna-2", 1, {opacity: 1})
        //.addIndicators({name: "overlay-vesna-2"})
        .addTo(controller);

    let overlayAbout = new ScrollMagic.Scene({triggerElement: "#about", duration: 300, offset: -100})
        .setTween("#overlay-about", 1, {opacity: 0})
        //.addIndicators({name: "overlay-about"})
        .addTo(controller);


    let overlayMentoring = new ScrollMagic.Scene({triggerElement: "#mentoring", duration: 300, offset: -200})
        .setTween("#overlay-mentoring", 1, {opacity: 0})
        //.addIndicators({name: "overlay-mentoring"})
        .addTo(controller);

    let overlayMentoring2 = new ScrollMagic.Scene({triggerElement: "#sport", duration: 300, offset: -200})
        .setTween("#overlay-mentoring2", 1, {opacity: 1})
        //.addIndicators({name: "overlay-mentoring2"})
        .addTo(controller);


    let overlayPlans2 = new ScrollMagic.Scene({triggerElement: "#sport", duration: 300, offset: -200})
        .setTween("#overlay-plans2", 1, {opacity: 1})
        //.addIndicators({name: "overlay-plans-2"})
        .addTo(controller);

    let overlaySport = new ScrollMagic.Scene({triggerElement: "#sport", duration: 300, offset: -200})
        .setTween("#overlay-sport", 1, {opacity: 0})
        //.addIndicators({name: "overlay-sport"})
        .addTo(controller);

    let overlaySport2 = new ScrollMagic.Scene({triggerElement: "#traveling", duration: 300, offset: -200})
        .setTween("#overlay-sport2", 1, {opacity: 1})
        //.addIndicators({name: "overlay-sport2"})
        .addTo(controller);

    let overlayTraveling = new ScrollMagic.Scene({triggerElement: "#traveling", duration: 300, offset: -200})
        .setTween("#overlay-traveling", 1, {opacity: 0})
        //.addIndicators({name: "overlay-traveling"})
        .addTo(controller);

    let overlayTraveling2 = new ScrollMagic.Scene({triggerElement: "#hobby", duration: 300, offset: -200})
        .setTween("#overlay-traveling", 1, {opacity: 1})
        //.addIndicators({name: "overlay-traveling2"})
        .addTo(controller);

    let overlayHobby = new ScrollMagic.Scene({triggerElement: "#hobby", duration: 300, offset: -200})
        .setTween("#overlay-hobby", 1, {opacity: 0})
        //.addIndicators({name: "overlay-hobby"})
        .addTo(controller);

    let overlayHobby2 = new ScrollMagic.Scene({triggerElement: "#parachute", duration: 300, offset: -100})
        .setTween("#overlay-hobby2", 1, {opacity: 1})
        //.addIndicators({name: "overlay-hobby2"})
        .addTo(controller);

    let overlayParachute = new ScrollMagic.Scene({triggerElement: "#material", duration: 300, offset: -100})
        .setTween("#overlay-parachute", 1, {opacity: 1})
        //.addIndicators({name: "overlay-parachute"})
        .addTo(controller);

    let overlayMaterial = new ScrollMagic.Scene({triggerElement: "#material", duration: 300, offset: -100})
        .setTween("#overlay-material", 1, {opacity: 0})
        ////.addIndicators({name: "overlay-material"})
        .addTo(controller);

    let overlayMaterial2 = new ScrollMagic.Scene({triggerElement: "#love", duration: 400, offset: -200})
        .setTween("#overlay-material2", 1, {opacity: 1})
        ////.addIndicators({name: "overlay-material2"})
        .addTo(controller);

    let overlayLove = new ScrollMagic.Scene({triggerElement: "#love", duration: 400, offset: -200})
        .setTween("#overlay-love", 1, {opacity: 0})
        ////.addIndicators({name: "overlay-love"})
        .addTo(controller);

})









