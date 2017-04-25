module.exports = function () {
	"use strict";

	var callbacks = {};

	function add(key, callback) {
		var callbacksForKey = callbacks[key];

		if (!callbacksForKey) {
			callbacksForKey = [];
			callbacks[key] = callbacksForKey;
		}

		callbacksForKey.push(callback);

		// remove function
		return function(){
		    // get a new view of the collection(
            var allForKey = callbacks[key];
            allForKey = allForKey.filter(function(item){
                return item !== callback;
            });
            callbacks[key] = allForKey;
		};
	}

	function execute(key) {
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
