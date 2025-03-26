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

	interface Props {
		vegan?: boolean;
		fish?: boolean;
		meat?: boolean;
		veggie?: boolean;
	}

	let {
		vegan = $bindable(false),
		fish = $bindable(false),
		meat = $bindable(false),
		veggie = $bindable(false)
	}: Props = $props();

	const toggleOption = (selected: keyof typeof options) => {
		({ vegan, fish, meat, veggie } = options[selected]);
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="flex flex-wrap space-x-2 sm:space-x-4 justify-center select-none">
	<div
		in:fly|global={{ y: 20, delay: 100 }}
		class="shadow-sm w-16 h-24 sm:w-32 sm:h-28 rounded-xl hover:shadow-sm hover:shadow-purple-200 border-2 {vegan
			? 'border-orange-400 border-3'
			: ''}"
		onclick={() => toggleOption('vegan')}
	>
		<div class="grid content-center dark:text-white text-center justify-center">
			<div class="flex justify-center pt-3 pb-3 sm:pb-2">
				<LucideVegan class="text-2xl sm:text-3xl md:text-4xl" />
			</div>
			<div class="pb-5 text-lg">{$LL.generate.types.vegan()}</div>
		</div>
	</div>
	<div
		in:fly|global={{ y: 20, delay: 100 }}
		class="shadow-sm w-16 h-24 sm:w-32 sm:h-28 rounded-xl hover:shadow-sm hover:shadow-purple-200 border-2 {veggie
			? 'border-orange-400 border-3'
			: ''}"
		onclick={() => toggleOption('veggie')}
	>
		<div class="grid content-center dark:text-white text-center justify-center">
			<div class="flex justify-center pt-3 pb-3 sm:pb-2">
				<ElLeaf class="text-2xl sm:text-3xl md:text-4xl" />
			</div>
			<div class="pb-2 text-lg">{$LL.generate.types.veggie()}</div>
		</div>
	</div>
	<div
		in:fly|global={{ y: 20, delay: 150 }}
		class="shadow-sm w-16 h-24 sm:w-32 sm:h-28 rounded-xl hover:shadow-sm hover:shadow-purple-200 border-2 {fish
			? 'border-orange-400 border-3'
			: ''}"
		onclick={() => toggleOption('fish')}
	>
		<div class="grid content-center dark:text-white text-center justify-center">
			<div class="flex justify-center pt-3 pb-3 sm:pb-2">
				<IconFish class="text-2xl sm:text-3xl md:text-4xl" />
			</div>
			<span class="pb-2 text-lg">{$LL.generate.types.fish()}</span>
		</div>
	</div>
	<div
		in:fly|global={{ y: 20, delay: 200 }}
		class="shadow-sm w-16 h-24 sm:w-32 sm:h-28 rounded-xl hover:shadow-sm hover:shadow-purple-200 border-2 {meat
			? 'border-orange-400 border-3'
			: ''}"
		onclick={() => toggleOption('meat')}
	>
		<div class="grid content-center dark:text-white text-center justify-center">
			<div class="flex justify-center pt-3 pb-3 sm:pb-2">
				<IconMeat class="text-2xl sm:text-3xl md:text-4xl" />
			</div>
			<div class="pb-2 text-lg">{$LL.generate.types.meat()}</div>
		</div>
	</div>
</div>
