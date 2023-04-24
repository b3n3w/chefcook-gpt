type Prompt = {
	instructions: string;
	language: string;
	type: {
		[key: string]: string;
	};
};

export const prompts: Prompt = {
	instructions:
		"Calculate an estimated time to prepare and cook the meal and describe the steps as list. The max time to prepare the mail should be: -TIME- minutes. Return the recipe in the following json format: {mealname: 'title', estimated_time: 'time', description: 'short description', ingredients: [ {ingredientName: '', count: '' }], instructions: [{1: step1}] }.",
	language: 'Use -LANG- for the json values. ',
	type: {
		meat: "Generate a tasty recipe with meat and -MAIN- as main ingredient. You can use the following ingredients: -INGREDIENTS-, but don't have to.",
		fish: "Generate a tasty recipe with fish and -MAIN- as main ingredient. You can use the following ingredients: -INGREDIENTS-, but don't have to.",
		veggie:
			"Generate a tasty vegetarian recipe with -MAIN- as main ingredient. You can use the following ingredients: -INGREDIENTS-, but don't have to.",
		vegan:
			"Generate a tasty vegan recipe with -MAIN- as main ingredient. You can use the following ingredients: -INGREDIENTS-, but don't have to.",
		without:
			"Generate a tasty recipe. You can use the following ingredients -INGREDIENTS-, but don't have to."
	}
};
