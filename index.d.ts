/**
 * Factory method that creates a new callback registry instance
 */
declare function Factory(options?: InitOptions): CallbackRegistry;
export default Factory;

export interface CallbackRegistry {
    /**
     * Adds a new callback to the registry under some key.
     * The callback will be notified when someone executes.
     * The callback will be called with all replayArguments:
     * e.g. add('clientAdded', (name, age) => console.log(name, age), [['Alice', 25], ['Bob', 30]])
     * will invoke the callback with 'Alice', 25 and 'Bob', 30 *after* returning the unsubscribe function.
     * An example use case are events that need to call the provided callback with previous values (replay) and want to allow the callback to unsubscribe while replaying
     */
    add(key: string, callback: Callback, replayArgumentsArr?: any[] | Array<any[]>): UnsubscribeFunction;

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

    /**
     * Removes a specific key and its associated callbacks from the registry.
     */
    clearKey(key: string): void;
}

export interface Callback {
    (...args: any[]): any
}

export interface UnsubscribeFunction {
    (): void;
}

export type ErrorHandler = (err: Error) => void

export interface InitOptions {
    errorHandling: "log" | "silent" | "throw" | ErrorHandler;
}
