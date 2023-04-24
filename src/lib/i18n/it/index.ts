import type { Translation } from '../i18n-types';
import en from '../en';

const it: Translation = {
	...(en as Translation),
	common: {
		button: 'Genera uno!'
	},
	nav: {
		create: 'Creare',
		recipes: 'Ricette',
		settings: 'Impostazioni'
	},
	landing: {
		header: {
			gen: 'creare',
			recipe: 'La tua ricetta',
			ai: 'Con AI'
		},
		idea: 'Cibo a casa ma non ho idea di cosa cucinare'
	},
	generate: {
		headers: {
			type: 'Seleziona ciò che ami',
			main: 'Seleziona il tuo principale',
			atHome: 'Cosa hai a casa?',
			time: "Quanto tempo avete a disposizione?"
		},
		types: {
			vegan: 'Vegana',
			veggie: 'Vegetariana',
			fish: 'Pescare',
			meat: 'Carne'
		},
		mains: {
			pasta: 'Pasta',
			rice: 'Riso',
			salad: 'Insalata'
		},
		info: {
			noIngredients: 'Nessun ingrediente aggiunto',
			inputPlaceholer: 'Inserisci per aggiungere',
			time: 'Questo richiede circa 15 secondi',
			invalidKey: 'Api-key non valido o non impostato',
			processing: 'In lavorazione...'
		},
		buttons: {
			settings: 'Impostazioni aperte'
		}
	},
	recipes: {
		header: 'Le tue ricette',
		noRecipes: 'Attualmente non hai alcuna ricetta 😰'
	},
	recipe: {
		translate: 'Tradurre',
		ingredients: 'ingredienti',
		instructions: 'Istruzioni'
	},
	settings: {
		darkmode: {
			header: 'Modalità scura',
			enabled: 'disattivare',
			disabled: 'Abilitare'
		},
		apiKey: {
			info: 'Se non hai ancora un api-key. Si prega di registrarsi a:',
			invalid: 'Set non valido o nessun api-key!',
			valid: 'Api-key sembra buono! Cuciniamo!',
			button: {
				save: 'Salva',
				valid: 'Valida'
			}
		}
	}
};

export default it;
