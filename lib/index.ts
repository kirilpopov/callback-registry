import { CallbackRegistry, UnsubscribeFunction, Callback, InitOptions, ErrorHandler } from "./api";

/**
 *
 * @param options "log" (default) | "silent" (the current) | "throw" (throw the error) | function - pass a function to be called on error
 */
function createRegistry(options: InitOptions): CallbackRegistry {
    if (options && options.errorHandling
        && typeof options.errorHandling !== "function"
        && options.errorHandling !== "log"
        && options.errorHandling !== "silent"
        && options.errorHandling !== "throw"
    ) {
        throw new Error(`Invalid options passed to createRegistry. Prop errorHandling should be ["log" | "silent" | "throw" | (err) => void], but ${typeof options.errorHandling} was passed`)
    }

    const _userErrorHandler: ErrorHandler = options && typeof options.errorHandling === "function" && options.errorHandling;

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
                results.push(undefined);
                _handleError(err, key);
            }
        });

        return results;
    }

    function _handleError(exceptionArtifact: any, key: string) {
        const errParam = exceptionArtifact instanceof Error ? exceptionArtifact : new Error(exceptionArtifact);

        if (_userErrorHandler) {
            _userErrorHandler(errParam);
            return;
        }

        const msg = `[ERROR] callback-registry: User callback for key "${key}" failed: ${errParam.stack}`;

        if (options) {
            switch (options.errorHandling) {
                case "log":
                    return console.error(msg);
                case "silent":
                    return;
                case "throw":
                    throw new Error(msg);
            }
        }

        console.error(msg);
    }

    function clear() {
        callbacks = {};
    }

    function clearKey(key: string) {
        var callbacksForKey = callbacks[key];

        if (!callbacksForKey) {
            return;
        }

        delete callbacks[key];
    }

    return {
        add: add,
        execute: execute,
        clear: clear,
        clearKey: clearKey
    };
};

(createRegistry as any).default = createRegistry;
export = createRegistry;
