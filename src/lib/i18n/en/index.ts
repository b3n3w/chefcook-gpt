import type { BaseTranslation } from '../i18n-types'

const en = {
	common: {
		button: "Generate one!"
	},
	nav: {
		create: "Create",
		recipes: "Recipes",
		settings: "Settings"
	},
	landing: {
		header: {
			gen: "Generate",
			recipe: "Your recipe",
			ai: "With AI"
		},
		idea: "Food at home but no idea what to cook"
	},
	generate: {
		headers: {
			type: "Select what you love",
			main: "Select your main",
			atHome: "What do you have at home ? ",
			time: "How much time you have ?"
		},
		types: {
			vegan: "Vegan",
			veggie: "Veggie",
			fish: "Fish",
			meat: "Meat"
		},
		mains: {
			pasta: "Pasta",
			rice: "Rice",
			salad: "Salad"
		},
		info: {
			noIngredients: "No ingredients added",
			inputPlaceholer: "Enter to add", 
			time: "This takes around 15 seconds",
			invalidKey: "Api-Key not valid or not set",
			processing: "Processing..."
		},
		buttons: {
			settings: "Open settings",
		}
	},
	recipes: {
		header: "Your recipes",
		noRecipes: "Currently you don't have any recipe 😰"
	},
	recipe: {
		translate: "Translate",
		ingredients: "Ingredients",
		instructions: "Instructions"
	},
	settings: {
		darkmode: {
			header: "Darkmode",
			enabled: "Disable",
			disabled: "Enable"
		},
		apiKey: {
			info: "If you don't have an API-Key yet. Please register at: ",
			invalid: "Invalid or no api-key set!",
			valid: "Api-Key looks good! Lets cook!",
			button: {
				save: "Save",
				valid: "Valid"
			}
		}
	}
} satisfies BaseTranslation

export default en
