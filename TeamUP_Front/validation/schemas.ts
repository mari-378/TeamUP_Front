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
    birthDate: yup
      .object({
        day: yup
          .number()
          .nullable()
          .required(t('validation.dayRequired'))
          .min(1, t('validation.invalidDay'))
          .max(31, t('validation.invalidDay')),
        month: yup
          .number()
          .nullable()
          .required(t('validation.monthRequired'))
          .min(1, t('validation.invalidMonth'))
          .max(12, t('validation.invalidMonth')),
        year: yup
          .number()
          .nullable()
          .required(t('validation.yearRequired'))
          .min(1900, t('validation.invalidYear'))
          .max(2024, t('validation.invalidYear')),
      }),
      gender: yup
        .string()
        .required(t('validation.genderRequired'))
        .oneOf(['F', 'M', 'Outro'], t('validation.invalidGender'))
  });