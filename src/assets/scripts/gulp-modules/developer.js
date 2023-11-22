import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';

// Step 1: Get a reference to the container element
const container = document.querySelector('[data-developer-slider1]');

Swiper.use([Navigation]);

// Step 2: Create a new instance of Swiper
const swiper1 = new Swiper(container, {
    // Step 3: Configure the Swiper options
    // Add your desired options here
    navigation: {
        nextEl: '[data-developer-slider1] .developer-slider-nav svg:nth-child(2)',
        prevEl: '[data-developer-slider1] .developer-slider-nav svg:nth-child(1)',
    },
    spaceBetween: 60,
    slidesPerView: 2, // Display 2 slides at a time
});

const container2 = document.querySelector('[data-developer-slider2]');

const swiper2 = new Swiper(container2, {
    // Step 3: Configure the Swiper options
    // Add your desired options here
    navigation: {
        nextEl: '[data-developer-slider2] .developer-slider-nav svg:nth-child(2)',
        prevEl: '[data-developer-slider2] .developer-slider-nav svg:nth-child(1)',
    },
    spaceBetween: 60,
    slidesPerView: 2, // Display 2 slides at a time
});


