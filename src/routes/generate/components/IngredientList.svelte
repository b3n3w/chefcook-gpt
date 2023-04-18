<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let itemLabel: string;

	function addHighlighted() {
		dispatch('addFromList');
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
	class="border-b border-gray-300 z-50 py-2 px-4 cursor-pointer bg-white hover:bg-orange-400 hover:text-white active:text-white autocomplete-active:bg-blue-500 autocomplete-active:text-white"
	on:click={addHighlighted}
>
	{@html itemLabel}
</li>
