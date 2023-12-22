import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglishHome from '../utils/translations/English/englishHome.json';
import translationEnglishForm from '../utils/translations/English/englishForm.json';
import translationEnglishSudoku from '../utils/translations/English/englishSudoku.json';
import translationHungarianHome from '../utils/translations/Hungarian/hungarianHome.json';
import translationHungarianForm from '../utils/translations/Hungarian/hungarianForm.json';
import translationHungarianSudoku from '../utils/translations/Hungarian/hungarianSudoku.json';

const resources = {
  en: {
    home: translationEnglishHome,
    form: translationEnglishForm,
    sudoku: translationEnglishSudoku,
  },
  hu: {
    home: translationHungarianHome,
    form: translationHungarianForm,
    sudoku: translationHungarianSudoku,
  },
};

const language = window.localStorage.getItem('SUDOKU_APP_LANGUAGE') as string;

i18next.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: 'en',
});

export default i18next;
