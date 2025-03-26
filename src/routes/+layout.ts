import { browser } from '$app/environment';
import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
import { languageState } from '$lib/shared/states.svelte.js';

export const load = async (event) => {
	let locale;
	if (browser) {
		if (languageState.lang !== 'de') {
			locale = languageState
			event.data.locale = locale;
		} else {
			locale = event.data.locale;
		}
		await loadLocaleAsync(locale);
	}
	return event.data as App.Locals;
};
