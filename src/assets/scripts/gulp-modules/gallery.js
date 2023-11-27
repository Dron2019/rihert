import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';

const galleryContainer = document.querySelector('.gallery-container .swiper-container');

const swiper = new Swiper(galleryContainer, {
  // Swiper configuration options
    modules: [ Navigation ],
    slidesPerView: 'auto',
    spaceBetween: 40,
    navigation: {
        nextEl: '.gallery-container .gallery-container__nav svg:last-child',
        prevEl: '.gallery-container .gallery-container__nav svg:first-child',
    },
});

function addDataIndexToSlides() {
    const slides = galleryContainer.querySelectorAll('.swiper-slide');
    slides.forEach((slide, index) => {
        slide.setAttribute('data-index', index);
    });
}

addDataIndexToSlides();

function galleryPopupSliderHandler(mainSlider) {
    const gallertPopup = document.querySelector('[data-gallery-popup]');
    const galleryPopupContainer = document.querySelector('[data-gallery-popup] .swiper-container');
    const galleryPopupSlider = new Swiper(galleryPopupContainer, {
        // Swiper configuration options
        modules: [ Navigation ],
        slidesPerView: 'auto',
        spaceBetween: 40,
        navigation: {
            nextEl: '[data-gallery-popup] .gallery-popup__buttons button:last-child',
            prevEl: '[data-gallery-popup] .gallery-popup__buttons button:first-child',
        },
    });
    

    galleryPopupSlider.slideTo(mainSlider.activeIndex);
    galleryPopupSlider.on('slideChange', function () {
        mainSlider.slideTo(galleryPopupSlider.activeIndex);
    });
    mainSlider.on('click', function (swiper, e) {
        const target = e.target.closest('.swiper-slide');
        if (!target) return;
        console.log(target);
        gallertPopup.classList.add('active');
        galleryPopupSlider.slideTo(target.dataset.index);
    });

    // galleryContainer.addEventListener('click', function (e) {

    // });
    document.body.addEventListener('click', function (e) {
        const target = e.target.closest('.gallery-popup__close');
        if (!target) return;
            gallertPopup.classList.remove('active');
    });
}

galleryPopupSliderHandler(swiper);