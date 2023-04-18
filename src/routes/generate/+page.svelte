<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { Button } from 'flowbite-svelte';

	import Types from './components/Types.svelte';
	import Mains from './components/Mains.svelte';
	import Ingredients from './components/Ingredients.svelte';

	import { fetchRecipe } from '$lib/openai-api';
	import { apikey, saveRecipe } from '$lib/shared/stores/general';
	import { ingredientsStore } from '$lib/shared/stores/general';
	import { prompts } from '$lib/prompts';

	let veganSelect = false;
	let fishSelect = false;
	let meatSelect = false;
	let veggieSelect = false;

	let pastaSelect = false;
	let riceSelect = false;

	let generating = false;

	let validAPI = true;

	async function generatePromt() {
		generating = true;

		let main = pastaSelect ? 'pasta' : riceSelect ? 'rice' : '';
		let type = meatSelect
			? 'meat'
			: veggieSelect
			? 'veggie'
			: veganSelect
			? 'vegan'
			: fishSelect
			? 'fish'
			: 'without';

		let prompt = prompts.english[type];

		const ingredientNames = $ingredientsStore.map((ingredient) => ingredient.ingredientName);

		prompt = prompt.replace(/-MAIN-/, main);
		prompt = prompt.replace(/-INGREDIENTS-/, ingredientNames.join(', '));

		prompt += prompts.instructions;

		console.log(prompt);
		
		const { status, content } = await fetchRecipe($apikey, prompt);

		if (status == 200) {
			validAPI = true;
		} else {
			validAPI = false;
			return;
		}

		generating = false;
		saveRecipe(content);
		goto('/recipe');
	}
</script>

<div class="stack">
	<div class="flex flex-wrap justify-center mt-5 font-thin dark:text-white">
		<p class="uppercase text-lg sm:text-xl">Select what you love</p>
	</div>
	<Types
		bind:vegan={veganSelect}
		bind:veggie={veggieSelect}
		bind:fish={fishSelect}
		bind:meat={meatSelect}
	/>
	<div class="flex flex-wrap justify-center dark:text-white">
		<p class="uppercase text-lg sm:text-xl font-thin">Select your main</p>
	</div>
	<Mains bind:pasta={pastaSelect} bind:rice={riceSelect} />
	<div class="flex flex-wrap justify-center dark:text-white">
		<p class="uppercase text-lg sm:text-xl font-thin">What do you have at home ?</p>
	</div>
	<Ingredients bind:ingredients={$ingredientsStore} />
	<div class="flex-wrap grid justify-center">
		{#if validAPI}
			{#if generating}
				<div class="font-thin dark:text-white text-sm">This takes around 15 seconds</div>
				<Button disabled gradient color="cyanToBlue" size="lg">
					<div class="flex items-center justify-center">
						<div
							class="border-t-transparent border-solid animate-spin rounded-full border-white border-4"
						/>
						<div class="ml-2">
							Processing... <div />
						</div>
					</div>
				</Button>
			{:else}
				<div in:fly={{ y: 50 }}>
					<Button
						class="btn-generate "
						gradient
						color="cyanToBlue"
						size="lg"
						on:click={() => generatePromt()}>Generate now</Button
					>
				</div>
			{/if}
		{:else}
			<div class="justify-center">
				<div class="font-light text-red-500 text-sm">Api-Key not valid or not set</div>
				<Button class="btn-generate " href="/settings" gradient color="red" size="sm"
					>Open settings</Button
				>
			</div>
		{/if}
	</div>
</div>
