import { Configuration, OpenAIApi } from 'openai';

export async function fetchRecipe(apikey: string, prompt: string) {

	const configuration = new Configuration({
		apiKey: apikey
	});

	const openai = new OpenAIApi(configuration);
	const messages: any = []

	messages.push({
		role: 'user',
		content: prompt
	});
	try {
		let completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: messages
		});
		return { status: 200, content: completion.data.choices[0].message.content }
	} catch (error: any) {
		if (error.response) {
			return { status: error.response.status, content: "" }
		}
	}
	return { status: 400, content: "" }
}


export async function validateApiKey(apiKey: string) {

	const configuration = new Configuration({
		apiKey: apiKey,
	});

	const openai = new OpenAIApi(configuration);
	try {
		await openai.retrieveModel("text-davinci-003");
		return 200
	} catch (error: any) {
		if (error.response) {
			return error.response.status
		}
	}
}