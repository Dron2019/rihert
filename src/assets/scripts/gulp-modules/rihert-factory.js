import { Popup } from "../modules/PopupView";
import '../modules/scroll/lenis';


document.body.addEventListener('click', function (evt) {
    const target = evt.target.closest('[data-href]');
    if (!target) return;
    evt.preventDefault();
    const href = target.getAttribute('data-href');
    const popup = new Popup(href);
    popup.render();
});
