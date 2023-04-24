<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

	import Types from './components/Types.svelte';
	import Mains from './components/Mains.svelte';
	import Ingredients from './components/Ingredients.svelte';

	import { fetchRecipe } from '$lib/openai-api';
	import { apikey, saveRecipe } from '$lib/shared/stores/general';
	import { ingredientsStore } from '$lib/shared/stores/general';
	import { prompts } from '$lib/prompts';
	import LL, { locale } from '$lib/i18n/i18n-svelte';
	import { getLanguage } from '$lib/i18n/i18n-strings';
	import TimeSlider from './components/TimeSlider.svelte';

	let veganSelect = false;
	let fishSelect = false;
	let meatSelect = false;
	let veggieSelect = false;

	let pastaSelect = false;
	let riceSelect = false;

	let time = 60;

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

		let currentLanguage = getLanguage($locale);
		let languagePrompt = prompts.language;
		const ingredientNames = $ingredientsStore.map((ingredient) => ingredient.ingredientName);

		languagePrompt = languagePrompt.replace(/-LANG-/, currentLanguage);

		prompt = prompt.replace(/-INGREDIENTS-/, ingredientNames.join(', '));
		prompt = prompt.replace(/-MAIN-/, main);

		prompt += languagePrompt;
		prompt += prompts.instructions.replace(/-TIME-/, time.toString());

		const { status, content } = await fetchRecipe($apikey, prompt);

		if (status == 200) {
			validAPI = true;
		} else {
			validAPI = false;
			return;
		}

		generating = false;
		saveRecipe(content, type, $locale);
		goto('/recipe');
	}
</script>

<div class="stack mb-5">
	<div class="flex flex-wrap justify-center pt-5 sm:pt-10 mb-4 sm:mb-6 font-thin dark:text-white">
		<p class="uppercase text-lg sm:text-xl">{$LL.generate.headers.type()}</p>
	</div>
	<Types
		bind:vegan={veganSelect}
		bind:veggie={veggieSelect}
		bind:fish={fishSelect}
		bind:meat={meatSelect}
	/>
	<div class="flex flex-wrap justify-center pt-5 sm:pt-10 mb-4 sm:mb-6 dark:text-white">
		<div class="flex flex-col items-center">
			<p class="uppercase text-lg sm:text-xl font-thin">{$LL.generate.headers.main()}</p>
			<div class="flex">
				<p class="text-sm font-thin text-gray-400">Optional</p>
			</div>
		</div>
	</div>
	<Mains bind:pasta={pastaSelect} bind:rice={riceSelect} />
	<div class="flex flex-wrap justify-center pt-5 sm:pt-10 mb-4 sm:mb-4 dark:text-white">
		<p class="uppercase text-lg sm:text-xl font-thin">{$LL.generate.headers.time()}</p>
	</div>
	<TimeSlider bind:time />
	<div class="flex flex-wrap justify-center pt-10 sm:pt-10 mb-4 sm:mb-6 dark:text-white">
		<p class="uppercase text-lg sm:text-xl font-thin">{$LL.generate.headers.atHome()}</p>
	</div>
	<Ingredients bind:ingredients={$ingredientsStore} />
	<div class="flex-wrap grid justify-center">
		{#if validAPI}
			{#if generating}
				<div class="font-thin dark:text-white text-sm">{$LL.generate.info.time()}</div>
				<button
					class="bg-gradient-to-r rounded-xl text-white from-yellow-400 to-orange-500 to-90% px-4 py-2"
				>
					<div class="flex items-center justify-center">
						<div
							class="border-t-transparent border-solid animate-spin rounded-full border-white border-4"
						/>
						<div class="ml-2">
							{$LL.generate.info.processing()}
							<div />
						</div>
					</div>
				</button>
			{:else}
				<div in:fly={{ y: 50 }}>
					<button
						class="bg-gradient-to-r rounded-xl text-white from-yellow-400 to-orange-500 to-90% px-4 py-2 hover:from-orange-500 hover:to-yellow-400"
						on:click={() => generatePromt()}
						>{$LL.common.button()}
					</button>
				</div>
			{/if}
		{:else}
		<div class="font-light text-red-500 text-sm">{$LL.generate.info.invalidKey()}</div>
			<a href="/settings">
				<button
					class="bg-gradient-to-r rounded-xl text-white from-orange-500 to-red-700 to-90% px-4 py-2"
				>
					{$LL.generate.buttons.settings()}
				</button>
			</a>
		{/if}
	</div>
</div>
