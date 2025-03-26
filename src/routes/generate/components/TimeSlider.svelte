<script lang="ts">
	interface Props {
		time?: number;
	}

	let { time = $bindable(0) }: Props = $props();
</script>

<div class="flex justify-center">
	<div class="flex flex-col space-y-2 p-2 w-80">
		<input
			type="range"
			class="w-full h-2 rounded-lg accent-orange-400 cursor-pointer bg-gray-200"
			min="0"
			max="100"
			bind:value={time}
			step="20"
		/>
		<ul class="flex justify-between w-full">
			<li class="flex justify-center dark:text-white font-thin relative">
				<span class="absolute">0m</span>
			</li>
			<li class="flex justify-center dark:text-white font-thin relative">
				<span class="absolute">20m</span>
			</li>
			<li class="flex justify-center dark:text-white font-thin relative">
				<span class="absolute">40m</span>
			</li>
			<li class="flex justify-center dark:text-white font-thin relative">
				<span class="absolute">60m</span>
			</li>
			<li class="flex justify-center dark:text-white font-thin relative">
				<span class="absolute">80m</span>
			</li>
			<li class="flex justify-center dark:text-white font-thin relative">
				<span class="absolute">more</span>
			</li>
		</ul>
	</div>
</div>
