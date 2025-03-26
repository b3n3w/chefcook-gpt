import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale } from '$lib/i18n/i18n-util.js';
import { PRIVATE_DISCORD_TOKEN_URL, PRIVATE_OPENAI_API_KEY, PRIVATE_MEALIE_API_TOKEN, PRIVATE_MEALIE_URL, PRIVATE_MEALIE_UPLOAD_ENABLED, PRIVATE_DISCORD_NOTIFICATIONS_ENABLED } from '$env/static/private';
import OpenAI from 'openai';
import { sendNotifitications } from '$lib/shared/stores/general';


validateApiKey()
validateDiscordToken()
validateMealieToken()


/**
 * Thanks to CodingGardeen - https://github.com/CodingGarden/listd
 */
const handleDetectLocale = (async ({ event, resolve }) => {
	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
	const locale = detectLocale(acceptLanguageHeaderDetector);

	event.locals.locale = locale;

	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
}) satisfies Handle;

export const handle = sequence(handleDetectLocale);



/**
 * Initial server startup test if API_KEY ist set and valid
 */

export async function validateApiKey() {

	if (!PRIVATE_OPENAI_API_KEY) {
		throw Error("[!] OpenAI-Api-Key not set as environment variable.")
	}
	const openai = new OpenAI({
		apiKey: PRIVATE_OPENAI_API_KEY
	});

	try {
		await openai.models.list();
		console.log("[i] Sucessfully connected to OpenAI API");
	} catch (error: any) {
		throw Error("[!] OpenAI-Api-Key is not valid")
	}
}


/**
 * Initial server startup test if DiscordToken ist set and valid
 */

export async function validateDiscordToken() {
	if (PRIVATE_DISCORD_NOTIFICATIONS_ENABLED === 'true') {
		if (!PRIVATE_DISCORD_TOKEN_URL) {
			console.log("[!] Discord token not set. Notifications are disabled.");
			return
		}
		console.log("[i] Discord token set. Enable server notifications.");
		sendNotifitications.set(true)
		return;
	}
	console.log("[i] Discord notifications disabled.");
}

/**
 * Initial server startup test if DiscordToken ist set and valid
 */

export async function validateMealieToken() {

	if (PRIVATE_MEALIE_UPLOAD_ENABLED === 'true') {


		if (!PRIVATE_MEALIE_API_TOKEN) {
			console.log("[i] Mealie token not set. Recipes will not be send to external recipe cookbook.");
			return
		}
		const request = await fetch(`${PRIVATE_MEALIE_URL}/api/users/self`, {
			headers: {
				Authorization: `Bearer ${PRIVATE_MEALIE_API_TOKEN}`
			}
		})
		if (request.status != 200) {
			console.log("[!] Mealie API token not valid. Could not retrieve userdata");
		} else {
			console.log("[i] Sucessfully connected to Mealie API. Send future recipes to cookbook");
		}
		return;
	}
	console.log("[i] Mealie upload disabled.");
}