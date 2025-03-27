<script lang="ts">
	import { goto } from '$app/navigation';
	import { slugify } from '$lib/helpers';
	import { removeRecipe } from '$lib/shared/stores/general';
	import BiTrashFill from '~icons/bi/trash-fill';

	export let mealname = '';
	export let description = '';
	export let estimated_time = '';

	function openRecipe() {
		let slug = slugify(mealname);
		goto(`/recipe/${slug}`);
	}
</script>

<button
	on:click={openRecipe}
	class="relative bg-white border border-slate-200/30 dark:bg-slate-200 rounded-xl h-52 sm:h-52 hover:shadow-neutral-200 hover:-translate-y-1 duration-150 ease-linear p-4 m-4 mb-4 lg:w-96"
>
	<h2 class="text-lg text-center font-bold mb-2">{mealname}</h2>
	<p class="text-gray-700 text-center mb-4 font-medium">{estimated_time}</p>
	<hr class="h-px my-4 mx-8 bg-gray-200 border-0 dark:bg-gray-700/20" />
	<div class="font-thin text-center">{description}</div>
	<div class="absolute top-2 right-2 text-gray-500" on:click={() => removeRecipe(mealname)}>
		<BiTrashFill class="text-slate-300 hover:text-orange-400" />
	</div>
</button>
