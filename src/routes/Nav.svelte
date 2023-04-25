<script>
	import LL, { locale, setLocale } from '$lib/i18n/i18n-svelte';
	import { locales } from '$lib/i18n/i18n-util';
	import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
	import { toLocalStorage } from '$lib/shared/stores/general';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	export const getLang = async (selected) => {
		await loadLocaleAsync(selected);
		setLocale($locale);
		toLocalStorage(locale, 'lang');
	};
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl uppercase font-semibold dark:text-white">
			<span class="font-thin">Recipe</span>GPT
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />

	<NavUl {hidden}>
		<select
			bind:value={$locale}
			class="rounded-lg bg-transparent h-9 text-sm border-gray-300"
			on:change={(event) => getLang(event.target.value)}
		>
			{#each locales as lang}
				<option class="text-black" value={lang}>
					{lang}
				</option>
			{/each}
		</select>

		<NavLi href="/recipes">{$LL.nav.recipes()}</NavLi>
		<NavLi class="text-xl font-semibold dark:text-white" href="/generate">{$LL.nav.create()}</NavLi>
		<NavLi href="/settings">{$LL.nav.settings()}</NavLi>
	</NavUl>
</Navbar>
