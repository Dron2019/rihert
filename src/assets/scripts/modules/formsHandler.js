import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';

import FormMonster from "../../../pug/components/form/form";
import SexyInput from "../../../pug/components/input/input";



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

                    agreement: {
                        inputWrapper: new SexyInput({
                            animation: 'none',
                            $field: $form.querySelector('[data-field-agreement]'),
                            typeInput: 'checkbox',
                        }),
                        rule: yup
                            .bool()
                            .nullable()
                            .oneOf([true], i18next.t('required')),

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