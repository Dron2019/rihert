import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';
import { isMobile, lazyImages, lazyPosters } from './modules/helpers/helpers';

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.axios = axios;
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
lazyImages();
lazyPosters();
const formsWithTel = ['[data-form]'];

formsWithTel.forEach(form => {
  const $form = document.querySelector(form);
  console.log(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: 'toster',
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
    // $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
    //   $form.querySelector('[name="phone"]').focus();
    // }, false);
  }
});

/** ******************************* */

const formWrapper = document.querySelector('[data-form-wrapper]');
const formWrapperCall = document.querySelectorAll('[data-form-wrapper-call]');
formWrapperCall.forEach(el => el.addEventListener('click',function(evt){
  gsap.timeline({
  })
    .to(formWrapper, { autoAlpha: 1, duration: 0.25 })
    .fromTo('.form-wrapper__curtains div', {
      scaleY: 0
    }, {
      scaleY: 1,
      stagger: 0.15,
      duration: 1.75,
      transformOrigin: '50% 100%',
      ease: 'power4.out'
    }, '<+0.5')
    .fromTo('.form-wrapper__layout [data-splited-line]', {
      // autoAlpha: 0,
      yPercent: 100
    }, {
      // autoAlpha: 1,
      yPercent: 0,
      ease: 'power3.out'
    },'>-55%')
    .fromTo('.subtitle, .form-wrapper__logo, .border, [data-form], .form-wrapper__close', {
      autoAlpha: 0,
    }, {
      // autoAlpha: 1,
      autoAlpha: 1,
      ease: 'power3.out',
      stagger: 0.15
    },'<')
    
}))
const splitTolines = document.querySelectorAll('[data-split-to-lines]');
splitTolines.forEach(elem => {
  if (document.documentElement.clientWidth < 1024) {
    elem.innerHTML = elem.innerHTML.replace(/~/g, '');
  } else {
    // gsap.set(splitTolines, { width: 'auto' });
    const text = elem.innerHTML.split('~').reduce((acc, el) => {
      acc += `<span style="white-space:nowrap; overflow:hidden; display: inline-block">
        <span data-splited-line style="display:inline-block">${el}</span>
      </span>`;
      return acc;
    }, '');
    elem.innerHTML = text;
  }
});

function closeForm() {
  gsap.timeline({
  })
    .fromTo('.subtitle, .form-wrapper__logo, .border, [data-form], .form-wrapper__close', {
      autoAlpha: 1,
    }, {
      autoAlpha: 0,
      ease: 'power3.out',
      stagger: 0.15
    },'<')
    .fromTo('.form-wrapper__layout [data-splited-line]', {
      // autoAlpha: 0,
      yPercent: 0
    }, {
      // autoAlpha: 1,
      yPercent: 100,
      ease: 'power3.out'
    },'>-55%')
    .fromTo('.form-wrapper__curtains div', {
      scaleY: 1
    }, {
      scaleY: 0,
      stagger: -0.15,
      duration: 1.5,
      transformOrigin: '50% 100%',

      ease: 'power4.out'
    }, '<')
    
    
    .to(formWrapper, { autoAlpha: 0, duration: 0.25 })

}
formWrapper.querySelector('[class*="close"]').addEventListener('click',closeForm);
window.addEventListener('succesFormSend',function(evt){
  setTimeout(() => {
    closeForm();
  }, 2000);
});


const screen1Image = document.querySelector('.screen1 image');
if (isMobile()) {
  screen1Image.dataset.hrefMob && screen1Image.setAttribute('xlink:href', screen1Image.dataset.hrefMob);
} else {
  screen1Image.dataset.href && screen1Image.setAttribute('xlink:href', screen1Image.dataset.href);
}