import { browser } from '$app/environment';
import type { Recipe } from '$lib/interface/Recipe';
import type { Ingredient } from '$lib/interface/Ingredient';

import { writable } from 'svelte/store';

export function fromLocalStorage(storageKey: string, fallbackValue: any) {
	if (browser) {
		const storedValue = window.localStorage.getItem(storageKey);

		if (storedValue !== 'undefined' && storedValue !== null) {
			return typeof fallbackValue === 'object' ? JSON.parse(storedValue) : storedValue;
		}
	}
	return fallbackValue;
}

export function createForStorage(storageKey: string, data: any) {
	if (browser) {
		window.localStorage.setItem(storageKey, data);
	}
}

export function toLocalStorage(store: any, storageKey: string) {
	if (browser) {
		store.subscribe((value: any) => {
			const storageValue = typeof value === 'object' ? JSON.stringify(value) : value;

			window.localStorage.setItem(storageKey, storageValue);
		});
	}
}

export function saveRecipe(data: string, type: string, lang: string) {
	if (browser) {
		const recipe: Recipe = JSON.parse(data);
		recipe.lang = lang;
		recipe.type = type;
		recipesStore.update((currentRecipes) => {
			let newState = [recipe, ...currentRecipes];
			return newState;
		});
		recipeStore.set(recipe);
		toLocalStorage(recipesStore, 'recipes');
		return recipe;
	}
}

export function removeRecipe(mealname: string) {
	if (browser) {
		let stored_recipes: Recipe[] = fromLocalStorage('recipes', []);

		const index = stored_recipes.findIndex((recipe) => recipe.mealname === mealname);
		if (index !== -1) {
			stored_recipes.splice(index, 1);
		}
		recipesStore.set(stored_recipes);
		toLocalStorage(recipesStore, 'recipes');
	}
}

export const apikey = writable(fromLocalStorage('apikey', ''));
export const recipesStore = writable(fromLocalStorage('recipes', []));
export const recipeStore = writable<Recipe>();
export const ingredientsStore = writable<Ingredient[]>();
export const languageStore = writable(fromLocalStorage('lang', ''));
