<script lang="ts">
	import { validateApiKey } from '$lib/openai-api';
	import LL from '$lib/i18n/i18n-svelte';
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
	<h2 class="mt-8 mb-2 text-lg font-semibold dark:text-white">{$LL.settings.darkmode.header()}</h2>

	<ThemeSwitch />
	<div class="m-4" />
	<h2 class="mt-4 mb-2 text-lg font-semibold dark:text-white">API Key</h2>
	<p class="dark:text-white text-sm mr-5 ml-5 text-center">
		{$LL.settings.apiKey.info()} <a
			class="font-bold underline"
			href="https://platform.openai.com/overview"> OpenAI Platform</a
		>
	</p>
	<div class="flex justify-between items-center w-full px-5 max-w-sm mt-4">
		{#if hasApiKey}
			<input
				class="border justify-center border-green-500 dark:text-white dark:bg-slate-800 text-sm focus:ring-orange-400 focus:border-orange-400 rounded-xl w-full h-10"
				type="password"
				placeholder="Api Key"
				bind:value={$apikey}
			/>
			<button
				class="ml-2 px-4 py-2 border dark:border-0 rounded-xl bg-slate-400/50 transition ease-in-out text-gray-700 dark:text-white font-medium h-10"
				type="button"
				on:click={() => setApiKey()}
			>
				Save
			</button>
		{:else}
			<input
				class="border justify-center border-gray-200 dark:text-white dark:bg-slate-800 text-sm focus:ring-orange-400 focus:border-orange-400 rounded-xl w-full h-10 {!validKey
					? 'border-red-400'
					: ''}"
				type="password"
				placeholder={validKey ? 'Add API KEY' : $LL.settings.apiKey.invalid()}
				bind:value={$apikey}
			/>
			<button
				class="ml-2 px-4 py-2  border dark:border-0 rounded-xl bg-slate-400/60 text-gray-700 dark:text-white font-medium h-10 {!validKey
					? 'bg-red-400'
					: ''}"
				type="button"
				on:click={() => setApiKey()}
			>
			{$LL.settings.apiKey.button.save()}
			</button>
		{/if}
	</div>
	{#if validKey}
		<div class="text-green-400 text-center text-light">{$LL.settings.apiKey.valid()}</div>
	{/if}
</div>
