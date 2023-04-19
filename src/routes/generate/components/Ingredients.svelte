<script lang="ts">
	import type { Ingredient } from '$lib/interface/Ingredient';
	import { fade, fly } from 'svelte/transition';
	import Recommendation from './Recommendation.svelte';

	export let ingredients: Ingredient[] = [];
	let recommendations: string[] = ['Onion', 'Cheese', 'Tofu', 'Zucchini', 'Paprika'];

	let dynamicList: string[] = [];
	let next: string = '';
	let did_remove = true;

	const addFromInput = () => {
		if (next) ingredients = [...ingredients, { ingredientName: next, count: 0 }];
		next = '';
		dynamicList = [];
	};

	const remove = (i: number) => {
		ingredients = [...ingredients.slice(0, i), ...ingredients.slice(i + 1)];
		did_remove = true;
	};

	function addFromReccomendation(ingredient: string, index: number) {
		ingredients = [...ingredients, { ingredientName: ingredient, count: 0 }];
		recommendations = [...recommendations.slice(0, index), ...recommendations.slice(index + 1)];
	}

	function addFromList(ingredient: string) {
		ingredients = [...ingredients, { ingredientName: ingredient, count: 0 }];
		dynamicList = [];
		next = '';
	}

	async function fetchIng(event: any) {
		// Check if key is backspace
		if (event.inputType == 'deleteContentBackward') {
			if (next === '' || next.length < 3) dynamicList = [];
		} else {
			try {
				let response = await fetch(`/api/ingredients?input=${next}`);
				dynamicList = await response.json();
			} catch (error) {
				// Handle the error here if needed
			}
		}
	}

	function handleClickOutside(event) {
		const list = document.querySelector('ul');
		if (list && !list.contains(event.target)) {
			dynamicList = [];
		}
	}

	window.addEventListener('click', handleClickOutside);
</script>

<div class="w-1/2 mx-auto flex item-center justify-center flex-col">
	<div class="flex justify-center sm:px-40 mt-4 flex-grow">
		{#each recommendations as ingredient, i}
			<div in:fly={{ y: -15, delay: (i + 1) * 25 }}>
				<Recommendation
					bind:ingredient
					on:addChip={() => {
						addFromReccomendation(ingredient, i);
					}}
				/>
			</div>
		{/each}
	</div>
	<hr class="flex h-px mt-2 mb-4 sm:mx-40 border-0 dark:bg-white bg-gray-700/20" />
</div>

<div class="flex-wrap justify-center content-center grid mb-8 dark:text-white">
	<div class="flex flex-wrap justify-center">
		<form on:submit|preventDefault={addFromInput}>
			<input
				bind:value={next}
				on:input={(event) => {
					fetchIng(event);
				}}
				class="border justify-center border-gray-200 dark:text-white dark:bg-slate-800 text-sm focus:ring-orange-400 focus:border-orange-400 rounded-xl"
				type="text"
				placeholder="Enter to add"
			/>
			{#if dynamicList.length > 0}
				<ul class="absolute z-50 pt-2 rounded-xl">
					{#each dynamicList as ingredient, i}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							in:fly={{ y: 10, delay: (i + 1) * 60 }}
							class="text-slate-700 py-2 px-4 w-full cursor-pointer bg-white hover:bg-orange-400/90 rounded-xl hover:text-white pt-0.5"
							on:click={addFromList(ingredient)}
							style="width: 100%; text-align: center;"
						>
							{@html ingredient}
						</li>
					{/each}
				</ul>
			{/if}
		</form>
	</div>
	<div class="justify-center" style="position: relative;">
		{#each ingredients as ingredient, i (ingredient)}
			<div
				class="flex mt-3 h-8 sm:h-11 w-full justify-centerbg-slate-300/30 rounded-xl dark:text-white dark:border-white"
			>
				<div
					class="flex items-center justify-center w-8 sm:w-12 h-8 sm:h-11 dark:bg-gray-200/20 text-gray-700 font-semibold rounded-xl mr-5 sm:mr-3"
				>
					{i + 1}
				</div>
				<div class="flex-1 py-1" style="display: flex; align-items: center;">
					<div class="font-bold">{ingredient.ingredientName}</div>
				</div>
				<button class="flex-shrink-0 p-1 pr-2" on:click={() => remove(i)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 dark:text-white text-gray-700 hover:text-red-400"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		{/each}
		{#if ingredients.length === 0 && did_remove}
			<div class="text-center" in:fade={{ delay: 600 }}>
				<p class="mt-3">No ingredients added</p>
			</div>
		{/if}
	</div>
</div>
