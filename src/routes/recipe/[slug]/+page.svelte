<script lang="ts">
	import { goto } from '$app/navigation';
	import LL, { locale } from '$lib/i18n/i18n-svelte';
	import type { Recipe } from '$lib/interface/Recipe';
	import { updateRecipe } from '$lib/shared/stores/general';

	import Ingredient from './Ingredient.svelte';
	import { fly } from 'svelte/transition';

	export let data;

	let availableInMealie = false;

	function isCurrentLanguage() {
		return data.lang === $locale;
	}

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
		data = recipe;
	}
	async function uploadRecipe() {
		const res = await fetch('/api/mealie', {
			method: 'POST',
			body: JSON.stringify({ recipe: data })
		});
		if (res.status === 200) {
			const uploadData = await res.json();

			const recipe = data;
			recipe.mealieUrl = uploadData.mealieUrl;

			updateRecipe(recipe);
			availableInMealie = true;
		}
	}
</script>

<div class="flex justify-center mt-5" in:fly|global={{ y: 100 }}>
	<div
		class="bg-white/90 shadow-lg rounded-lg ml-4 mr-4 mb-20 w-full md:w-3/4 lg:w-2/3 justify-center text-center relative"
	>
		<button
			aria-label="Close"
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
		{#if !data.mealieUrl}
			<button class="text-lg font-semibold pt-2" on:click={uploadRecipe}>
				{$LL.recipe.upload()}
			</button>
		{:else}
			<div class="flex items-center justify-center">
				<button
					class="flex items-center justify-center text-gray-800 font-bold py-2 my-4 rounded"
					on:click={() => goto(data.mealieUrl)}
				>
					<svg
						class="w-6 h-6 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.36,10.22L13.16,10C12.38,9.23 12.38,7.97 13.16,7.19L17.5,2.82L18.43,3.74L15.19,7L16.15,7.94L19.39,4.69L20.31,5.61L17.06,8.85L18,9.81L21.26,6.56L22.18,7.5L17.81,11.84C17.03,12.62 15.77,12.62 15,11.84L14.78,11.64L13.41,13Z"
						/>
					</svg>
					{$LL.recipe.openMealieUrl()}
				</button>
			</div>
		{/if}

		<div class="text-xl sm:text-2xl font-semibold mt-5 mb-5">
			{data.mealname}
		</div>
		<div class="text-xl text-semibold text-slate-500 mt-5 mb-5">
			{data.estimated_time}
		</div>
		<div class="text-lg text-semibold text-slate-800 m-5">
			{data.description}
		</div>
		<hr class="h-px my-4 mx-8 bg-gray-200 border-0 dark:bg-gray-700/60" />
		<div class="mt-2 mx-5 my-5">
			<div class="text-center font-medium sm:font-bold uppercase">
				{$LL.recipe.ingredients()}
			</div>
			<div class="justify-center text-center">
				{#if data.ingredients}
					{#each data.ingredients as ingredient}
						<Ingredient bind:ingredient />
					{:else}
						<div>Loading</div>
					{/each}
				{/if}
			</div>
		</div>

		<hr class="h-px my-4 mx-8 bg-gray-200 border-0 dark:bg-gray-700/60" />
		<div class="mt-2 mx-9 my-5">
			<div class="text-center font-medium sm:font-bold uppercase">
				{$LL.recipe.instructions()}
			</div>
			<ul>
				{#if data.instructions}
					{#each Object.entries(data.instructions) as [step, instruction]}
						<li>
							<div class="flex text-left mb-3 mt-2 items-center">
								<div class="mr-3 font-semibold">{step}</div>
								<div>
									{instruction[Object.keys(instruction)[0]]}
								</div>
							</div>
						</li>
					{:else}
						<div>Loading</div>
					{/each}
				{/if}
			</ul>
		</div>
	</div>
</div>
