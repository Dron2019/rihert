import gsap from "gsap/all";
import { isMobile } from "../../modules/helpers/helpers";

export default function headerHandle() {
    const button = document.querySelector('[data-mob-toggle]');
    button.addEventListener('click', () => {
        
        gsap.set('.nav__link', {
            display: (el, t) => {
                const isHidden = getComputedStyle(t).display;
                console.log(isHidden);
                return isHidden === 'block' ? 'none' : '';
            }
        })
    })
    if (isMobile()) button.dispatchEvent(new Event('click')); 
}