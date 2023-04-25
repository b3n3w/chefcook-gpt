import type { Translation } from '../i18n-types';
import en from '../en';

const es: Translation = {
	...(en as Translation),
	common: {
		button: '¡Generar uno!'
	},
	nav: {
		create: 'Crear',
		recipes: 'Recetas',
		settings: 'Ajustes'
	},
	landing: {
		header: {
			gen: 'Generar',
			recipe: 'Tu receta',
			ai: 'Con ai'
		},
		idea: 'Comida en casa pero no tengo idea de qué cocinar'
	},
	generate: {
		headers: {
			type: 'Seleccione lo que amas',
			main: 'Seleccione su principal',
			atHome: '¿Qué tienes en casa?',
			time: '¿De cuánto tiempo dispone?'
		},
		types: {
			vegan: 'Vegana',
			veggie: 'Vegetal',
			fish: 'Pez',
			meat: 'Carne'
		},
		mains: {
			pasta: 'Pasta',
			rice: 'Arroz',
			salad: 'Ensalada'
		},
		info: {
			noIngredients: 'No se agregaron ingredientes',
			inputPlaceholer: 'Entrar para agregar',
			time: 'Esto toma alrededor de 15 segundos',
			invalidKey: 'Api-key no válido o no establecido',
			processing: 'Procesando...'
		},
		buttons: {
			settings: 'Configuración abierta'
		}
	},
	recipes: {
		header: 'Tus recetas',
		noRecipes: 'Actualmente no tienes ninguna receta 😰'
	},
	recipe: {
		translate: 'Traducir',
		ingredients: 'Ingredientes',
		instructions: 'Instrucciones'
	},
	settings: {
		darkmode: {
			header: 'Moderna',
			enabled: 'Desactivar',
			disabled: 'Permitir'
		},
		apiKey: {
			info: 'Si aún no tienes una tecla API. Por favor regístrese en:',
			invalid: '¡Inválido o no API-Key set!',
			valid: 'Api-key se ve bien! ¡Cocinemos!',
			button: {
				save: 'Ahorrar',
				valid: 'Válida'
			}
		}
	}
};

export default es;
