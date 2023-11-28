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