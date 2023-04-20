import { Configuration, OpenAIApi } from 'openai';
import { get } from 'svelte/store';
import { apikeyStore } from './shared/stores/general';

export async function fetchRecipe(prompt: string) {
	const apiKey = get(apikeyStore);

	if (!apiKey || !(await validateApiKey(apiKey))) {
		const response = await fetch('/api/generate', {
			method: 'POST',
			body: JSON.stringify({ prompt })
		});
		if (response.status !== 200) {
			return { status: 401, content: '' };
		}
		const content = await response.json();
		return { status: 200, content };
	}

	const configuration = new Configuration({ apiKey });
	const openai = new OpenAIApi(configuration);
	const messages = [{ role: 'user', content: prompt }];

	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages
		});
		return { status: 200, content: completion.data.choices[0].message.content };
	} catch (error: any) {
		if (error.response) {
			return { status: error.response.status, content: '' };
		}
		return { status: 400, content: '' };
	}
}

export async function validateApiKey(apiKey: string): Promise<Boolean> {

	const configuration = new Configuration({
		apiKey: apiKey,
	});

	const openai = new OpenAIApi(configuration);
	try {
		await openai.retrieveModel("text-davinci-003");
		return true
	} catch (error: any) {
		return false
	}
}