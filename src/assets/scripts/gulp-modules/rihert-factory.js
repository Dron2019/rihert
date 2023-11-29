import { Popup } from "../modules/PopupView";
import gsap from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import splitToLinesAndFadeUp from "../modules/effects/splitLinesAndFadeUp";
import '../modules/scroll/lenis';

gsap.registerPlugin(ScrollTrigger);


document.body.addEventListener('click', function (evt) {
    const target = evt.target.closest('[data-href]');
    if (!target) return;
    evt.preventDefault();
    const href = target.getAttribute('data-href');
    const popup = new Popup(href);
    popup.render();
});


splitToLinesAndFadeUp('.text-style-1920-h-2, .text-style-1920-body, .text-style-1920-h-3', gsap);