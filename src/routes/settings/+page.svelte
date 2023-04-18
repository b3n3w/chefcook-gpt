<script lang="ts">
	import { validateApiKey } from '$lib/api';
	import { apikey, toLocalStorage } from '$lib/shared/stores/general';
	import { onMount } from 'svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let validKey: boolean;
	let hasApiKey: boolean = false;

	onMount(() => {
		if ($apikey) {
			hasApiKey = true;
		}
	});

	async function setApiKey() {
		let response = await validateApiKey($apikey);
		if (response == 200) {
			validKey = true;
			toLocalStorage(apikey, 'apikey');
		} else {
			hasApiKey = false;
			validKey = false;
		}
	}
</script>

<div class="flex flex-col items-center mt-8">
	<h2 class="mt-8 mb-2 text-lg font-semibold dark:text-white">Darkmode</h2>

	<ThemeSwitch />
	<div class="m-4" />
	<h2 class="mt-4 mb-2 text-lg font-semibold dark:text-white">API Key</h2>
	<p class="dark:text-white text-sm mr-5 ml-5 text-center">
		If you don't have an API Key yet. Please register at <a
			class="text-bold"
			href="https://platform.openai.com/overview">OpenAI API</a
		>
	</p>
	<div class="flex justify-between items-center w-full max-w-sm mt-4">
		{#if hasApiKey}
			<input
				class="border justify-center border-green-500 dark:text-white dark:bg-slate-800 text-sm focus:ring-orange-400 focus:border-orange-400 rounded-xl w-full h-10"
				type="password"
				placeholder="Api Key"
				bind:value={$apikey}
			/>
			<button
				class="ml-2 px-4 py-2 border border-green-500 dark:border-0 rounded-xl bg-slate-400/50 transition ease-in-out text-gray-700 dark:text-white font-medium h-10"
				type="button"
				on:click={() => setApiKey()}
			>
				Save
			</button>
		{:else}
			<input
				class="border justify-center border-gray-200 dark:text-white dark:bg-slate-800 text-sm focus:ring-orange-400 focus:border-orange-400 rounded-xl w-full h-10 {!validKey
					? 'border-red-500'
					: ''}"
				type="password"
				placeholder={validKey ? 'Add API KEY' : 'No or invalid api-key!'}
				bind:value={$apikey}
			/>
			<button
				class="ml-2 px-4 py-2 border-green-500 border dark:border-0 rounded-xl bg-slate-400/60 text-gray-700 dark:text-white font-medium h-10 {!validKey
					? 'bg-red-400'
					: ''}"
				type="button"
				on:click={() => setApiKey()}
			>
				Save
			</button>
		{/if}
	</div>
	{#if validKey}
		<div class="text-green-400 text-center text-light">Api-Key is valid! Lets cook</div>
	{/if}
</div>
