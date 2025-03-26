import { addRecipeToMealie } from '$lib/api/mealie';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PRIVATE_MEALIE_URL } from '$env/static/private';


export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const recipe = data.recipe;

    const mealieData = await addRecipeToMealie(recipe);

    if (mealieData) {
        const mealieUrl = `${PRIVATE_MEALIE_URL}/recipe/${mealieData.slug}`
        return new Response(JSON.stringify({ mealieUrl: mealieUrl }), { status: 200 });
    } else {
        error(400, {
                    message: "Could not upload recipe to Mealie"
                });
    }
};
