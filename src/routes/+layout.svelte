<script lang="ts">
	import '../app.postcss';
	import Nav from './Nav.svelte';
	import { browser } from '$app/environment';
	import Footer from './Footer.svelte';
	import { setLocale } from '$lib/i18n/i18n-svelte.js';
	
	export let data;

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		setLocale(data.locale);
	}
</script>

<Nav />

<div style="height: 100vh; overflow-y: auto;">
	<slot />
</div>
<Footer />
