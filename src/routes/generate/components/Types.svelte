<script lang="ts">
	import IconMeat from '~icons/mdi/meat';
	import IconFish from '~icons/mdi/fish';
	import LucideVegan from '~icons/lucide/vegan';
	import ElLeaf from '~icons/el/leaf';

	import { fly } from 'svelte/transition';
	import LL from '$lib/i18n/i18n-svelte';

	const options = {
		vegan: { vegan: true, fish: false, meat: false, veggie: false },
		fish: { vegan: false, fish: true, meat: false, veggie: false },
		meat: { vegan: false, fish: false, meat: true, veggie: false },
		veggie: { vegan: false, fish: false, meat: false, veggie: true }
	};

	export let vegan = false;
	export let fish = false;
	export let meat = false;
	export let veggie = false;

	const toggleOption = (selected: keyof typeof options) => {
		({ vegan, fish, meat, veggie } = options[selected]);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex flex-wrap space-x-4 justify-center select-none">
	<button
		in:fly|global={{ y: 20, delay: 100 }}
		class="shadow-sm w-20 h-24 sm:w-32 sm:h-28 rounded-xl hover:-translate-y-1 transition-all duration-150 ease-linear border-2 {vegan
			? 'border-orange-400 border-3'
			: ''}"
		on:click={() => toggleOption('vegan')}
	>
		<div class="grid content-center dark:text-white text-center justify-center">
			<div class="flex justify-center pt-3 pb-3 sm:pb-2">
				<LucideVegan class="text-2xl sm:text-3xl md:text-4xl" />
			</div>
			<div class="pb-5 text-lg">{$LL.generate.types.vegan()}</div>
		</div>
	</button>
	<button
		in:fly|global={{ y: 20, delay: 100 }}
		class="shadow-sm w-20 h-24 sm:w-32 sm:h-28 rounded-xl hover:-translate-y-1 transition-all duration-150 ease-linear border-2 {veggie
			? 'border-orange-400 border-3'
			: ''}"
		on:click={() => toggleOption('veggie')}
	>
		<div class="grid content-center dark:text-white text-center justify-center">
			<div class="flex justify-center pt-3 pb-3 sm:pb-2">
				<ElLeaf class="text-2xl sm:text-3xl md:text-4xl" />
			</div>
			<div class="pb-2 text-lg">{$LL.generate.types.veggie()}</div>
		</div>
	</button>
	<button
		in:fly|global={{ y: 20, delay: 150 }}
		class="shadow-sm w-20 h-24 sm:w-32 sm:h-28 rounded-xl hover:-translate-y-1 transition-all duration-150 ease-linear border-2 {fish
			? 'border-orange-400 border-3'
			: ''}"
		on:click={() => toggleOption('fish')}
	>
		<div class="grid content-center dark:text-white text-center justify-center">
			<div class="flex justify-center pt-3 pb-3 sm:pb-2">
				<IconFish class="text-2xl sm:text-3xl md:text-4xl" />
			</div>
			<span class="pb-2 text-lg">{$LL.generate.types.fish()}</span>
		</div>
	</button>
	<button
		in:fly|global={{ y: 20, delay: 200 }}
		class="shadow-sm w-20 h-24 sm:w-32 sm:h-28 rounded-xl hover:-translate-y-1 transition-all duration-150 ease-linear border-2 {meat
			? 'border-orange-400 border-3'
			: ''}"
		on:click={() => toggleOption('meat')}
	>
		<div class="grid content-center dark:text-white text-center justify-center">
			<div class="flex justify-center pt-3 pb-3 sm:pb-2">
				<IconMeat class="text-2xl sm:text-3xl md:text-4xl" />
			</div>
			<div class="pb-2 text-lg">{$LL.generate.types.meat()}</div>
		</div>
	</button>
</div>
