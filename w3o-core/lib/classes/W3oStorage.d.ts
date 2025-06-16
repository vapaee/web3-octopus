export type W3oMappingType = {
    [key: string]: any;
};
/**
 * Simple key/value store for sharing data across a context tree.
 */
export declare class W3oStorage {
    private data;
    /**
     * Stores a value under the specified key.
     * @param key - The key to associate with the value.
     * @param value - The value to store.
     */
    set<T>(key: string, value: T): void;
    /**
     * Retrieves a value by its key.
     * @param key - The key of the value to retrieve.
     * @returns The stored value or undefined if not found.
     */
    get<T = any>(key: string): T | undefined;
    /**
     * Removes a value by its key.
     * @param key - The key of the value to remove.
     */
    remove(key: string): void;
    /**
     * Checks if a key exists in the storage.
     * @param key - The key to check.
     * @returns True if the key exists, false otherwise.
     */
    has(key: string): boolean;
    /**
     * Returns all keys currently stored.
     * @returns An array of keys.
     */
    keys(): string[];
    /**
     * Clears all stored data.
     */
    clear(): void;
    /**
     * Returns a snapshot (shallow copy) of the current storage state.
     * @returns An object representing the stored key-value pairs.
     */
    snapshot(): W3oMappingType;
}
//# sourceMappingURL=W3oStorage.d.ts.map