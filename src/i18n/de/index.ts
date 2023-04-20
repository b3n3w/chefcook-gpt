import type { Translation } from '../i18n-types'
import en from '../en';

const de: Translation = {
	...(en as Translation),
	message: 'Hallo Welt',
};

export default de
