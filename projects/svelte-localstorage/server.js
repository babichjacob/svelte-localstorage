import { writable } from "svelte/store";

/**
 * @template Item
 * @param {string} key What key in localStorage to synchronize with
 * @param {Item} initial The initial value of the writable store
 * @param {object} param2 How to serialize and deserialize the Item
 * @param {function(Item): string} [param2.serialize] How to create a string representation of the Item to store in localStorage. You can also implement compression here.
 * @param {function(string): Item} [param2.deserialize] How to convert the string representation in localStorage to an Item. You can also implement decompression here.
 * @returns {import("svelte/store").Writable<Item>} A writable store that synchronizes with localStorage
 */
export const localStorageWritable = (key, initial, param2 = {}) => {
  const { set, subscribe, update } = writable(initial);

  return { set, subscribe, update };
};
