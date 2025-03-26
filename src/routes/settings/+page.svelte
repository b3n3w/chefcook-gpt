<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';
	import { enableMealie } from '$lib/shared/stores/general';
	import ThemeSwitch from './ThemeSwitch.svelte';
	import { PUBLIC_GPT_MODEL } from '$env/static/public';
</script>

<div class="flex flex-col items-center mt-8">
	<h1 class="flex flex-col text-center dark:text-white font-extralight uppercase">
		<div class="opacity-50">
			{$LL.settings.model.header()}
		</div>
		<div class="text-xl font-light opacity-70">
			{PUBLIC_GPT_MODEL}
		</div>
	</h1>

	<h2 class="mt-8 mb-2 text-lg font-semibold dark:text-white">
		{$LL.settings.darkmode.header()}
	</h2>
	<ThemeSwitch />
</div>

<div class="flex flex-col items-center mt-8">
	<h2 class="mt-8 mb-2 text-lg font-semibold dark:text-white">
		{$LL.settings.mealieUpload.header()}
	</h2>
	<label class="relative inline-flex items-center cursor-pointer">
		<input type="checkbox" value="" class="sr-only peer" bind:checked={$enableMealie} />
		<div
			class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-300 peer-checked:bg-orange-300"
		></div>
	</label>
</div>
