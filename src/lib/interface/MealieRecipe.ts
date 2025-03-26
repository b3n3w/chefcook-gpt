import type { Ingredient } from './Ingredient';

export interface Instruction  {
    title: string;
    text: string;
}

export interface MealieRecipe {
	name: string;
	totalTime: string;
    prepTime: string;
	description: string;
	recipeIngredients: [];
    recipeInstructions: Instruction[];
    tags: string[];
    settins: {
        public: boolean
    }
}
