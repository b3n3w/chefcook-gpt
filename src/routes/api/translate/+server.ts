import type { RequestHandler } from './$types';
import * as translator from '@parvineyvazov/json-translator';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()
    const transData: translator.translatedObject = data

    let es_lang = await translator.translateObject(
        transData,
        translator.languages.English,
        translator.languages.German
    );

    return new Response(JSON.stringify(es_lang), { status: 200 });
};