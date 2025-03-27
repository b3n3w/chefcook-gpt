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
	<button
		class="dark:text-white hover:-translate-y-1 transition-all duration-100 ease-linear border-2 w-1/6 md:w-1/12 h-32 rounded-xl {pasta
			? 'border-orange-400 border-3'
			: ''}"
		on:click={() => toggleMain('pasta')}
	>
		<div class="grid content-center text-center justify-center">
			<div class="pt-2 pb-1 sm:pt-5 sm:pb-2">
				<MdiPasta class=" text-3xl md:text-4xl {pasta ? 'text-orange-300' : 'text-2xl '}" />
			</div>
			<div class="pt-1 sm:pt-2">{$LL.generate.mains.pasta()}</div>
		</div>
	</button>
	<button
		class="dark:text-white hover:-translate-y-1 transition-all duration-100 ease-linear border-2 w-1/6 md:w-1/12 h-32 rounded-xl {rice
			? 'border-orange-400 border-3'
			: ''}"
		on:click={() => toggleMain('rice')}
	>
		<div class=" grid content-center text-center justify-center">
			<div class="pt-2 pb-1 sm:pt-5 sm:pb-2">
				<IconParkSolidRice class=" text-3xl md:text-4xl {rice ? 'text-orange-300' : 'text-2xl '}" />
			</div>
			<div class="pt-1 sm:pt-2">{$LL.generate.mains.rice()}</div>
		</div>
	</button>
</div>
