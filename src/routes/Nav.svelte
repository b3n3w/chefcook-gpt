<script>
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
		<NavLi href="/recipes">Recipes</NavLi>
		<NavLi class="text-xl font-semibold dark:text-white" href="/generate">Create</NavLi>
		<NavLi href="/settings">Settings</NavLi>
	</NavUl>
</Navbar>
