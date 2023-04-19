<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div in:fade={{ delay: 50 }} class="flex justify-center space-x-4 flex-wrap h-screen place-items-center">
	<div on:click={() => goto('/generate/hearty')} class="w-1/4 h-1/4 border-2 rounded-lg bg-slate-500">
		<div class="flex justify-center">
			<div>Hearty</div>
		</div>
	</div>
	<div on:click={() => goto('/generate/sweet')} class="w-1/4 h-1/4 border-2 rounded-lg bg-slate-500">
		<div class="flex justify-center">
			<div>Sweet</div>
		</div>
	</div>
</div>
