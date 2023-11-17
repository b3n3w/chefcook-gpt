<script>
	import LL from '$lib/i18n/i18n-svelte';
	import { Heading } from 'flowbite-svelte';
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
			customSize="text-xl font-extrabold  md:text-2xl lg:text-2xl"
			>{$LL.landing.header.gen()}</Heading
		>
		<div
			class="bg-gradient-to-r bg-clip-text text-transparent from-yellow-200 text-grad to-orange-500 to-90% mb-3 text-center uppercase font-extrabold md:text-4xl lg:text-3xl"
		>
			{$LL.landing.header.recipe()}
		</div>
		<Heading
			tag="h1"
			class="mb-3 text-center"
			customSize="text-xlfont-extrabold  md:text-2xl lg:text-2xl">{$LL.landing.header.ai()}</Heading
		>
	</div>
	<div class="mt-10 px-3 text-center sm:text-center">
		<span class="dark:text-white mx-auto uppercase font-light text-md sm:text-xl">
			{$LL.landing.idea()}
		</span>
	</div>

	<div class="pt-8 flex justify-center">
		<a href="/generate">
			<button
				class="bg-gradient-to-r rounded-xl text-white from-yellow-400 to-orange-500 to-90% px-5 py-3 hover:from-orange-500 hover:to-yellow-400"
			>
				{$LL.common.button()}
			</button>
		</a>
	</div>
</div>

<style>
</style>
