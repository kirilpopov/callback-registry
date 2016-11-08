# Intro

A simple registry for callbacks that allows you to add one or more callbacks
under some key and then execute all by just using the key.

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
The _execute_ method returns an array with the reuslts retuned from the callbacks.

# Removing a callback
When you add a new callback a function is returned that can be used to unsubscribe

```javascript

// A callback that will be called just the first time
var unsubscribe = registry.add('event-key', function(){
    console.log('the event occurred');
    unsubscribe();
});

```
