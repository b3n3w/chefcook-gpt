<script>
	import LL, { locale, setLocale } from '$lib/i18n/i18n-svelte';
	import { locales } from '$lib/i18n/i18n-util';
	import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { languageState } from '$lib/shared/states.svelte';

	export const getLang = async (selected) => {
		await loadLocaleAsync(selected);
		setLocale($locale);
		languageState.lang = selected;
	};
</script>

<Navbar>
	{#snippet children({ hidden, toggle })}
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl uppercase font-semibold dark:text-white">
				<span class="font-thin">Recipe</span>GPT<span class="lowercase text-sm font-light"></span>
			</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />

		<NavUl {hidden}>
			<select
				bind:value={$locale}
				class="rounded-lg bg-transparent h-9 text-sm border-gray-300"
				onchange={(event) => getLang(event.target.value)}
			>
				{#each locales as lang}
					<option class="text-black" value={lang}>
						{lang}
					</option>
				{/each}
			</select>

			<NavLi href="/recipes">{$LL.nav.recipes()}</NavLi>
			<NavLi class="text-xl font-semibold dark:text-white" href="/generate"
				>{$LL.nav.create()}</NavLi
			>
			<NavLi href="/settings">{$LL.nav.settings()}</NavLi>
		</NavUl>
	{/snippet}
</Navbar>
