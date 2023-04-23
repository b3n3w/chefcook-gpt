import type { RequestHandler } from '@sveltejs/kit';
import { RAPID_API_KEY } from '$env/static/private';
import { ingredients } from './ingredients';


async function fetchExternalIngredients(input: string) {

    const endpoint = `https://edamam-food-and-grocery-database.p.rapidapi.com/auto-complete?q=${input}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
    };
    const response = await fetch(endpoint, options)
    const ingredients = await response.json().catch((err) => {
        return new Response(JSON.stringify({ error: err }), {
            status: 400,
        });
    });
    return new Response(JSON.stringify(ingredients.slice(0, 5)), { status: 200 })
}

export const GET: RequestHandler = async ({ url }) => {

    const language = url.searchParams.get('lang')?.toLowerCase() || '';

    const langIngredients = ingredients[language] || ingredients['en'];

    const inputText = url.searchParams.get('input')?.toLowerCase() || '';
    const inputWords = inputText.split(' ');

    const filteredIngredients = langIngredients
        .filter(ingredient =>
            inputWords.every(word =>
                ingredient.toLowerCase().includes(word))
        )
        .sort((a: string, b: string) => {
            const aIndex = a.toLowerCase().indexOf(inputText);
            const bIndex = b.toLowerCase().indexOf(inputText);

            if (aIndex === bIndex) {
                return a.length - b.length;
            }
            return aIndex - bIndex;
        });

    return new Response(
        JSON.stringify(filteredIngredients.slice(0, 5)),
        { status: 200 }
    );
};