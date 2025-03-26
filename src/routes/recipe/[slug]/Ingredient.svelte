<script lang="ts">
	import type { Ingredient } from '$lib/interface/Ingredient';
	export let ingredient: Ingredient;
</script>

<div class="flex justify-center flex-row rounded-lg border-sky-200 sm:m-2 p-1">
	<div class="flex w-full text-center">
		<div class=" mr-2 ml-3 font-semibold">{ingredient.quantity}</div>
		<div class=" text-bold">{ingredient.ingredientName}</div>
	</div>
</div>
