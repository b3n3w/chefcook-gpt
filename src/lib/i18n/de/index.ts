import type { Translation } from '../i18n-types';
import en from '../en';

const de: Translation = {
	...(en as Translation),
	common: {
		button: 'Rezept erstellen'
	},
	nav: {
		create: 'Erstellen',
		recipes: 'Rezepte',
		settings: 'Einstellungen'
	},
	landing: {
		header: {
			gen: 'Erstelle',
			recipe: 'Rezepte',
			ai: 'mit AI'
		},
		idea: 'Zutaten Zuhause aber keine Idee für Heute ?'
	},
	generate: {
		headers: {
			type: 'Welcher Typ bist du ? ',
			main: 'Auf was hast du Lust ?',
			atHome: 'Was hast du Zuhause ?',
			time: 'Wieviel Zeit hast du ?'
		},
		types: {
			vegan: 'Vegan',
			veggie: 'Veggie',
			fish: 'Fisch',
			meat: 'Fleisch'
		},
		mains: {
			pasta: 'Pasta',
			rice: 'Reis',
			salad: 'Salat'
		},
		info: {
			noIngredients: 'Keine Zutaten hinzugefügt',
			inputPlaceholer: 'Hinzufügen',
			time: 'Dies kann bis zu 15 sekunden dauern',
			invalidKey: 'API-Key nicht gültig oder nicht gesetzt',
			processing: 'Wird erstellt...'
		},
		buttons: {
			settings: 'Öffne Einstellungen'
		}
	},
	recipes: {
		header: 'Deine Rezepte',
		noRecipes: 'Aktuell keine Rezepte vorhanden 😰'
	},
	recipe: {
		translate: 'Übersetzen',
		ingredients: 'Zutaten',
		instructions: 'Zubereitung'
	},
	settings: {
		darkmode: {
			header: 'Dunkelmodus',
			enabled: 'Deaktivieren',
			disabled: 'Aktivieren'
		},
		apiKey: {
			info: 'Falls du noch keinen Api-Key besitzt, registriere dich auf: ',
			invalid: 'Ungültiger oder kein API-Key!',
			valid: 'Api-Key gültig! Lege jetzt los!',
			button: {
				save: 'Speichern',
				valid: 'Key gültig'
			}
		}
	}
};

export default de;
