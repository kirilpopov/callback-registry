# Intro

A simple registry for callbacks that allows you to add one or more callbacks
under some key and then execute all callbacks under some key.

Example:

```javascript
const registryFactory = require('callback-registry');

const registry = registryFactory();

// add a new callback for that event key
registry.add('event-key', function(){
    console.log('the event occurred')
});

// execute all callbacks that were registred for that key
registry.execute('event-key');
```

# Passing arguments
You can pass any arguments to the callbacks when you execute them

```javascript
// execute all callbacks that were registred for that key
registry.execute('event-key', arg1, arg2, arg3);
```

# Returning results
The _execute_ method returns an array with the results returned from the callbacks.

# Removing a callback
When you add a new callback a function is returned that can be used to unsubscribe

```javascript

// A callback that will be called just the first time
var unsubscribe = registry.add('event-key', function(){
    console.log('the event occurred');
    unsubscribe();
});

```
# Change log
* 2.7.2
    dependencies update
* 2.7.1
	fixed potentional memory leak
* 2.6.0
    added replayArgumentsArr that allows you to replay arguments to a new callback
* 2.5.0
    added clearKey method that removes a key from the registry
* 2.3.2
  * fix case where unsubscribe function removes all subscriptions with the same callback reference
* 2.1.1
  * return empty array as result if no subscribers
  * catch errors in user callbacks (returns undefined in the result if error)
