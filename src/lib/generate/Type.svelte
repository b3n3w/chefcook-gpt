<script lang="ts">
	import IconMeat from '~icons/mdi/meat';
	import IconFish from '~icons/mdi/fish';
	import LucideVegan from '~icons/lucide/vegan';
	import ElLeaf from '~icons/el/leaf';

	export let select = false;
</script>

a
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="shadow-sm w-16 h-24 sm:w-32 sm:h-24 rounded-xl hover:shadow-sm hover:shadow-purple-200 border-2 {select
		? 'border-orange-400 border-3'
		: ''}"
	on:click={() => (select = !select)}
>
	<div class="grid content-center dark:text-white text-center justify-center">
		<div class="flex justify-center pt-3 pb-3 sm:pb-2">
			<IconMeat class="text-2xl sm:text-3xl md:text-4xl" />
		</div>
		<div class="pb-2 text-lg">Meat</div>
	</div>
</div>
