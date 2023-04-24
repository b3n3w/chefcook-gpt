import type { Ingredient } from './Ingredient';

export interface Recipe {
	mealname: string;
	slug: string;
	estimated_time: string;
	description: string;
	ingredients: Ingredient[];
	instructions: [];
	type: string;
	lang: string;
}
