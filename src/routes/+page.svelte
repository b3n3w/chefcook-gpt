<script>
	import LL from '$lib/i18n/i18n-svelte';
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
			customSize="text-xl font-extrabold  md:text-2xl lg:text-2xl">{$LL.landing.header.gen()}</Heading
		>
		<Heading
			tag="h1"
			class="mb-3 text-center uppercase"
			customSize="text-xl font-extrabold  md:text-4xl lg:text-3xl"
			><Span gradient>{$LL.landing.header.recipe()}</Span></Heading
		>
		<Heading
			tag="h1"
			class="mb-3 text-center"
			customSize="text-xl font-extrabold  md:text-2xl lg:text-2xl">{$LL.landing.header.ai()}</Heading
		>
	</div>
	<div class="mt-10">
		<span class="dark:text-white text-center uppercase font-light text-md sm:text-xl">
			{$LL.landing.idea()}</span
		>
	</div>

	<div class="pt-8 flex justify-center">
		<Button href="/generate" class="btn-generate" gradient color="cyanToBlue" size="xl"
			>{$LL.common.button()}</Button
		>
	</div>
</div>

<style>
</style>
