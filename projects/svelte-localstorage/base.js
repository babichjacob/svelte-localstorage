import { writable } from "svelte/store";

/**
 * @template Item
 * @param {string} key What key in localStorage to synchronize with
 * @param {Item} initial The initial value of the writable store
 * @param {boolean} browser Whether or not this code is running in the browser (where localStorage is available) 
 * @returns {import("svelte/store").Writable<Item>} A writable store that synchronizes to localStorage
 */
export const localStorageStore = (key, initial, browser) => {
	let currentValue = initial;
	
	const { set: setStore, ...readableStore } = writable(initial, () => {
		if (browser) {	
			getAndSetFromLocalStorage();
			
			/**
			 * @param {StorageEvent} event
			 */
			const updateFromStorageEvents = (event) => {
				if (event.key === key) getAndSetFromLocalStorage();
			};
			window.addEventListener("storage", updateFromStorageEvents);
			return () => window.removeEventListener("storage", updateFromStorageEvents);
		}
	});

	// Set both localStorage and this Svelte store
	/** @type {import("svelte/store").Writable<Item>["set"]} */
	const set = (value) => {
		currentValue = value;
		setStore(value);
		
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`the \`${key}\` store's new value \`${value}\` could not be persisted to localStorage because of ${error}`);
		}
	};

	// Synchronize the Svelte store with localStorage
	const getAndSetFromLocalStorage = () => {
		let localValue = null;
		try {
			localValue = localStorage.getItem(key);
		} catch (error) {
			console.error(`the \`${key}\` store's value could not be restored from localStorage because of ${error}`);
		}

		if (localValue === null) set(initial);
		else {
			try {
				const parsed = JSON.parse(localValue);
				setStore(parsed);
				currentValue = parsed;
			} catch (error) {
				console.error(`localStorage's value for \`${key}\` (\`${localValue}\`) could not be parsed as JSON because of ${error}`);
			}
		}
	};
	
	/** @type {import("svelte/store").Writable<Item>["update"]} */
	const update = (fn) => {
		set(fn(currentValue));
	};
		
	return { ...readableStore, set, update };
};
