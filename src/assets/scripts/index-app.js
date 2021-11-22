import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';

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
        successAction: () => {
        },
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
    .fromTo('.form-wrapper__layout', { scale: 0.75 },{
      scale: 1,
      transformOrigin: '100% 100%',
      duration: 1,
      ease: 'power2.out'
    })
    // .fromTo(formWrapper, 
    //   { 
    //     clipPath: 'polygon(100% 0%, 100% 100%, 100% 100%, 100% 50%, 100% 0%)', 
    //     webkitClipPath: 'polygon(100% 0%, 100% 100%, 100% 100%, 100% 50%, 100% 0%)',
    //     ease: 'power3.out',
    //     duration: 0.25
    //   },
    //   { 
    //     clipPath: 'polygon(100% 0%, 100% 100%, 51% 100%, 63% 52%, 61% 0%)', 
    //     webkitClipPath: 'polygon(100% 0%, 100% 100%, 51% 100%, 63% 52%, 61% 0%)',
    //     ease: 'power3.in',
    //     duration: 0.25
    //   })
    // .to(formWrapper, 
    //   { 
    //     clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 38% 50%, 16% 0%)', 
    //     webkitClipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 38% 50%, 16% 0%)',
    //     ease: 'power3.out',
    //     duration: 0.25
    // })
    // .to(formWrapper, 
    //   { 
    //     clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 50%, 0% 0%)', 
    //     webkitClipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 50%, 0% 0%)',
    //     ease: 'power3.in',
    //     duration: 0.25
    //   })
}))
formWrapper.querySelector('[class*="close"]').addEventListener('click',function(evt){
  gsap.timeline({
  })
  .to('.form-wrapper__layout', {
    scale: 0.75,
    transformOrigin: '100% 100%',
    duration: 1,
    ease: 'power2.in',
  })
  .to(formWrapper, { autoAlpha: 0, duration: 0.25 })
});
