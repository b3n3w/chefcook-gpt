/** @type {import('@sveltejs/kit').Handle} */
import { DOMAIN_URL } from '$env/static/private';
import type { RequestEvent } from './routes/api/generate/$types';


/**
 * Checks if the request comes from the SvelteApp
 * @returns 
 */
const refererCheck = (event) => {
    const referer = event.request.headers.get('referer')
    if (!referer || !referer.includes(DOMAIN_URL)) {
        return new Response("Something went wrong", { status: 401 })
    }
    return null;
};

export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith('/api/generate')) {
        const refererResponse = refererCheck(event);
        if (refererResponse !== null) {
            return refererResponse;
        }
    }
    const response = await resolve(event);
    return response;
}