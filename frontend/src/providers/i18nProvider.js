import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import { i18nWords } from '@app-constants';

export const i18nProvider = polyglotI18nProvider(() => ({ ...russianMessages, ...i18nWords }), 'ru');
