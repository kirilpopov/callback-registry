export interface UnsubscribeFunction {
    (): void;
}

export interface CallbackRegistry {
    /**
     * Adds a new callback to the registry under some key.
     * The callback will be notified when someone executes
     */
    add(key: string, callback: (...args: any[]) => any): UnsubscribeFunction;

    /**
     * Executes all callbacks registered for a certain key.
     * Optional arguments can be supplied - these will reach
     * callbacks
     */
    execute(key: string, ...argumentsArr: any[]): object[];
}

export default function(): CallbackRegistry;
