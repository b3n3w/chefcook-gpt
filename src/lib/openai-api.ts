import OpenAI from 'openai';

export async function fetchRecipe(apikey: string, prompt: string) {

	const openai = new OpenAI({
		apiKey: apikey,
		dangerouslyAllowBrowser: true
	});

	const messages: any = [];

	messages.push({
		role: 'user',
		content: prompt
	});

	try {
		let completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: messages
		});
		return { status: 200, content: completion.choices[0].message.content };
	} catch (error: any) {
		console.log(error);
		
		if (error.response) {
			return { status: error.response.status, content: '' };
		}
	}
	return { status: 400, content: '' };
}

export async function validateApiKey(apiKey: string) {

	const openai = new OpenAI({
		apiKey: apiKey,
		dangerouslyAllowBrowser: true
	  });
	try {	
		console.log(await openai.models.list())
		await openai.models.list()
		return 200;
	} catch (error: any) {
		if (error.response) {
			return error.response.status;
		}
	}
}
