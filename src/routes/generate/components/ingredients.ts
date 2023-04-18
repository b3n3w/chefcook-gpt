import type { RequestHandler } from '@sveltejs/kit'
import { RAPID_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {

    const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/auto-complete?q=${params.input}`;

    console.log(RAPID_API_KEY);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
    };
    
    const response = await fetch(url, options)
    const ingredients = await response.json().catch(err => console.log(err));

    return {
        body: {
            ingredients: ingredients.slice(0, 20)
        }
    }
}