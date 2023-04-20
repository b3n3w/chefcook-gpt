import type { RequestHandler } from './$types';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

/**
 * This method provides the free try-out mode for new users.
 * The ratelimit will be to get 2 recipes per month, per user.
 * @returns generated recipe
 */ export const POST: RequestHandler = async ({ request }) => {
	// Parse request data
	const data = await request.json();
	const prompt = data.prompt;
	if (!prompt) {
		return new Response('No prompt provided', { status: 400 });
	}

	// Set up OpenAI API client
	const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
	const openai = new OpenAIApi(configuration);

	// Prepare message object
	const messages = [{ role: 'user', content: prompt }];

	try {
		// Generate AI response
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages
		});

		// Return response data
		const content = completion.data.choices[0].message.content;
		return new Response(JSON.stringify(content), { status: 200 });
	} catch (error: any) {
		// Handle errors from OpenAI API
		if (error.response) {
			const status = error.response.status;
			return new Response(JSON.stringify({ status, content: '' }), { status: 400 });
		}
	}
	return new Response('Something went wrong', { status: 500 });
};
