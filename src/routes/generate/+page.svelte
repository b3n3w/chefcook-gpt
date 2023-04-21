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
	import LL, { locale } from '$lib/i18n/i18n-svelte';
	import { getLanguage } from '$lib/i18n/i18n-strings';

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

		let prompt = prompts.type[type];
		
		let currentLanguage = getLanguage($locale)
		let languagePrompt = prompts.language;
		const ingredientNames = $ingredientsStore.map((ingredient) => ingredient.ingredientName);

		languagePrompt = languagePrompt.replace(/-LANG-/, currentLanguage);
		prompt = prompt.replace(/-INGREDIENTS-/, ingredientNames.join(', '));
		prompt = prompt.replace(/-MAIN-/, main);

		prompt += languagePrompt;
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
		<p class="uppercase text-lg sm:text-xl">{$LL.generate.headers.type()}</p>
	</div>
	<Types
		bind:vegan={veganSelect}
		bind:veggie={veggieSelect}
		bind:fish={fishSelect}
		bind:meat={meatSelect}
	/>
	<div class="flex flex-wrap justify-center dark:text-white">
		<p class="uppercase text-lg sm:text-xl font-thin">{$LL.generate.headers.main()}</p>
	</div>
	<Mains bind:pasta={pastaSelect} bind:rice={riceSelect} />
	<div class="flex flex-wrap justify-center dark:text-white">
		<p class="uppercase text-lg sm:text-xl font-thin">{$LL.generate.headers.atHome()}</p>
	</div>
	<Ingredients bind:ingredients={$ingredientsStore} />
	<div class="flex-wrap grid justify-center">
		{#if validAPI}
			{#if generating}
				<div class="font-thin dark:text-white text-sm">{$LL.generate.info.time()}</div>
				<Button disabled gradient color="cyanToBlue" size="lg">
					<div class="flex items-center justify-center">
						<div
							class="border-t-transparent border-solid animate-spin rounded-full border-white border-4"
						/>
						<div class="ml-2">
							{$LL.generate.info.processing()} <div />
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
						on:click={() => generatePromt()}>{$LL.common.button()}</Button
					>
				</div>
			{/if}
		{:else}
			<div class="justify-center">
				<div class="font-light text-red-500 text-sm">{$LL.generate.info.invalidKey()}</div>
				<Button class="btn-generate " href="/settings" gradient color="red" size="sm"
					>{$LL.generate.buttons.settings()}</Button
				>
			</div>
		{/if}
	</div>
</div>
