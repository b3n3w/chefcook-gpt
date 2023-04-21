import type { Locales } from "./i18n-types"

export const getLanguage = (locale: Locales): string =>{

	switch (locale){
		case "de":
			return "german"
		case "es":
			return "spanish"
		case "it":
			return "italian"
		case "ru":
			return "russian"
		case "hu":
			return "hungarian"
		case "pl":
			return "polish"
	}
		
	return "english"
}