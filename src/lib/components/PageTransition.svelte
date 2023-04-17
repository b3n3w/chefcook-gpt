<script lang="ts">
	import {fly } from 'svelte/transition';
	export let pathname: string = '';
</script>

{#key pathname}
	<div
     in:fly={{ x: -10, duration: 300, delay: 200 }} out:fly={{ x: 5, duration: 300 }}>
		<slot />
	</div>
{/key}