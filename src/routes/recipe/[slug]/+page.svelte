<script lang="ts">
	import { goto } from '$app/navigation';
	import LL, { locale } from '$lib/i18n/i18n-svelte';
	import type { Recipe } from '$lib/interface/Recipe';

	import Ingredient from './Ingredient.svelte';
	import { fly } from 'svelte/transition';

	async function translateRecipe() {
		const res = await fetch('/api/translate', {
			method: 'POST',
			body: JSON.stringify({
				transData: data,
				language: $locale
			})
		});

		let translatedRecipe: Recipe = await res.json();
		let recipe: Recipe = translatedRecipe;
		data = recipe
	}
	export let data;

	function isCurrentLanguage() {
		return data.lang === $locale;
	}
</script>

<div class="flex justify-center mt-5" in:fly={{ y: 100 }}>
	<div
		class="bg-white/90 shadow-lg rounded-lg w-full ml-4 mr-4 mb-20 sm:ml-10 sm:mr-10 sm:w-1/2 justify-center text-center relative"
	>
		<button
			class="close-btn absolute top-0 right-0 m-4 focus:outline-none"
			on:click={() => goto('/recipes')}
		>
			<svg
				class="h-6 w-6 text-gray-500 dark:text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M13.535,6.465c0.391-0.391,0.391-1.023,0-1.414c-0.391-0.391-1.023-0.391-1.414,0L10,8.586L7.879,6.465c-0.391-0.391-1.023-0.391-1.414,0c-0.391,0.391-0.391,1.023,0,1.414L8.586,10l-2.121,2.121c-0.391,0.391-0.391,1.023,0,1.414c0.391,0.391,1.023,0.391,1.414,0L10,11.414l2.121,2.121c0.391,0.391,1.023,0.391,1.414,0c0.391-0.391,0.391-1.023,0-1.414L11.414,10L13.535,7.879C13.926,7.488,13.926,6.855,13.535,6.465z"
				/>
			</svg>
		</button>

		{#if !isCurrentLanguage()}
			<button class="text-lg font-semibold pt-2" on:click={translateRecipe}>
				{$LL.recipe.translate()}
			</button>
		{/if}
		<div class="text-xl sm:text-2xl font-semibold mt-5 mb-5">{data.mealname}</div>
		<div class="text-xl text-semibold text-slate-500 mt-5 mb-5">{data.estimated_time}</div>
		<div class="text-lg text-semibold text-slate-800 m-5">{data.description}</div>
		<hr class="h-px my-4 mx-8 bg-gray-200 border-0 dark:bg-gray-700/60" />
		<div class="mt-2 mx-5 my-5">
			<div class="text-center font-medium sm:font-bold uppercase">{$LL.recipe.ingredients()}</div>
			<div class="justify-center text-center">
				{#each data.ingredients as ingredient}
					<Ingredient bind:ingredient />
				{/each}
			</div>
		</div>

		<hr class="h-px my-4 mx-8 bg-gray-200 border-0 dark:bg-gray-700/60" />
		<div class="mt-2 mx-9 my-5">
			<div class="text-center font-medium sm:font-bold uppercase">{$LL.recipe.instructions()}</div>
			<ul>
				{#each Object.entries(data.instructions) as [step, instruction]}
					<li>
						<div class="flex text-left mb-3 mt-2 items-center">
							<div class="mr-3 font-semibold">{step}</div>
							<div>{instruction[Object.keys(instruction)[0]]}</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
