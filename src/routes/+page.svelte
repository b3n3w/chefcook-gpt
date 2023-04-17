<script>
	import { Heading, Span } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="grid grid-flow-row auto-rows-max mt-10 justify-center">
	<div class="flex flex-wrap justify-center mb-5">
		<img src="vegan_logo.svg" width="80" height="80" alt="background image" />
	</div>
	<div in:fade={{ delay: 20 }}>
		<Heading
			tag="h1"
			class="mb-3 text-center"
			customSize="text-xl font-extrabold  md:text-2xl lg:text-2xl">Generate</Heading
		>
		<Heading
			tag="h1"
			class="mb-3 text-center uppercase"
			customSize="text-xl font-extrabold  md:text-4xl lg:text-3xl"
			><Span gradient>Your recipe</Span></Heading
		>
		<Heading
			tag="h1"
			class="mb-3 text-center"
			customSize="text-xl font-extrabold  md:text-2xl lg:text-2xl">With AI</Heading
		>
	</div>
	<div class="mt-10">
		<span class="dark:text-white text-center uppercase font-thin text-md sm:text-lg">
			<span class="font-semibold">food</span>
			at home but no idea what to <span class="font-semibold">Cook</span> ?</span
		>
	</div>

	<div class="pt-8 flex justify-center">
		<Button href="/generate" class="btn-generate" gradient color="cyanToBlue" size="xl"
			>Get your recipe</Button
		>
	</div>
</div>

<style>
</style>
