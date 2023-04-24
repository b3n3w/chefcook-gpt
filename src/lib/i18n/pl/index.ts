import type { Translation } from '../i18n-types';
import en from '../en';

const pl: Translation = {
	...(en as Translation),
	common: {
		button: 'Wygeneruj jeden!'
	},
	nav: {
		create: 'Tworzyć',
		recipes: 'Przepisy',
		settings: 'Ustawienia'
	},
	landing: {
		header: {
			gen: 'Generować',
			recipe: 'Twój przepis',
			ai: 'Z AI'
		},
		idea: 'Jedzenie w domu, ale nie mam pojęcia, co gotować'
	},
	generate: {
		headers: {
			type: 'Wybierz to, co kochasz',
			main: 'Wybierz swój główny',
			atHome: 'Co masz w domu?',
			time: "Ile masz czasu?"
		},
		types: {
			vegan: 'Wegański',
			veggie: 'Wegetaria',
			fish: 'Ryba',
			meat: 'Mięso'
		},
		mains: {
			pasta: 'Makaron',
			rice: 'Ryż',
			salad: 'Sałatka'
		},
		info: {
			noIngredients: 'Nie dodano żadnych składników',
			inputPlaceholer: 'Enter, aby dodać',
			time: 'To zajmuje około 15 sekund',
			invalidKey: 'Api-Key nieprawidłowy lub nie ustawiony',
			processing: 'Przetwarzanie...'
		},
		buttons: {
			settings: 'Otwórz ustawienia'
		}
	},
	recipes: {
		header: 'Twoje przepisy',
		noRecipes: 'Obecnie nie masz żadnego przepisu 😰'
	},
	recipe: {
		translate: 'Tłumaczyć',
		ingredients: 'Składniki',
		instructions: 'Instrukcje'
	},
	settings: {
		darkmode: {
			header: 'Darkmode',
			enabled: 'Wyłączyć',
			disabled: 'Włączać'
		},
		apiKey: {
			info: 'Jeśli nie masz jeszcze klawisza API. Zarejestruj się na:',
			invalid: 'Nieprawidłowy lub brak zestawu API-klawisza!',
			valid: 'KLUKA API-KLEY wygląda dobrze! Gotujmy!',
			button: {
				save: 'Ratować',
				valid: 'Ważny'
			}
		}
	}
};

export default pl;
