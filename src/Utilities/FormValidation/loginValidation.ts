import * as Yup from 'yup';

export const getLoginValidationSchema = (t) =>
  Yup.object({
    email: Yup.string().email(t('invalidEmail')).required(t('emailRequired')),
    password: Yup.string()
      .min(4, t('passwordMinLength'))
      .required(t('passwordRequired')),
  });
