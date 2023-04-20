import type { RequestHandler } from '@sveltejs/kit';
import { RAPID_API_KEY } from '$env/static/private';
import { ingredients } from '$lib/ingredients';

export const GET: RequestHandler = async ({ url }) => {
	const inputText: string = url.searchParams.get('input') || '';
	const inputWords = inputText.toLowerCase().split(' ');
	const filteredIng = ingredients
		.filter((i) => {
			const ingWords = i.toLowerCase().split(' ');
			return inputWords.every((w) => ingWords.some((ingW) => ingW.startsWith(w)));
		})
		.sort((a, b) => {
			const aLower = a.toLowerCase();
			const bLower = b.toLowerCase();
			const inputTextLower = inputText.toLowerCase();

			if (aLower.indexOf(inputTextLower) === bLower.indexOf(inputTextLower)) {
				return a.length - b.length;
			} else {
				return aLower.indexOf(inputTextLower) - bLower.indexOf(inputTextLower);
			}
		});
	return new Response(JSON.stringify(filteredIng.slice(0, 5)), { status: 200 });
};
