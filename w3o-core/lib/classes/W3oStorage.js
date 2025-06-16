// w3o-core/src/classes/W3oStorage.ts
/**
 * Simple key/value store for sharing data across a context tree.
 */
export class W3oStorage {
    constructor() {
        this.data = {};
    }
    /**
     * Stores a value under the specified key.
     * @param key - The key to associate with the value.
     * @param value - The value to store.
     */
    set(key, value) {
        this.data[key] = value;
    }
    /**
     * Retrieves a value by its key.
     * @param key - The key of the value to retrieve.
     * @returns The stored value or undefined if not found.
     */
    get(key) {
        return this.data[key];
    }
    /**
     * Removes a value by its key.
     * @param key - The key of the value to remove.
     */
    remove(key) {
        delete this.data[key];
    }
    /**
     * Checks if a key exists in the storage.
     * @param key - The key to check.
     * @returns True if the key exists, false otherwise.
     */
    has(key) {
        return this.data.hasOwnProperty(key);
    }
    /**
     * Returns all keys currently stored.
     * @returns An array of keys.
     */
    keys() {
        return Object.keys(this.data);
    }
    /**
     * Clears all stored data.
     */
    clear() {
        this.data = {};
    }
    /**
     * Returns a snapshot (shallow copy) of the current storage state.
     * @returns An object representing the stored key-value pairs.
     */
    snapshot() {
        return { ...this.data };
    }
}
