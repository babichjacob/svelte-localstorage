import { browser } from "$app/env";
import { localStorageStore as base } from "./base";

/**
 * @template Item
 * @param {string} key What key in localStorage to synchronize with
 * @param {Item} initial The initial value of the writable store
 * @returns {import("svelte/store").Writable<Item>} A writable store that synchronizes to localStorage
 */
export const localStorageStore = (key, initial) => base(key, initial, browser);
