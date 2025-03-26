import type { Ingredient } from "$lib/interface/Ingredient";
import type { Recipe } from "$lib/interface/Recipe";

export let recipesState = $state<{ recipies: Recipe[] }>({ recipies: [] });

export let ingredientsState = $state<Ingredient[]>([])
export let languageState = $state({ lang: "de" });

