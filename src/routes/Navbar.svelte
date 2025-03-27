<script>
	import LL, { locale, setLocale } from '$lib/i18n/i18n-svelte';
	import { locales } from '$lib/i18n/i18n-util';
	import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
	import { toLocalStorage } from '$lib/shared/stores/general';

	export const getLang = async (selected) => {
		await loadLocaleAsync(selected);
		setLocale($locale);
		toLocalStorage(locale, 'lang');
	};
</script>

<nav class="flex flex-col md:flex-row space-y-2 justify-between p-4 items-center">
	<a href="/">
		<span class="self-center whitespace-nowrap text-xl uppercase font-semibold dark:text-white">
			<span class="font-thin tracking-wide">Chefcook</span>GPT
		</span>
	</a>

	<div class="flex flex-col space-y-3 md:flex-row space-x-6 justify-center items-center">
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
