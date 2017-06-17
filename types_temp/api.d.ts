declare function Factory(): CallbackRegistry;
export default Factory;
export interface CallbackRegistry {
    add(key: string, callback: Callback): UnsubscribeFunction;
    execute(key: string, ...argumentsArr: any[]): object[];
}
export interface Callback {
    (...args: any[]): any;
}
export interface UnsubscribeFunction {
    (): void;
}
