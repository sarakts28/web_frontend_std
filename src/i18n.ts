import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import da from './i18n/da.json';
import en from './i18n/eng.json';

i18n
  .use(initReactI18next) // React binding
  .init({
    resources: {
      en: { translation: en },
      da: { translation: da },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
