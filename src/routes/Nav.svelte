<script>
	import LL from '$lib/i18n/i18n-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger} from 'flowbite-svelte';
	
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl uppercase font-semibold dark:text-white">
			<span class="font-thin">Recipe</span>GPT
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/recipes">{$LL.nav.recipes()}</NavLi>
		<NavLi class="text-xl font-semibold dark:text-white" href="/generate">{$LL.nav.create()}</NavLi>
		<NavLi href="/settings">{$LL.nav.settings()}</NavLi>
	</NavUl>
</Navbar>
