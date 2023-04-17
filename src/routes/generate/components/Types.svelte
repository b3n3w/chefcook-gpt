<script lang="ts">
	import IconMeat from '~icons/mdi/meat';
	import IconFish from '~icons/mdi/fish';
	import LucideVegan from '~icons/lucide/vegan';
	import { fly } from 'svelte/transition';

	const options = {
		vegan: { vegan: true, fish: false, meat: false },
		fish: { vegan: false, fish: true, meat: false },
		meat: { vegan: false, fish: false, meat: true }
	};

	export let vegan = false;
	export let fish = false;
	export let meat = false;

	const toggleOption = (selected: keyof typeof options) => {
		({ vegan, fish, meat } = options[selected]);
	};
</script>

<div class="mt-8 mb-8">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="flex flex-wrap space-x-4 mt-8 justify-center select-none">
		<div
		in:fly={{ y: 20, delay: 100}}
			class="shadow-sm w-1/6 h-24 sm:h-32 rounded-xl hover:shadow-sm hover:shadow-purple-200 border-2 {vegan
				? 'border-orange-400 border-3'
				: ''}"
			on:click={() => toggleOption('vegan')}
		>
			<div class="grid content-center dark:text-white text-center justify-center">
				<div class="flex justify-center pt-5 pb-2 ">
					<LucideVegan class="text-3xl sm:text-3xl md:text-4xl" />
				</div>
				<div class="pb-2 text-lg">Vegan</div>
			</div>
		</div>
		<div
		in:fly={{ y: 20, delay: 150}}
			class="shadow-sm w-1/6 h-24 sm:h-32 rounded-xl hover:shadow-sm hover:shadow-purple-200 border-2 {fish
				? 'border-orange-400 border-3'
				: ''}"
			on:click={() => toggleOption('fish')}
		>
			<div class="grid content-center dark:text-white text-center justify-center">
				<div class="flex justify-center pt-5 pb-3 ">
					<IconFish class="text-3xl sm:text-3xl md:text-4xl" />
				</div>
				<span class="pb-2 text-lg">Fish</span>
			</div>
		</div>
		<div
		in:fly={{ y: 20, delay: 200}}
			class="shadow-sm w-1/6 h-24 sm:h-32 rounded-xl hover:shadow-sm hover:shadow-purple-200 border-2 {meat
				? 'border-orange-400 border-3'
				: ''}"
			on:click={() => toggleOption('meat')}
		>
			<div class="grid content-center dark:text-white text-center justify-center">
				<div class="flex justify-center pt-5 pb-3">
					<IconMeat class="text-3xl sm:text-3xl md:text-4xl" />
				</div>
				<div class="pb-2 text-lg">Meat</div>
			</div>
		</div>
	</div>
</div>
