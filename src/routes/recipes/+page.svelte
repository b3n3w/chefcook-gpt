<script lang="ts">
	import { recipesStore, recipeStore, removeRecipe } from '$lib/shared/stores/general';
	import type { Recipe } from '$lib/interface/Recipe';
	import LL from '$lib/i18n/i18n-svelte';

	import { Button } from 'flowbite-svelte';

	import { goto } from '$app/navigation';


	function openRecipe(recipeSelect: Recipe) {
		recipeStore.set(recipeSelect);
		goto('/recipe');
	}
</script>

<div class="dark:text-white text-2xl mt-4 font-light text-center">{$LL.recipes.header()}</div>
<div class="stack-container sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-wrap justify-center">
	{#if $recipesStore.length != 0}
		{#each $recipesStore as recipe, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="relative bg-white border-2 border-oraange-400  rounded-lg hover:shadow-md dark:shadow-slate-50/40 shadow-neutral-100 p-4 m-4 mb-4 lg:w-96 transition delay-{(i +
					1) *
					200}"
			>
				<button
					class="absolute top-2 right-2 text-gray-500 hover:text-red-500"
					on:click={() => removeRecipe(recipe.mealname)}
				>
					X
				</button>
				<h2 class="text-lg text-center font-bold mb-2">{recipe.mealname}</h2>
				<p class="text-gray-700 text-center mb-4 font-medium">{recipe.estimated_time}</p>
				<hr class="h-px my-4 mx-8 bg-gray-200 border-0 dark:bg-gray-700/20" />
				<p class="font-thin">{recipe.description}</p>
				<div class="absolute inset-0 z-10" on:click={() => openRecipe(recipe)} />
			</div>
		{/each}
	{:else}
		<div class="flex flex-col items-center">
			<div class="dark:text-white text-2xl mt-10 text-center">
				{$LL.recipes.noRecipes()}
			</div>
			<div class="pt-8 flex justify-center">
				<Button href="/generate" class="btn-generate" gradient color="cyanToBlue" size="xl"
					>{$LL.common.button()}</Button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes fadeInUp {
		0% {
			transform: translateY(16px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.stack-container > div {
		animation: fadeInUp 1s forwards;
	}
</style>
