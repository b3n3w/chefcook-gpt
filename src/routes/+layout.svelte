<script lang="ts">
	import '../app.postcss';
	import Nav from './Nav.svelte';
	import { browser } from '$app/environment';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import Footer from './Footer.svelte';

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<Nav />

<div style="height: 100vh; overflow-y: auto;">
<PageTransition>
	<slot />
</PageTransition>
</div>
<Footer/>
