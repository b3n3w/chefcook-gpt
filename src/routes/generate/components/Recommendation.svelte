<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	interface Props {
		ingredient?: string;
	}

	let { ingredient = '' }: Props = $props();

	function addRecomendation() {
		dispatch('addChip');
	}
</script>

<button
	class="center inline-block select-none rounded-xl bg-orange-400 mr-2 py-1.5 px-1.5 align-baseline text-xs font-medium uppercase leading-none text-white"
	onclick={addRecomendation}
>
	{ingredient}
</button>
