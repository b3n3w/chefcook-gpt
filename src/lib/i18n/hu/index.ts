import type { Translation } from '../i18n-types';
import en from '../en';

const hu: Translation = {
	...(en as Translation),
	common: {
		button: 'Generáljon egyet!'
	},
	nav: {
		create: 'Teremt',
		recipes: 'Recept',
		settings: 'Beállítások'
	},
	landing: {
		header: {
			gen: 'generál',
			recipe: 'A recepted',
			ai: 'AI -vel'
		},
		idea: 'Ételt otthon, de fogalmam sincs, mit főzzek'
	},
	generate: {
		headers: {
			type: 'Válassza ki, amit szeret',
			main: 'Válassza ki a főjét',
			atHome: 'Mi van otthon?',
			time: 'Mennyi időd van ?'
		},
		types: {
			vegan: 'Vegán',
			veggie: 'Vega',
			fish: 'Hal',
			meat: 'Hús'
		},
		mains: {
			pasta: 'Tészta',
			rice: 'Rizs',
			salad: 'Saláta'
		},
		info: {
			noIngredients: 'Nincs hozzávaló hozzáadása',
			inputPlaceholer: 'Írja be a hozzáadást',
			time: 'Ez körülbelül 15 másodpercig tart',
			invalidKey: 'API-Key nem érvényes, vagy nem állított be',
			processing: 'Feldolgozás...'
		},
		buttons: {
			settings: 'Nyisd meg a beállításokat'
		}
	},
	recipes: {
		header: 'A receptjeid',
		noRecipes: 'Jelenleg nincs receptje 😰'
	},
	recipe: {
		translate: 'fordít',
		ingredients: 'Összetevők',
		instructions: 'Utasítás'
	},
	settings: {
		darkmode: {
			header: 'DarkMode',
			enabled: 'Letilt',
			disabled: 'Engedélyezze'
		},
		apiKey: {
			info: 'Ha még nincs api kulcsod. Kérjük, regisztráljon a következő címen:',
			invalid: 'Érvénytelen vagy nincs api-kulcskészlet!',
			valid: 'Az Api-kulcs jól néz ki! Főzzünk!',
			button: {
				save: 'Megment',
				valid: 'Érvényes'
			}
		}
	}
};

export default hu;
