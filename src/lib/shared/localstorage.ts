import { browser } from "$app/environment";

export function fromLocalStorage(storageKey: string, fallbackValue: any) {
    if (browser) {
        const storedValue = window.localStorage.getItem(storageKey);

        if (storedValue !== 'undefined' && storedValue !== null) {
            return typeof fallbackValue === 'object' ? JSON.parse(storedValue) : storedValue;
        }
    }
    return fallbackValue;
}

export function createForStorage(storageKey: string, data: any) {
    if (browser) {
        window.localStorage.setItem(storageKey, data);
    }
}

export function toLocalStorage(state: any, storageKey: string) {
    if (browser) {

        return store.subscribe((value: any) => {
            const storageValue = typeof value === 'object' ? JSON.stringify(value) : value;
            window.localStorage.setItem(storageKey, storageValue);
        });
    }
}
