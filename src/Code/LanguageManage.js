import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import tEn from '../locales/en/translation.json';
import tHi from '../locales/hi/translation.json';
import tur from '../locales/ur/translation.json';
import tar from '../locales/ar/translation.json';


i18n.use(initReactI18next).init({

    resources: {
        en: {
            translation: tEn
        },
        hi:
        {
            translation: tHi
        },
        ur:
        {
            translation: tur
        },
        ar:
        {
            translation : tar
        }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});


export default function HandleLanguage  (value)  {     

        i18n.changeLanguage(value);
        // window.sessionStorage.setItem("langId", langId);
    
};