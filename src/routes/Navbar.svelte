<script lang="ts">
	import LL, { locale, setLocale } from '$lib/i18n/i18n-svelte';
	import { locales } from '$lib/i18n/i18n-util';
	import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
	import { toLocalStorage } from '$lib/shared/stores/general';

	let isMenuOpen = false;

	export const getLang = async (selected: string) => {
		await loadLocaleAsync(selected);
		setLocale($locale);
		toLocalStorage(locale, 'lang');
	};

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};
</script>

<nav class="flex flex-col md:flex-row space-y-2 justify-between p-4 items-center">
	<div class="flex justify-between w-full md:w-auto items-center">
		<a href="/">
			<span class="self-center whitespace-nowrap text-xl uppercase font-semibold dark:text-white">
				<span class="font-thin tracking-wide">Chefcook</span>GPT
			</span>
		</a>

		<button
			class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
			on:click={toggleMenu}
			aria-label="Toggle menu"
		>
			<svg class="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if isMenuOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				{/if}
			</svg>
		</button>
	</div>

	<div
		class="flex flex-col space-y-3 md:flex-row md:space-x-6 justify-center items-center transition-all duration-300 ease-in-out {isMenuOpen
			? 'opacity-100 max-h-screen'
			: 'opacity-0 max-h-0 md:opacity-100 md:max-h-screen overflow-hidden'}"
	>
		<ul class="flex flex-row space-x-4">
			<li class="text-md dark:text-gray-200 dark:hover:text-white">
				<a href="/recipes">{$LL.nav.recipes()}</a>
			</li>
			<li class="text-xl font-semibold dark:text-gray-200 dark:hover:text-white">
				<a href="/generate">{$LL.nav.create()}</a>
			</li>
			<li class="text-md dark:text-gray-200 dark:hover:text-white">
				<a href="/settings">{$LL.nav.settings()}</a>
			</li>
		</ul>
		<select
			bind:value={$locale}
			class="rounded-lg bg-transparent h-9 text-sm dark:text-white focus:border-orange-400 focus:outline-none focus:ring-0"
			on:change={(event) => getLang(event.target.value)}
		>
			{#each locales as lang}
				<option class="text-black dark:text-white" value={lang}>
					{lang}
				</option>
			{/each}
		</select>
	</div>
</nav>
