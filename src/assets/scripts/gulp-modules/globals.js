import 'current-device';
import flatpickr from "flatpickr";

function switchBodyScroll(action) {
    const body = document.body;
    if (action === 'lock') {
        body.classList.add('no-scroll');
        return;
    } else if (action === 'unlock') {
        body.classList.remove('no-scroll');
        return;
    }
}

document.body.addEventListener('click', function (evt) {
    const target = evt.target.closest('[data-open-menu]');
    if (!target) return;
    document.querySelector('[data-mobile-menu]').classList.add('open');
    switchBodyScroll('lock');
});
document.body.addEventListener('click', function (evt) {
    const target = evt.target.closest('[data-close-menu]');
    if (!target) return;
    document.querySelector('[data-mobile-menu]').classList.remove('open');
    switchBodyScroll('unlock');
});



//name="time"
document.querySelectorAll('[name="time"]').forEach(function (item) {
    const picker = flatpickr(item, {
        enableTime: true,
        minDate: "today",
        minTime: "09:00",
        
    })
});