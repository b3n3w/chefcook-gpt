import { recipesStore } from '$lib/shared/stores/general';
import { get } from 'svelte/store';
import type { Recipe } from '$lib/interface/Recipe';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	if (params.slug) {
		const recipes = get<Recipe[]>(recipesStore);
		return recipes.find((recipe) => recipe.slug === params.slug);
	}
}) satisfies PageLoad;
