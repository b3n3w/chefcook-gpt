<script lang="ts">
	import { removeRecipe } from '$lib/shared/stores/general';
	import BiTrashFill from '~icons/bi/trash-fill';

	export let mealname = '';
	export let description = '';
	export let estimated_time = '';
</script>

<div
	class="relative bg-white border border-slate-200/30 dark:bg-slate-200 rounded-lg shadow-sm hover:shadow-lg shadow-neutral-100 p-4 m-4 mb-4 lg:w-96"
>
	<h2 class="text-lg text-center font-bold mb-2">{mealname}</h2>
	<p class="text-gray-700 text-center mb-4 font-medium">{estimated_time}</p>
	<hr class="h-px my-4 mx-8 bg-gray-200 border-0 dark:bg-gray-700/20" />
	<div class="font-thin">{description}</div>
	<button class="absolute top-2 right-2 text-gray-500" on:click={() => removeRecipe(mealname)}
		><BiTrashFill class="text-slate-300 hover:text-orange-400" /></button
	>
</div>
