import type { RequestHandler } from './$types';
import * as translator from '@parvineyvazov/json-translator';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()
    const transData: translator.translatedObject = data.transData
    const language = data.language

    if (!language){
        return new Response("No language to translate given", { status: 400 });
    }
    let es_lang = await translator.translateObject(
        transData,
        translator.languages.English,
        language
    );
    return new Response(JSON.stringify(es_lang), { status: 200 });
};