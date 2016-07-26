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

		// callback id is formed as <item-index>_<key>, we use that id to remove the callback 
		return itemIndex + '_' + key;
	}

	function remove(callbackId) {
		var parts = callbackId.split('_');
		if (parts.length !== 2) {
			return false;
		}

		var index = parts[0];
		var key = parts[1];
		
		var callbackArray = callbacks[key];
		if (!callbackArray || callbackArray.length === 0) {
			return false;
		}

		delete callbackArray[index];
		return true;
	}

	function execute(key, argumentsArr, context) {
		var callbacksForKey = callbacks[key];
		if (!callbacksForKey || callbacksForKey.length === 0){
			return;
		}

		callbacksForKey.forEach(function (callback) {
			callback.apply(context, argumentsArr);
		});
	}

	return {
		add: add,
		remove: remove,
		execute: execute
	};
};
