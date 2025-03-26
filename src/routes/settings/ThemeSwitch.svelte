<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';

	let darkMode = $state(true);

	function handleSwitchDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<div class="flex flex-col items-center">
	<button
		class="px-4 dark:text-white rounded-lg border {darkMode ? 'border-orange-200 border' : ''}"
		onclick={handleSwitchDarkMode}
	>
		{!darkMode ? $LL.settings.darkmode.disabled() : $LL.settings.darkmode.enabled()}
	</button>
</div>
