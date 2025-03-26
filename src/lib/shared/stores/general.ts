import type { Recipe } from '$lib/interface/Recipe';
import type { Ingredient } from '$lib/interface/Ingredient';

import { writable } from 'svelte/store';

export const recipeStore = writable<Recipe>();
export const ingredientsStore = writable<Ingredient[]>();

export const sendNotifitications = writable<Boolean>(false);

export const enableMealie = writable<Boolean>(true)