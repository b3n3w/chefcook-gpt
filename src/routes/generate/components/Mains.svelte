<script lang="ts">
	import MdiPasta from '~icons/mdi/pasta';
	import IconParkSolidRice from '~icons/icon-park-solid/rice';
	import LL from '$lib/i18n/i18n-svelte';

	interface Props {
		pasta?: boolean;
		rice?: boolean;
	}

	let { pasta = $bindable(false), rice = $bindable(false) }: Props = $props();

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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="flex flex-wrap space-x-4 justify-center select-none">
	<button
		class="dark:text-white hover:shadow-sm hover:-translate-y-1 transition-all ease-in-out border-2 w-1/5 sm:w-1/12 h-24 sm:h-32 rounded-xl {pasta
			? 'border-orange-400 border-3'
			: ''}"
		onclick={() => toggleMain('pasta')}
	>
		<div class="grid content-center text-center justify-center">
			<div class="pt-2 pb-1 sm:pt-5 sm:pb-2"><MdiPasta style="font-size:2.5em" /></div>
			<div class="pt-1 sm:pt-2">{$LL.generate.mains.pasta()}</div>
		</div>
	</button>
	<button
		class="dark:text-white hover:shadow-sm hover:-translate-y-1 transition-all ease-in-out border-2 w-1/5 sm:w-1/12 h-24 sm:h-32 rounded-xl {rice
			? 'border-orange-400 border-3 '
			: ''}"
		onclick={() => toggleMain('rice')}
	>
		<div class=" grid content-center text-center justify-center">
			<div class="pt-2 pb-1 sm:pt-5 sm:pb-2"><IconParkSolidRice style="font-size:2.5em" /></div>
			<div class="pt-1 sm:pt-2">{$LL.generate.mains.rice()}</div>
		</div>
	</button>
</div>
