import NativeI18n from 'react-native-i18n';
import { En, Fr, Zh } from '../Languages';
import 'moment/locale/fr';
import 'moment/locale/zh-cn';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
NativeI18n.fallbacks = true;

// English language is the main language for fall back:
NativeI18n.translations = {
    'en': En,
};

let languageCode = NativeI18n.locale.substr(0, 2);

// All other translations for the app goes to the respective language file:
switch (languageCode) {
    case 'zh':
        NativeI18n.translations.zh = Zh;
        break;
    case 'fr':
        NativeI18n.translations.fr = Fr;
        break;
    default:
        NativeI18n.translations.en = En;
        break;
}

export const I18n = NativeI18n;


