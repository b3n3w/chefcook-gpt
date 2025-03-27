<script lang="ts">
	import '../app.postcss';
	import { browser } from '$app/environment';
	import Footer from './Footer.svelte';
	import { setLocale } from '$lib/i18n/i18n-svelte.js';
	import Navbar from './Navbar.svelte';

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

<div class="bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-700">
	<Navbar />

	<div class="min-h-screen p-4">
		<slot />
	</div>

	<Footer />
</div>
