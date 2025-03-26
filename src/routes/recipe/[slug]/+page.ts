import { get } from 'svelte/store';
import type { Recipe } from '$lib/interface/Recipe';
import type { PageLoad } from './$types';
import { slugify } from '$lib/helpers';
import { recipesState } from '$lib/shared/states.svelte';

export const load = (async ({ params }) => {
	if (params.slug) {
		const recipes = recipesState.recipies
		return recipes.find((recipe) => slugify(recipe.mealname) == params.slug);
	}
}) satisfies PageLoad;
