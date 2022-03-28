import { browser } from "$app/env";
import { localStorageStore as base } from "./base.js";

/**
 * @template Item
 * @param {string} key What key in localStorage to synchronize with
 * @param {Item} initial The initial value of the writable store
 * @param {object} [serde] How to serialize and deserialize the Item
 * @param {function(Item): string} [serde.serialize] How to create a string representation of the Item to store in localStorage. You can also implement compression here.
 * @param {function(string): Item} [serde.deserialize] How to convert the string representation in localStorage to an Item. You can also implement decompression here.
 * @returns {import("svelte/store").Writable<Item>} A writable store that synchronizes with localStorage
 */
export const localStorageStore = (key, initial, serde = {}) => base(key, initial, browser, serde);
