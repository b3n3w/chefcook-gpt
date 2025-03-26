<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

	import Types from './components/Types.svelte';
	import Mains from './components/Mains.svelte';
	import Ingredients from './components/Ingredients.svelte';

	import { enableMealie } from '$lib/shared/stores/general';

	import { prompts } from '$lib/prompts';
	import LL, { locale } from '$lib/i18n/i18n-svelte';
	import { getLanguage } from '$lib/i18n/i18n-strings';
	import TimeSlider from './components/TimeSlider.svelte';
	import { slugify } from '$lib/helpers';
	import { ingredientsState } from '$lib/shared/states.svelte';
	import { saveRecipe } from '$lib/shared/recipe-storage';

	let veganSelect = $state(false);
	let fishSelect = $state(false);
	let meatSelect = $state(false);
	let veggieSelect = $state(false);

	let pastaSelect = $state(false);
	let riceSelect = $state(false);
	let time = $state(60);
	let generating = $state(false);

	let validAPI = $state(true);

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

		const ingredientNames = ingredientsState.map((ingredient) => ingredient.ingredientName);

		languagePrompt = languagePrompt.replace(/-LANG-/, currentLanguage);

		prompt = prompt.replace(/-INGREDIENTS-/, ingredientNames.join(', '));
		prompt = prompt.replace(/-MAIN-/, main);

		prompt += languagePrompt;
		prompt += prompts.instructions.replace(/-TIME-/, time.toString());

		const response = await fetch('/api/generate', {
			method: 'POST',
			body: JSON.stringify({
				prompt: prompt,
				uploadToMealie: $enableMealie
			})
		});

		const recipeContent = await response.json();

		if (response.status == 200) {
			validAPI = true;
		} else {
			validAPI = false;
			return;
		}

		generating = false;
		const recipe = saveRecipe(recipeContent, type, $locale);
		let slug = slugify(recipe?.mealname);

		console.log(slug);
		console.log(recipe);

		goto(`/recipe/${slug}`);
	}
</script>

<div class="stack mb-5">
	<div class="flex flex-wrap justify-center pt-5 sm:pt-10 mb-4 sm:mb-6 font-thin dark:text-white">
		<p class="uppercase text-lg sm:text-xl">{$LL.generate.headers.type()}</p>
	</div>
	<Types vegan={veganSelect} veggie={veggieSelect} fish={fishSelect} meat={meatSelect} />
	<div class="flex flex-wrap justify-center pt-5 sm:pt-10 mb-4 sm:mb-6 dark:text-white">
		<div class="flex flex-col items-center">
			<p class="uppercase text-lg sm:text-xl font-thin">{$LL.generate.headers.main()}</p>
			<div class="flex">
				<p class="text-sm font-thin text-gray-400">Optional</p>
			</div>
		</div>
	</div>
	<Mains pasta={pastaSelect} rice={riceSelect} />
	<div class="flex flex-wrap justify-center pt-5 sm:pt-10 mb-4 sm:mb-4 dark:text-white">
		<p class="uppercase text-lg sm:text-xl font-thin">{$LL.generate.headers.time()}</p>
	</div>
	<TimeSlider {time} />
	<div class="flex flex-wrap justify-center pt-10 sm:pt-10 mb-4 sm:mb-6 dark:text-white">
		<p class="uppercase text-lg sm:text-xl font-thin">{$LL.generate.headers.atHome()}</p>
	</div>
	<Ingredients ingredients={ingredientsState} />

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
						></div>
						<div class="ml-2">
							{$LL.generate.info.processing()}
							<div></div>
						</div>
					</div>
				</button>
			{:else}
				<div in:fly|global={{ y: 50 }}>
					<button
						class="bg-gradient-to-r rounded-xl text-white from-yellow-400 to-orange-500 to-90% px-4 py-2 hover:from-orange-500 hover:to-yellow-400"
						onclick={() => generatePromt()}
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
