import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import pageTitleNav from '../components/page-title-nav';
import '../modules/scroll/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import splitToLinesAndFadeUp from '../modules/effects/splitLinesAndFadeUp';
import { paralaxesScreens } from '../modules/effects/paralax';

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
if (!document.documentElement.classList.contains('desktop')) {
    pageTitleNav(gsap);
    document.querySelectorAll('[data-developer-nav]').forEach((el, index) => {
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
                top: index === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - 100,
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
            start: 'top 50%',
            end: el.dataset.endTrigger ? '-10% 50%' : 'bottom 50%',
            // markers: true,
            onEnter: () => {
                if (index === 0) return;
                document.querySelectorAll('.active[data-developer-nav]').forEach((el) => {
                    el.classList.remove('active');
                })
                target.classList.add('active');
                const sumOfWidth = Array.from(pageNav.children).reduce((acc, el, i) => {
                    if (i < index) {
                        acc += el.getBoundingClientRect().width;
                    }
                    return acc;
                }, 0);

                gsap.to(pageNav, { scrollLeft: sumOfWidth, duration: 0.5 });
            },
            onEnterBack: () => {
                document.querySelectorAll('.active[data-developer-nav]').forEach((el) => {
                    el.classList.remove('active');
                })
                target.classList.add('active');
                const sumOfWidth = Array.from(pageNav.children).reduce((acc, el, i) => {
                    console.log('el.getBoundingClientRect().width', el.getBoundingClientRect().width);
                    if (i < index) {
                        acc += el.getBoundingClientRect().width;
                    }
                    return acc;
                }, 0);

                gsap.to(pageNav, { scrollLeft: sumOfWidth, duration: 0.5 });
            }
        });
    });

    pageNav.querySelector('.page-title-nav__scroll-button-next').addEventListener('click', () => {      
        gsap.to(pageNav, { scrollLeft: pageNav.scrollLeft + 50, duration: 0.5 });
    });
    pageNav.querySelector('.page-title-nav__scroll-button').addEventListener('click', () => {      
        gsap.to(pageNav, { scrollLeft: pageNav.scrollLeft - 50, duration: 0.5 });
    });


    /**hide nav buttons on scroll edges */
    if (pageNav.scrollLeft === 0) {
        pageNav.querySelector('.page-title-nav__scroll-button').style.display = 'none';
    } else {
        pageNav.querySelector('.page-title-nav__scroll-button').style.display = '';
    }

    pageNav.addEventListener('scroll', () => {
        console.log(pageNav.scrollLeft, pageNav.scrollWidth - pageNav.clientWidth);
        if (pageNav.scrollLeft === 0) {
            pageNav.querySelector('.page-title-nav__scroll-button').style.display = 'none';
        } else {
            pageNav.querySelector('.page-title-nav__scroll-button').style.display = '';
        }
        if (pageNav.scrollLeft > (pageNav.scrollWidth - pageNav.clientWidth - 40)) {
            pageNav.querySelector('.page-title-nav__scroll-button-next').style.display = 'none';
        } else {
            pageNav.querySelector('.page-title-nav__scroll-button-next').style.display = '';
        }
    });
}


splitToLinesAndFadeUp('.text-style-1920-h-2, .text-style-1920-body, .text-style-1920-h-3', gsap)


//clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

document.querySelectorAll('.developer-object').forEach((el) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: el,
            once: true,
            start: 'top 80%',
        }
    })
        .fromTo(el, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.75, ease: 'power4.out' })
})


paralaxesScreens('desktop', gsap);