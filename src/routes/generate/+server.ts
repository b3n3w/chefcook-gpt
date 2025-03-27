import OpenAI from 'openai';
import { PRIVATE_MEALIE_URL, PRIVATE_OPENAI_API_KEY, PRIVATE_MEALIE_UPLOAD_ENABLED, PRIVATE_DISCORD_NOTIFICATIONS_ENABLED, PRIVATE_DISCORD_TOKEN_URL } from '$env/static/private';
import { PUBLIC_GPT_MODEL } from '$env/static/public';
import type { ChatCompletion } from 'openai/resources';
import type { Recipe } from '$lib/interface/Recipe';
import { sendNotifitications } from '$lib/shared/stores/general';
import { addRecipeToMealie } from '$lib/api/mealie';
import { EmbedBuilder, WebhookClient } from 'discord.js';

export const POST = async ({ request }) => {
    const data = await request.json();
    const prompt = data.prompt;
    const addToMeali = data.uploadToMealie && PRIVATE_MEALIE_UPLOAD_ENABLED === 'true';

    if (!prompt) {
        return new Response('No prompt transmitted', { status: 400 });
    }

    const openai = new OpenAI({
        apiKey: PRIVATE_OPENAI_API_KEY
    });

    const messages: any = [];
    messages.push({
        role: 'user',
        content: prompt
    });

    try {
        const startTime = Date.now();

        const completion: ChatCompletion = await openai.chat.completions.create({
            model: PUBLIC_GPT_MODEL,
            messages: messages,
            response_format: { "type": "json_object" }
        });

        const endTime = Date.now();
        const timeInSeconds = (endTime - startTime) / 1000;

        let openAIAnswer = completion.choices[0].message.content;

        if (openAIAnswer) {
            const recipe: Recipe = JSON.parse(openAIAnswer);

            if (sendNotifitications) {
                sendSuccessNotification("Recipe generated!", recipe.mealname, timeInSeconds);
                console.log(`Generated: ${recipe.mealname} in ${timeInSeconds} seconds`);
            }

            if (addToMeali) {
                const mealieRecipe = await addRecipeToMealie(recipe);
                const mealieUrl = `${PRIVATE_MEALIE_URL}/recipe/${mealieRecipe.slug}`;
                recipe.mealieUrl = mealieUrl;
            }

            return new Response(JSON.stringify({ recipe }), { status: 200 });
        }

        return new Response('Could not generate recipe', { status: 400 });

    } catch (error: any) {
        if (error.response) {
            return new Response(error.response.data.error.message, { status: 400 });
        }
        return new Response('Could not generate recipe', { status: 400 });
    }
}



function sendSuccessNotification(title: string, mealname: string, processing_time: number) {
    if (PRIVATE_DISCORD_NOTIFICATIONS_ENABLED === 'false') {
        return;
    }
    const webhookClient = new WebhookClient({ url: PRIVATE_DISCORD_TOKEN_URL });

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor(0x00FFFF);

    webhookClient.send({
        content: `Generated recipe for ${mealname} in ${processing_time} seconds`,
        embeds: [embed],
    });
} 