type Prompt = {
	instructions: string;
	english: {
		[key: string]: string;
	};
	german: {
		[key: string]: string;
	};
};

export const prompts: Prompt = {
	instructions:
		"Calculate an estimated time to prepare and cook the meal and describe the steps as list. Return the recipe in the following json format: {mealname: 'title', estimated_time: 'time', description: 'short description', ingredients: [ {ingredientName: '', count: '' }], instructions: [{1: step1}] }. For the count use the metric system, not the angloamerican. ",
	english: {
		meat: "Generate a tasty recipe with meat and -MAIN- as main ingredient. You can use the following ingredients: -INGREDIENTS-, but don't have to.",
		fish: "Generate a tasty recipe with fish and -MAIN- as main ingredient. You can use the following ingredients: -INGREDIENTS-, but don't have to.",
		vegan:
			"Generate a tasty vegan recipe with -MAIN- as main ingredient. You can use the following ingredients: -INGREDIENTS-, but don't have to.",
		without:
			"Generate a tasty vegan recipe. You can use the following ingredients -INGREDIENTS-, but don't have to."
	},
	german: {
		meat: '',
		fish: '',
		vegan: ''
	}
};
