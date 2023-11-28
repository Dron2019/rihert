import 'current-device';
import gsap from 'gsap/all';
import flatpickr from "flatpickr";
import '../modules/formsHandler';

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
        disableMobile: false,

    })
});

function detectTabletByScreenOrientation() {
    if (window.innerWidth > 767 && (window.innerWidth < window.innerHeight) && (window.innerWidth / window.innerHeight) > 0.5) {
        document.documentElement.classList.add('tablet');
        document.documentElement.classList.remove('desktop');

        return;
    } else {
        return false;
    }
}

detectTabletByScreenOrientation();


document.querySelectorAll('[data-mobile-text]').forEach(function (item) {
    item.textContent = item.dataset.mobileText;
});



function mobilePopupShowHandler() {
    if (!document.documentElement.classList.contains('mobile')) return;

    const popup = document.querySelector('[data-mobile-callback-popup]');

    document.body, addEventListener('click', function (evt) {
        // data-mobile-callback-close
        const target = evt.target.closest('[data-mobile-callback-popup-call]');
        if (!target) return;

        popup.classList.add('active');
    });
    document.body, addEventListener('click', function (evt) {
        // data-mobile-callback-close
        if (evt.target.classList.contains('mobile-callback-popup')) {
            return popup.classList.remove('active');
        }
        const target = evt.target.closest('[data-mobile-callback-close]');
        if (!target) return;

        popup.classList.remove('active');
    });
}

mobilePopupShowHandler();


function reviewFormOpenHandler(dataAttr, callDataAttr) {
    const formWrapper = document.querySelector(dataAttr);
    const formWrapperCall = document.querySelectorAll(callDataAttr);
    formWrapperCall.forEach(el => el.addEventListener('click', function (evt) {
        gsap.timeline({
        })
            .to(formWrapper, { autoAlpha: 1, duration: 0.25 })
            .fromTo(`${dataAttr} .form-wrapper__curtains div`, {
                scaleY: 0
            }, {
                scaleY: 1,
                stagger: 0.15,
                duration: 1.75,
                transformOrigin: '50% 100%',
                ease: 'power4.out'
            }, '<+0.5')
            .fromTo(`${dataAttr} .form-wrapper__layout [data-splited-line]`, {
                // autoAlpha: 0,
                yPercent: 100
            }, {
                // autoAlpha: 1,
                yPercent: 0,
                ease: 'power3.out'
            }, '>-55%')
            .fromTo(`${dataAttr}.form-wrapper .display-mobile-only,${dataAttr}.form-wrapper .subtitle,${dataAttr}  .form-wrapper__logo,${dataAttr}  .border,${dataAttr}  [data-form],${dataAttr}  .form-wrapper__close`, {
                autoAlpha: 0,
            }, {
                // autoAlpha: 1,
                autoAlpha: 1,
                ease: 'power3.out',
                stagger: 0.15
            }, '<')
            .set(`${dataAttr} .form-wrapper__layout`, { backgroundColor: 'var(--color-red)' })
    }));

    function closeForm() {
        gsap.timeline({
        })
            .fromTo(`${dataAttr}.form-wrapper .display-mobile-only, ${dataAttr} .form-wrapper .subtitle, ${dataAttr} .form-wrapper__logo, ${dataAttr} .border,  ${dataAttr} [data-form], ${dataAttr} .form-wrapper__close`, {
                autoAlpha: 1,
            }, {
                autoAlpha: 0,
                ease: 'power3.out',
                stagger: 0.15
            }, '<')
            .set(`${dataAttr} .form-wrapper__layout`, { backgroundColor: '' }, ' <')
            .fromTo(`${dataAttr} .form-wrapper__layout [data-splited-line]`, {
                // autoAlpha: 0,
                yPercent: 0
            }, {
                // autoAlpha: 1,
                yPercent: 100,
                ease: 'power3.out'
            }, '>-55%')
            .fromTo(`${dataAttr} .form-wrapper__curtains div`, {
                scaleY: 1
            }, {
                scaleY: 0,
                stagger: -0.15,
                duration: 1.5,
                transformOrigin: '50% 100%',

                ease: 'power4.out'
            }, '<')


            .to(formWrapper, { autoAlpha: 0, duration: 0.25 }).timeScale(2);

    }
    formWrapper.querySelector('[class*="close"]').addEventListener('click', closeForm);

    const splitTolines = document.querySelectorAll('[data-split-to-lines]');
    splitTolines.forEach(elem => {
    const text = elem.innerHTML.split('~').reduce((acc, el) => {
        acc += `<span style="white-space:nowrap; overflow:hidden; display: inline-block">
        <span data-splited-line style="display:inline-block">${el}</span>
        </span>`;
        return acc;
    }, '');
    elem.innerHTML = text;
    });
}


reviewFormOpenHandler('[data-form-wrapper]', '[data-form-wrapper-call]');
reviewFormOpenHandler('[data-callback-form-wrapper]', '[data-callback-form-wrapper-call]');


function agreementPopupHandler() {
    const popup = document.querySelector('[data-agreement-popup]');
    const popupClose = document.querySelector('[data-agreement-popup-close]');
    const popupCall = document.querySelector('[data-agreement-popup-call]');

    popupCall.addEventListener('click', function (evt) {
        popup.classList.add('active');
    });
    popupClose.addEventListener('click', function (evt) {
        popup.classList.remove('active');
    });
}

agreementPopupHandler();