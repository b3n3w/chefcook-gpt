import { browser } from '$app/environment';
import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
import { languageStore } from '$lib/shared/stores/general.js';
import { get } from 'svelte/store';

export const load = async (event) => {
	let locale;
	if (browser) {
		if (get(languageStore) !== '') {
			locale = get(languageStore);

			event.data.locale = locale;
		} else {
			locale = event.data.locale;
		}
		await loadLocaleAsync(locale);
	}
	return event.data as App.Locals;
};
