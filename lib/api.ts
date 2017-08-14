/**
 * Factory method that creates a new callback registry instance
 */
declare function Factory(): CallbackRegistry;
export default Factory;

export interface CallbackRegistry {
    /**
     * Adds a new callback to the registry under some key.
     * The callback will be notified when someone executes
     */
    add(key: string, callback: Callback): UnsubscribeFunction;

    /**
     * Executes all callbacks registered for a certain key.
     * Optional arguments can be supplied - these will reach
     * callbacks
     */
    execute(key: string, ...argumentsArr: any[]): object[];

    /**
     * Removes all keys and callbacks from the registry.
     * Useful when cleaning up your components
     */
    clear(): void;
}

export interface Callback {
    (...args: any[]): any
}

export interface UnsubscribeFunction {
    (): void;
}
