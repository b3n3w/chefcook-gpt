<script lang="ts">
	import MdiPasta from '~icons/mdi/pasta';
	import IconParkSolidRice from '~icons/icon-park-solid/rice';
	import LL from '$lib/i18n/i18n-svelte';

	export let pasta = false;
	export let rice = false;

	//refactor code
	function toggleMain(type: string) {
		if (type == 'pasta') {
			pasta = !pasta;
			rice = false;
		} else {
			rice = !rice;
			pasta = false;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex flex-wrap space-x-4 justify-center select-none">
	<div
		class="dark:text-white hover:shadow-sm hover:shadow-orange-200 border-2 w-1/5 sm:w-1/12 h-24 sm:h-32 rounded-xl {pasta
			? 'border-orange-400 border-3'
			: ''}"
		on:click={() => toggleMain('pasta')}
	>
		<div class="grid content-center text-center justify-center">
			<div class="pt-2 pb-1 sm:pt-5 sm:pb-2"><MdiPasta style="font-size:2.5em" /></div>
			<div class="pt-1 sm:pt-2">{$LL.generate.mains.pasta()}</div>
		</div>
	</div>
	<div
		class="dark:text-white hover:shadow-sm hover:shadow-orange-200 border-2 w-1/5 sm:w-1/12 h-24 sm:h-32 rounded-xl {rice
			? 'border-orange-400 border-3'
			: ''}"
		on:click={() => toggleMain('rice')}
	>
		<div class=" grid content-center text-center justify-center">
			<div class="pt-2 pb-1 sm:pt-5 sm:pb-2"><IconParkSolidRice style="font-size:2.5em" /></div>
			<div class="pt-1 sm:pt-2">{$LL.generate.mains.rice()}</div>
		</div>
	</div>
</div>
