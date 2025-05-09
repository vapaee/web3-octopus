// w3o-core/src/classes/W3oStorage.ts

export type W3oMappingType = { [key: string]: any };

/**
 * Simple key/value store for sharing data across a context tree.
 */
export class W3oStorage {
    private data: W3oMappingType = {};

    /**
     * Stores a value under the specified key.
     * @param key - The key to associate with the value.
     * @param value - The value to store.
     */
    public set<T>(key: string, value: T): void {
        this.data[key] = value;
    }

    /**
     * Retrieves a value by its key.
     * @param key - The key of the value to retrieve.
     * @returns The stored value or undefined if not found.
     */
    public get<T = any>(key: string): T | undefined {
        return this.data[key] as T | undefined;
    }

    /**
     * Removes a value by its key.
     * @param key - The key of the value to remove.
     */
    public remove(key: string): void {
        delete this.data[key];
    }

    /**
     * Checks if a key exists in the storage.
     * @param key - The key to check.
     * @returns True if the key exists, false otherwise.
     */
    public has(key: string): boolean {
        return this.data.hasOwnProperty(key);
    }

    /**
     * Returns all keys currently stored.
     * @returns An array of keys.
     */
    public keys(): string[] {
        return Object.keys(this.data);
    }

    /**
     * Clears all stored data.
     */
    public clear(): void {
        this.data = {};
    }

    /**
     * Returns a snapshot (shallow copy) of the current storage state.
     * @returns An object representing the stored key-value pairs.
     */
    public snapshot(): W3oMappingType {
        return { ...this.data };
    }
}
