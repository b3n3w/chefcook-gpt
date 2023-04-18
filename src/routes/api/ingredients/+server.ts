import type { RequestHandler } from '@sveltejs/kit'
import { RAPID_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {

    const input = url.searchParams.get('input')
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