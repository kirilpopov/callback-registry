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
				item != callback;
			});
			callbacks[key] = callbacksForKey;
		};
	}

	function execute(key, argumentsArr) {
		var callbacksForKey = callbacks[key];
		if (!callbacksForKey || callbacksForKey.length === 0){
			return;
		}

		var args = [].splice.call(arguments, 1);

		callbacksForKey.forEach(function (callback) {
			callback.apply(undefined, args);
		});
	}

	return {
		add: add,
		execute: execute
	};
};
