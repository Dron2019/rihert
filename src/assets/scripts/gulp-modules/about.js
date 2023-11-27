import gsap, { ScrollTrigger } from "gsap/all";
import pageTitleNav from "../components/page-title-nav";


gsap.registerPlugin(ScrollTrigger);
function map(selector) {
    const svg = document.querySelector(selector);
    const items = svg.closest('.container').querySelectorAll('[data-inner-infra-item]');
    items.forEach(item => {

        item.addEventListener('click', function (evt) {
            const id = evt.currentTarget.dataset.innerInfraItem;
            const path = svg.querySelector(`.${id}`);
            path.classList.toggle('active');
            evt.currentTarget.classList.toggle('active');
        });
    });

}



map('[data-about-map]');
pageTitleNav(gsap);