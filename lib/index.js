module.exports = function () {
	"use strict";

	var callbacks = {};

	function add(key, callback) {
		var callbacksForKey = callbacks[key];

		if (!callbacksForKey) {
			callbacksForKey = [];
			callbacks[key] = callbacksForKey;
		}

		var newLen = callbacksForKey.push(callback);
		var itemIndex = newLen - 1;

		// remove function
		return function(){
			callbacksForKey = callbacksForKey.filter(function(item){
                return item !== callback;
			});
			callbacks[key] = callbacksForKey;
		};
	}

	function execute(key, argumentsArr) {
		var callbacksForKey = callbacks[key];
		if (!callbacksForKey || callbacksForKey.length === 0){
			return [];
		}

		var args = [].splice.call(arguments, 1);
		var results = [];
		callbacksForKey.forEach(function (callback) {
            try {
                var result = callback.apply(undefined, args);
                results.push(result);
            } catch (err) {
                results.push(undefined);
            }
        });

		return results;
	}

	return {
		add: add,
		execute: execute
	};
};
