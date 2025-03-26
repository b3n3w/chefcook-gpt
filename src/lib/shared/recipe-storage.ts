import type { Recipe } from "$lib/interface/Recipe";
import { browser } from '$app/environment';
import { fromLocalStorage, toLocalStorage } from "./localstorage";
import { recipesState } from "./states.svelte";

export function saveRecipe(data: any, type: string, lang: string) {
    if (browser) {
        const recipe: Recipe = data
        recipe.lang = lang;
        recipe.type = type;
        recipesState.recipies = [recipe, ...recipesState.recipies];
        toLocalStorage(recipesState, 'recipes');
        return recipe;
    }
}

export function updateRecipe(updatedRecipe: Recipe) {
    if (browser) {
        recipesState.recipies = recipesState.recipies.map((recipe) => {
            if (recipe.mealname === updatedRecipe.mealname) {
                return updatedRecipe;
            }
            return recipe;
        })
        toLocalStorage(recipesState.recipies, 'recipes')
    }
}

export function removeRecipe(mealname: string) {
    if (browser) {
        const stored_recipes: Recipe[] = fromLocalStorage('recipes', []);

        const index = stored_recipes.findIndex((recipe) => recipe.mealname === mealname);
        if (index !== -1) {
            stored_recipes.splice(index, 1);
        }
        recipesState.recipies = stored_recipes
        toLocalStorage(recipesState, 'recipes');
    }
}
