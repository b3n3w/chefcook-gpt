import type { Translation } from '../i18n-types';
import en from '../en';

const ru: Translation = {
	...(en as Translation),
	common: {
		button: 'Создайте один!'
	},
	nav: {
		create: 'Создавать',
		recipes: 'Рецепты',
		settings: 'Настройки'
	},
	landing: {
		header: {
			gen: 'Генерировать',
			recipe: 'Ваш рецепт',
			ai: 'С ИИ'
		},
		idea: 'Еда дома, но не знайте, что приготовить'
	},
	generate: {
		headers: {
			type: 'Выберите то, что любишь',
			main: 'Выберите свой основной',
			atHome: 'Что у тебя дома?',
			time: 'Сколько у вас времени?'
		},
		types: {
			vegan: 'Веганский',
			veggie: 'Овощ',
			fish: 'Рыба',
			meat: 'Мясо'
		},
		mains: {
			pasta: 'Макаронные изделия',
			rice: 'Рис',
			salad: 'Салат'
		},
		info: {
			noIngredients: 'Ингредиенты не добавлены',
			inputPlaceholer: 'Введите, чтобы добавить',
			time: 'Это занимает около 15 секунд',
			invalidKey: 'Апик',
			processing: 'Обработка...'
		},
		buttons: {
			settings: 'Открыть настройки'
		}
	},
	recipes: {
		header: 'Ваши рецепты',
		noRecipes: 'В настоящее время у вас нет рецепта 😰'
	},
	recipe: {
		translate: 'Переводить',
		ingredients: 'Ингредиенты',
		instructions: 'инструкции'
	},
	settings: {
		darkmode: {
			header: 'Темная мода',
			enabled: 'Запрещать',
			disabled: 'Давать возможность'
		},
		apiKey: {
			info: 'Если у вас еще нет апи-клавиша. Пожалуйста, зарегистрируйтесь по адресу:',
			invalid: 'Недостаточно или нет набора апик-клавиш!',
			valid: 'Api-Key выглядит хорошо! Давай готовить!',
			button: {
				save: 'Сохранять',
				valid: 'Действительный'
			}
		}
	}
};

export default ru;
