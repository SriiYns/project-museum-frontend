import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../src/locales/en/translation.json';
import idTranslation from '../src/locales/id/translation.json';
import sasakTranslation from '../src/locales/sasak/translation.json';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      id: {
        translation: idTranslation,
      },
      sasak: {
        translation: sasakTranslation,
      }
    },
    lng: 'id',
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false,
    },
  }
  );

export default i18n;