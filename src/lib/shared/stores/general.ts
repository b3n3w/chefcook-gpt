import { browser } from '$app/environment';
import type { Recipe } from '$lib/interface/Recipe';
import type { Ingredient } from '$lib/interface/Ingredient';

import { writable } from 'svelte/store';

export function fromLocalStorage(storageKey: string, fallbackValue: any) {
    if (browser) {
        const storedValue = window.localStorage.getItem(storageKey)

        if (storedValue !== 'undefined' && storedValue !== null) {
            return (typeof fallbackValue === 'object')
                ? JSON.parse(storedValue)
                : storedValue
        }
    }
    return fallbackValue
}

export function createForStorage(storageKey: string, data: any) {
    if (browser) {
        window.localStorage.setItem(storageKey, data)
    }
}

export function toLocalStorage(store: any, storageKey: string) {
    if (browser) {
        store.subscribe((value: any)  => {
            let storageValue = (typeof value === 'object')
                ? JSON.stringify(value)
                : value

            window.localStorage.setItem(storageKey, storageValue)
        })
    }
}

export function saveRecipe(data: string) {
    if (browser) {
        let obj: Recipe = JSON.parse(data)
        recipesStore.update((currentRecipes) => {
            let newState = [obj, ...currentRecipes]
            return newState
        })
        recipeStore.set(obj);
        toLocalStorage(recipesStore, 'recipes')
    }
}

export function removeRecipe(mealname: string) {
    if (browser) {
        console.log("Removing");
        
        let stored_recipes: Recipe[] = fromLocalStorage('recipes', []).recipes
        const index = stored_recipes.findIndex((recipe) => recipe.mealname === mealname);
        if (index !== -1) {
            stored_recipes.splice(index, 1);
        }
        recipesStore.update(() => {
            return stored_recipes
        })
    }
}

export const apikey = writable(fromLocalStorage('apikey', ''))
export const recipesStore = writable(fromLocalStorage('recipes', []))
export const recipeStore = writable<Recipe>()
export const ingredientsStore = writable<Ingredient[]>()