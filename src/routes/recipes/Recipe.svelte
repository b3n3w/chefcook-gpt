<script lang="ts">
	import { removeRecipe } from '$lib/shared/stores/general';

	export let index = 0;
	export let mealname = '';
	export let description = '';
	export let estimated_time = '';
</script>

<div
	class="relative bg-white dark:bg-slate-200 rounded-lg shadow-sm hover:shadow-lg shadow-neutral-100 p-4 m-4 mb-4 lg:w-96 transition delay-{(index +
		1) *
		200}"
>
	<button
		class="absolute top-2 right-2 text-gray-500 hover:text-red-500"
		on:click={() => removeRecipe(mealname)}>X</button
	>
	<h2 class="text-lg text-center font-bold mb-2">{mealname}</h2>
	<p class="text-gray-700 text-center mb-4 font-medium">{estimated_time}</p>

	<div class="font-thin">{description}</div>
</div>
