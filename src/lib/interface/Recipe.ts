import type { Ingredient } from "./Ingredient"

export interface Recipe {
    mealname: string,
    estimated_time: string,
    description: string,
    ingredients: Ingredient[]
    instructions: []
    type: string
    lang: string
}