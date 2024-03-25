import tippy from 'tippy.js';
import '../modules/scroll/lenis';
import pageTitleNav from '../components/page-title-nav';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { paralaxesScreens } from '../modules/effects/paralax';
import osm from '../modules/map/osm/osm';

gsap.registerPlugin(ScrollTrigger);


paralaxesScreens('desktop', gsap);

function innerInfraMap(selector) {
    const svg = document.querySelector(selector);
    const items = svg.closest('.inner-infra-container').querySelectorAll('[data-inner-infra-item]');
    items.forEach(item => {

        item.addEventListener('click', function (evt) {
            const id = evt.currentTarget.dataset.innerInfraItem;
            const path = svg.querySelector(`.${id}`);
            path.classList.toggle('active');
            evt.currentTarget.classList.toggle('active');
        });
    });

}

innerInfraMap('[data-inner-infra-svg]');
innerInfraMap('[data-parkings-infra-svg]');


tippy('[data-tooltip]', {
    allowHTML: true,
    trigger: 'click',
    maxWidth: 200,
    content: (target) => {
        // console.log(e);
        const image = target.dataset.tooltipImage ? `<img src="${target.dataset.tooltipImage}" alt="">` : '';
        return `
            ${image}
            <span class="text-style-1920-tiny">
                ${target.dataset.tooltip}
            </span>
            `;
    },
});

pageTitleNav(gsap);
if (!document.documentElement.classList.contains('desktop')) { 
}



function handleMobileBlockImageHorizontalScroll(el) {
    const parent = el.closest('.container');
    const slider = parent.querySelector('input');
    const sliderSvg = el;
    const slideSvgButton = sliderSvg.querySelector('.swipe');
    const slideSvgButtonRadius = +slideSvgButton.querySelector('circle').getAttribute('r');
    const imageScrollContainer = parent.querySelector('.inner-infra-container__svg');
    const sliderSvgWidth = sliderSvg.getAttribute('viewBox').split(' ')[2];

    slider.value = 0;
    slider.setAttribute('max', imageScrollContainer.scrollWidth);

    slider.addEventListener('input', (evt) => {
        imageScrollContainer.scrollTo({
            left: evt.target.value - window.innerWidth / 2
        });

        const swipeXoffset = gsap.utils.mapRange(
            0,
            evt.target.getAttribute('max'),
            slideSvgButtonRadius * 2, sliderSvgWidth,
            evt.target.value
        );
    //     sliderSvg.insertAdjacentHTML('afterbegin', `
    //     <circle cx="40" cy="40" r="39.5" stroke="#fff" stroke-dasharray="1 10" class="Ellipse 83"></circle>
    //   `);
        slideSvgButton.setAttribute('transform', `translate(${swipeXoffset - (slideSvgButtonRadius * 2)} ,0)`)
    });

    slider.value = imageScrollContainer.scrollWidth / 2;
    slider.dispatchEvent(new Event('input'));
}

document.querySelectorAll('.block-style-column__mobile-slider').forEach(handleMobileBlockImageHorizontalScroll);


document.body.addEventListener('click', function (evt) {
    const target = evt.target.closest('.legend-button-js');
    if (!target) return;
    target.parentElement.querySelector('.legend-js').classList.toggle('closed');
    target.classList.toggle('closed');
});


// googleMap();

/*
    AUTO NAVIGATION START
*/

function infraNavigation() {
    const scrollClickDistance = 75;
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
    
    document.querySelectorAll('.scroller-container [id*="infrastructure"]').forEach((el, index) => {
        const target = document.querySelector(`[data-developer-nav="#${el.id}"]`);
        if (!target) return;
        const trigger = ScrollTrigger.create({
            trigger: el,
            endTrigger: el.dataset.endTrigger ? el.dataset.endTrigger : el,
            start: 'top 0',
            end: el.dataset.endTrigger ? '-10% 100%' : 'bottom 100%',
            onEnter: () => {
                // if (index === 0) return;
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
        gsap.to(pageNav, { scrollLeft: pageNav.scrollLeft + scrollClickDistance, duration: 0.5 });
    });
    pageNav.querySelector('.page-title-nav__scroll-button').addEventListener('click', () => {      
        gsap.to(pageNav, { scrollLeft: pageNav.scrollLeft - scrollClickDistance, duration: 0.5 });
    });

    
    /**hide nav buttons on scroll edges */
    if (pageNav.scrollLeft === 0) {
        pageNav.querySelector('.page-title-nav__scroll-button').style.display = 'none';
    } else {
        pageNav.querySelector('.page-title-nav__scroll-button').style.display = '';
    }

    pageNav.addEventListener('scroll', () => {
        // console.log(pageNav.scrollLeft, pageNav.scrollWidth - pageNav.clientWidth);
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


infraNavigation();
/*
    AUTO NAVIGATION end
*/



/* map launch */

function mapLaunch() {
    const map = document.querySelector('#map');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();
                osm(map);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    observer.observe(map);
}

mapLaunch();

/* map launch END */