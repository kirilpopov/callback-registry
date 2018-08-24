import { CallbackRegistry, UnsubscribeFunction, Callback } from "./api";

function createRegistry(): CallbackRegistry {

    var callbacks: { [key: string]: Callback[] } = {};

    function add(key: string, callback: Callback): UnsubscribeFunction {
        var callbacksForKey = callbacks[key];

        if (!callbacksForKey) {
            callbacksForKey = [];
            callbacks[key] = callbacksForKey;
        }

        callbacksForKey.push(callback);

        // remove function
        return () => {
            // get a new view of the collection
            var allForKey = callbacks[key];
            if (!allForKey) {
                // someone might have called clear in between add and remove
                return;
            }
            allForKey = allForKey.reduce((acc, element, index) => {
                if (!(element === callback && acc.length === index)) {
                    acc.push(element);
                }
                return acc;
            }, []);
            callbacks[key] = allForKey;
        };
    }

    function execute(key: string, ...argumentsArr: any[]): object[] {
        var callbacksForKey = callbacks[key];
        if (!callbacksForKey || callbacksForKey.length === 0) {
            return [];
        }

        var results: object[] = [];
        callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, argumentsArr);
                results.push(result);
            } catch (err) {
                results.push({failed: true, error: err});
            }
        });

        return results;
    }

    function clear() {
        callbacks = {};
    }

    return {
        add: add,
        execute: execute,
        clear: clear
    };
};

(createRegistry as any).default = createRegistry;
export = createRegistry;
