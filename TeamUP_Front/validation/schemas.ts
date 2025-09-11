import * as yup from 'yup';

export const loginSchema = (t: any) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.emailRequired')),
    password: yup
      .string()
      .min(6, t('validation.passwordMin'))
      .required(t('validation.passwordRequired')),
  });

export const signUpSchema = (t: any) =>
  yup.object().shape({
    name: yup.string().required(t('validation.nameRequired')),
    email: yup
      .string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.emailRequired')),
    password: yup
      .string()
      .min(6, t('validation.passwordMin', { min: 6 }))
      .required(t('validation.passwordRequired')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.passwordsMustMatch'))
      .required(t('validation.confirmPasswordRequired')),
    // adicionar campos futuros aqui
    // birthday: yup.
    // gender: yup.
  });