<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

	import Types from './components/Types.svelte';
	import Mains from './components/Mains.svelte';
	import Ingredients from './components/Ingredients.svelte';

	import { enableMealie, saveRecipe } from '$lib/shared/stores/general';
	import { ingredientsStore } from '$lib/shared/stores/general';
	import { prompts } from '$lib/prompts';
	import LL, { locale } from '$lib/i18n/i18n-svelte';
	import { getLanguage } from '$lib/i18n/i18n-strings';
	import TimeSlider from './components/TimeSlider.svelte';
	import { slugify } from '$lib/helpers';

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

		const response = await fetch('/generate', {
			method: 'POST',
			body: JSON.stringify({
				prompt: prompt,
				uploadToMealie: $enableMealie
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status !== 200) {
			validAPI = false;
			generating = false;
			return;
		}

		const { recipe } = await response.json();

		const newRecipe = saveRecipe(recipe, type, $locale);
		let slug = slugify(newRecipe?.mealname ?? '');
		goto(`/recipe/${slug}`);

		validAPI = true;
		generating = false;
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
				<div in:fly|global={{ y: 50 }}>
					<button
						class="flex flex-row space-x-2 bg-gradient-to-r rounded-xl text-white from-yellow-400 to-orange-500 to-90% px-4 py-2 hover:from-orange-500 hover:to-yellow-400"
						on:click={() => generatePromt()}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"
							><path
								fill="currentColor"
								d="M10.06 18.701a1.628 1.628 0 0 0 2.43-.676l.77-2.34a3.82 3.82 0 0 1 2.416-2.418l2.238-.727a1.6 1.6 0 0 0 .786-.595a1.62 1.62 0 0 0-.849-2.489l-2.215-.72a3.82 3.82 0 0 1-2.42-2.414l-.727-2.237a1.62 1.62 0 0 0-.594-.785a1.655 1.655 0 0 0-1.879 0a1.63 1.63 0 0 0-.6.8L8.68 6.365a3.82 3.82 0 0 1-2.359 2.37l-2.24.726a1.626 1.626 0 0 0 .02 3.073l2.216.72a3.86 3.86 0 0 1 1.816 1.286c.266.343.471.728.606 1.14l.728 2.234c.112.318.32.593.595.787m-3.273-6.873l-2.22-.72s-.085-.038-.085-.108a.14.14 0 0 1 .084-.115L6.8 10.16a5.34 5.34 0 0 0 3.32-3.375l.721-2.219s.043-.084.114-.084s.113.084.113.084l.723 2.223a5.32 5.32 0 0 0 3.377 3.372l2.27.735a.13.13 0 0 1 .078.11a.15.15 0 0 1-.083.113l-2.225.722a5.32 5.32 0 0 0-3.374 3.374l-.715 2.2a.11.11 0 0 1-.115.093c-.104 0-.118-.075-.118-.075l-.723-2.22a5.32 5.32 0 0 0-3.376-3.385m13.017 12.954A1.2 1.2 0 0 0 20.5 25a1.2 1.2 0 0 0 .692-.216a1.2 1.2 0 0 0 .446-.6l.372-1.143a1.61 1.61 0 0 1 1.017-1.02l1.166-.378A1.21 1.21 0 0 0 25 20.505a1.2 1.2 0 0 0-.844-1.146l-1.144-.37a1.61 1.61 0 0 1-1.02-1.018l-.38-1.163a1.2 1.2 0 0 0-2.274.016l-.374 1.146a1.61 1.61 0 0 1-.993 1.017l-1.166.378a1.21 1.21 0 0 0-.807 1.139a1.2 1.2 0 0 0 .823 1.138l1.144.372a1.6 1.6 0 0 1 1.02 1.023l.379 1.163a1.2 1.2 0 0 0 .44.582m-1.371-4.194l-.27-.088l.283-.096a3.12 3.12 0 0 0 1.943-1.974l.088-.27l.089.272a3.11 3.11 0 0 0 1.974 1.975l.293.1l-.271.087a3.12 3.12 0 0 0-1.974 1.977l-.088.27l-.088-.272a3.12 3.12 0 0 0-1.98-1.98"
							/></svg
						>
						{$LL.common.button()}</button
					>
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
