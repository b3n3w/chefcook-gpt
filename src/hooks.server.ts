/** @type {import('@sveltejs/kit').Handle} */
import {  DOMAIN_URL } from '$env/static/private';
import rateLimit from 'express-rate-limit';


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

/**
 * Ratelimiting on IP basis to limit free access
 * Each user has a max number of two free recipes per 30 days
 */
const apiLimiter = rateLimit({
    windowMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    max: 2,
    message: 'You have exceeded the 2 requests per month limit',
});


export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith('/api/generate')) {
        const refererResponse = refererCheck(event);
        if (refererResponse !== null) {
            return refererResponse;
        }
        return new Response('custom response');
    }
    const response = await resolve(event);
    return response;
}