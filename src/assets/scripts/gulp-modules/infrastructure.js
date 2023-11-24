import tippy from 'tippy.js';
import pageTitleNav from '../components/page-title-nav';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import googleMap from '../modules/map/map';

gsap.registerPlugin(ScrollTrigger);

const isScrollable = function (ele) {
    // Compare the height to see if the element has scrollable content
    const hasScrollableContent = ele.scrollWidth > ele.clientWidth;

    // It's not enough because the element's `overflow-y` style can be set as
    // * `hidden`
    // * `hidden !important`
    // In those cases, the scrollbar isn't shown
    const overflowXStyle = window.getComputedStyle(ele).overflowX;
    const isOverflowHidden = overflowXStyle.indexOf('hidden') !== -1;

    return hasScrollableContent && !isOverflowHidden;
};



function innerInfraMap(selector) {
    const svg = document.querySelector(selector);
    const items = svg.closest('.inner-infra-container').querySelectorAll('[data-inner-infra-item]');
    items.forEach(item => {
        item.addEventListener('mouseenter', function (evt) {
            const id = evt.currentTarget.dataset.innerInfraItem;
            const path = svg.querySelector(`.${id}`);
            path.classList.add('active');
        });
        item.addEventListener('mouseleave', function (evt) {
            const id = evt.currentTarget.dataset.innerInfraItem;
            const path = svg.querySelector(`.${id}`);
            path.classList.remove('active');
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
});


// googleMap();