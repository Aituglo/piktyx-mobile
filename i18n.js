import { initReactI18next} from 'react-i18next';

import i18n from 'i18next';

import en from './translations/en/en.json';
import fr from './translations/fr/fr.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fr',

    keySeparator: false, // we do not use keys in form messages.welcome
    saveMissing: true,

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;