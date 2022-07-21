import { writable } from "svelte/store";

/**
 * @template Item
 * @param {string} key What key in localStorage to synchronize with
 * @param {Item} initial The initial value of the writable store
 * @param {boolean} browser Whether or not this code is running in the browser (where localStorage is available)
 * @param {object} [param3] How to serialize and deserialize the Item
 * @param {function(Item): string} [param3.serialize] How to create a string representation of the Item to store in localStorage. You can also implement compression here.
 * @param {function(string): Item} [param3.deserialize] How to convert the string representation in localStorage to an Item. You can also implement decompression here.
 * @returns {import("svelte/store").Writable<Item>} A writable store that synchronizes with localStorage
 */
export const localStorageStore = (
  key,
  initial,
  browser,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  let currentValue = initial;

  /**
   * @param {import("svelte/store").Writable<Item>["set"]} setStore
   * @param {Item} value
   */
  const syncCurrentValue = (setStore, value) => {
    setStore(value);
    currentValue = value;
  };

  /** @param {string | null} localValue */
  const parseFromLocalStorage = (localValue) => {
    if (localValue === null) return initial;

    try {
      return deserialize(localValue);
    } catch (error) {
      console.error(
        `localStorage's value for \`${key}\` (\`${localValue}\`) could not be deserialized with ${deserialize} because of ${error}, so the initial value \`${initial}\` will be used instead`
      );
      return initial;
    }
  };

  const { set: setStore, subscribe } = writable(initial, (setStore) => {
    if (browser) {
      /** @type {string | null} */
      let localStorageValue = null;
      try {
        localStorageValue = localStorage.getItem(key);
      } catch (error) {
        console.error(
          `the \`${key}\` store's value could not be restored from localStorage because of ${error}, so the initial value \`${initial}\` will be used instead`
        );
      }

      syncCurrentValue(setStore, parseFromLocalStorage(localStorageValue));

      /** @param {StorageEvent} event */
      const setFromStorageEvents = (event) => {
        if (event.key === key)
          syncCurrentValue(setStore, parseFromLocalStorage(event.newValue));
      };
      window.addEventListener("storage", setFromStorageEvents);
      return () => window.removeEventListener("storage", setFromStorageEvents);
    }
  });

  // Set both localStorage and this Svelte store
  /** @type {import("svelte/store").Writable<Item>["set"]} */
  const set = (value) => {
    syncCurrentValue(setStore, value);

    try {
      const serialized = serialize(value);

      try {
        localStorage.setItem(key, serialized);
      } catch (error) {
        console.error(
          `the \`${key}\` store's new value \`${value}\` (which serialized to \`${serialized}\`) could not be persisted to localStorage because of ${error}`
        );
      }
    } catch (error) {
      console.error(
        `the \`${key}\` store was set to \`${value}\`, but this could not be serialized with ${serialize} because of ${error}, so it won't be persisted to localStorage`
      );
    }
  };

  /** @type {import("svelte/store").Writable<Item>["update"]} */
  const update = (fn) => {
    set(fn(currentValue));
  };

  return { set, subscribe, update };
};
