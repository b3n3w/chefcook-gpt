<script lang="ts">
	import { recipesStore, recipeStore } from '$lib/shared/stores/general';
	import type { Recipe } from '$lib/interface/Recipe';
	import LL from '$lib/i18n/i18n-svelte';

	import { goto } from '$app/navigation';
	import RecipeCard from './RecipeCard.svelte';
	import { fly } from 'svelte/transition';
	import { slugify } from '$lib/helpers';

	function openRecipe(recipeSelect: Recipe) {
		let slug = slugify(recipeSelect.mealname);
		goto(`/recipe/${slug}`);
	}
</script>

<div class="dark:text-white text-2xl mt-4 font-light text-center">{$LL.recipes.header()}</div>
<div class="stack-container sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-wrap justify-center">
	{#if $recipesStore.length != 0}
		{#each $recipesStore as recipe, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => openRecipe(recipe)} in:fly|global={{ y: 5, delay: (i + 1) * 30 }}>
				<RecipeCard
					bind:mealname={recipe.mealname}
					bind:estimated_time={recipe.estimated_time}
					bind:description={recipe.description}
				/>
			</div>
		{/each}
	{:else}
		<div class="flex flex-col items-center">
			<div class="dark:text-white text-2xl mt-10 text-center">
				{$LL.recipes.noRecipes()}
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
	{/if}
</div>
