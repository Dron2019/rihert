import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import pageTitleNav from '../components/page-title-nav';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Step 1: Get a reference to the container element
const container = document.querySelector('[data-developer-slider1]');

Swiper.use([Navigation]);

const isDesktop = document.documentElement.classList.contains('desktop');

// Step 2: Create a new instance of Swiper
const swiper1 = new Swiper(container, {
    // Step 3: Configure the Swiper options
    // Add your desired options here
    navigation: {
        nextEl: '[data-developer-slider1] .developer-slider-nav svg:nth-child(2)',
        prevEl: '[data-developer-slider1] .developer-slider-nav svg:nth-child(1)',
    },
    spaceBetween: 60,
    slidesPerView: isDesktop ? 2 : 1, // Display 2 slides at a time
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
    slidesPerView: isDesktop ? 2 : 1, // Display 2 slides at a time
});





/*

#developer-about
#developer-objects-in-progress 
#developer-objects-ready
#developer-objects-in-development
*/
if (document.documentElement.classList.contains('mobile')) {
    pageTitleNav(gsap);
    document.querySelectorAll('[data-developer-nav]').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(el.dataset.developerNav);
            if (!target) return;
            el.scrollIntoView({});
            document.querySelectorAll('.active[data-developer-nav]').forEach((el) => {
                el.classList.remove('active');
            })
            el.classList.add('active');
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 100,
                behavior: 'smooth'
            });
        })
    });
    
    const pageNav = document.querySelector('.page-title-nav');
    
    document.querySelectorAll('.scroller-container [id*="developer"]').forEach((el, index) => {
        const target = document.querySelector(`[data-developer-nav="#${el.id}"]`);
        if (!target) return;
        const trigger = ScrollTrigger.create({
            trigger: el,
            endTrigger: el.dataset.endTrigger ? el.dataset.endTrigger : el,
            start: 'top 0',
            end: el.dataset.endTrigger ? '-10% 100%' : 'bottom 100%',
            onEnter: () => {
                document.querySelectorAll('.active[data-developer-nav]').forEach((el) => {
                    el.classList.remove('active');
                })
                target.classList.add('active');
                gsap.to(pageNav, { scrollLeft: el.getBoundingClientRect().width * index + 1 - el.getBoundingClientRect().width, duration: 0.5 });
            },
            onEnterBack: () => {
                document.querySelectorAll('.active[data-developer-nav]').forEach((el) => {
                    el.classList.remove('active');
                })
                target.classList.add('active');
                gsap.to(pageNav, { scrollLeft: el.getBoundingClientRect().width * index + 1 - el.getBoundingClientRect().width, duration: 0.5 });
            }
        });
    });

    pageNav.querySelector('.page-title-nav__scroll-button-next').addEventListener('click', () => {      
        gsap.to(pageNav, { scrollLeft: pageNav.scrollLeft + 50, duration: 0.5 });
    });
    pageNav.querySelector('.page-title-nav__scroll-button').addEventListener('click', () => {      
        gsap.to(pageNav, { scrollLeft: pageNav.scrollLeft - 50, duration: 0.5 });
    });
}

