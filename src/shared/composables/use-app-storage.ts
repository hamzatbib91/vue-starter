import { useStorage, type MaybeRefOrGetter, type StorageLike, type UseStorageOptions, type RemovableRef } from '@vueuse/core';

const DEFAULT_PREFIX = 'v-app:';

/**
 * Custom hook to use storage with a default prefix.
 * 
 * @param key - The key to store the value under.
 * @param value - The value to store.
 * @param options - Optional parameters for storage, including custom storage and prefix.
 * @returns A reactive reference to the stored value.
 */
export function useAppStorage<T = unknown>(
  key: string,
  value: MaybeRefOrGetter<T>,
  options?: UseStorageOptions<T> & { storage?: StorageLike; prefix?: string },
): RemovableRef<T> {
  return useStorage<T>(`${options?.prefix ?? DEFAULT_PREFIX}${key}`, value, options?.storage ?? localStorage, options);
}

/**
 * Custom hook to clear storage items with a specific prefix.
 * 
 * @returns An object with methods to clear all items with the prefix or remove a specific item.
 */
export function useClearAppStorage() {
  /**
   * Clears all storage items with the specified prefix.
   * 
   * @param prefix - The prefix to filter storage items by.
   */
  function clear(prefix = DEFAULT_PREFIX) {
    const keys = Object.keys(window.localStorage);

    const keysToRemove = keys.filter((key) => key.startsWith(`${prefix}`));

    for (const key of keysToRemove) {
      window.localStorage.removeItem(key);
    }
  }

  /**
   * Removes a specific storage item with the specified prefix.
   * 
   * @param key - The key of the item to remove.
   * @param prefix - The prefix to filter storage items by.
   */
  function removeItem(key?: string, prefix = DEFAULT_PREFIX) {
    window.localStorage.removeItem(`${prefix}${key}`);
  }

  return { clear, removeItem };
}