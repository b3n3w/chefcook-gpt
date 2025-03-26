import { MEALIE_API_TOKEN, MEALIE_URL } from "$env/static/private";
import type { Instruction } from "$lib/interface/MealieRecipe"
import type { Recipe } from "$lib/interface/Recipe"

async function getParsedIngredients(ingredients: []) {
    try {
        const rawIngredients = ingredients.map(ingredient => `${ingredient.quantity} ${ingredient.ingredientName}`);

        const response = await fetch(`${MEALIE_URL}/api/parser/ingredients`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${MEALIE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "parser": "nlp",
                "ingredients": rawIngredients
            })
        });

        if (response.ok) {
            let data = await response.json();

            const parsedIngredients = data.map(item => {
                item.ingredient.unit = null;
                item.ingredient.food = null;
                item.ingredient.note = item.ingredient.display
                return item.ingredient;
            });
            return parsedIngredients;
        }
    } catch (error) {
        console.error("An error occurred during ingredient parsing:", error);
    }
}

export const addRecipeToMealie = async (recipe: Recipe) => {
    try {
        console.log("Adding recipe to Mealie:", recipe.mealname);

        let instructions: Instruction[];

        instructions = recipe.instructions.map(instruction => {
            const text = Object.values(instruction)[0];
            return {
                title: "",
                text: text,
                ingredientReferences: []
            };
        });

        const response = await fetch(`${MEALIE_URL}/api/recipes`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${MEALIE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: recipe.mealname })
        });

        if (response.ok) {
            let recipeSlug = await response.json();

            const parsedIngredients = await getParsedIngredients(recipe.ingredients)

            const recipeData = {
                name: recipe.mealname,
                prepTime: recipe.estimated_time,
                totalTime: recipe.estimated_time,
                description: recipe.description,
                recipeInstructions: instructions,
                recipeIngredient: parsedIngredients
            }

            const updateResponse = await fetch(`${MEALIE_URL}/api/recipes/${recipeSlug}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${MEALIE_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipeData)
            });

            if (updateResponse.ok) {
                return await updateResponse.json();
            }
        } else {
            console.log(`Something went wrong while adding recipe. Server code: ${response.status}`);
        }
    } catch (error) {
        console.error("An error occurred during recipe addition:", error);
    }
}
