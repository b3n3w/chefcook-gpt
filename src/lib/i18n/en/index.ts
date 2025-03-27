import type { BaseTranslation } from '../i18n-types';

const en = {
	common: {
		button: 'Generate'
	},
	nav: {
		create: 'Create',
		recipes: 'Recipes',
		settings: 'Settings'
	},
	landing: {
		header: {
			gen: 'Generate',
			recipe: 'Your recipe',
			ai: 'with AI'
		},
		idea: 'Food at home but no idea what to cook'
	},
	generate: {
		headers: {
			type: 'Select what you love',
			main: 'Select your main',
			atHome: 'What do you have at home ? ',
			time: 'How much time you have ?'
		},
		types: {
			vegan: 'Vegan',
			veggie: 'Veggie',
			fish: 'Fish',
			meat: 'Meat'
		},
		mains: {
			pasta: 'Pasta',
			rice: 'Rice',
			salad: 'Salad'
		},
		info: {
			noIngredients: 'No ingredients added',
			inputPlaceholer: 'Enter to add',
			time: 'This can take up to 20 seconds',
			invalidKey: 'Api-Key not valid or not set',
			processing: 'Processing...'
		},
		buttons: {
			settings: 'Open settings'
		}
	},
	recipes: {
		header: 'Your recipes',
		noRecipes: "Currently you don't have any recipe 😰"
	},
	recipe: {
		translate: 'Translate',
		upload: 'Upload to Mealie',
		openMealieUrl: 'Open in Mealie',
		ingredients: 'Ingredients',
		instructions: 'Instructions'
	},
	settings: {
		model: {
			header: 'This version uses OpenAI Model',
		},
		darkmode: {
			header: 'Darkmode',
			enabled: 'Disable',
			disabled: 'Enable'
		},
		mealieUpload: {
			header: 'Automatically upload recipes to mealie'
		},
		apiKey: {
			info: "If you don't have an API-Key yet. Please register at: ",
			invalid: 'Invalid or no api-key set!',
			valid: 'Api-Key looks good! Lets cook!',
			button: {
				save: 'Save',
				valid: 'Valid'
			}
		}
	}
} satisfies BaseTranslation;

export default en;
