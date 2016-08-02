# callback-registry
Registry for callbacks

A simple registry that allows you to add one or more callbacks, where each callback is added with some key and then execute all callbacks by just using the key.

Similar to EventEmitter but not limited to Node.js.

```javascript

const callbackRegistry = require('callback-registry');
const registry = callbackRegistry();

// add a new callback for that event key
registry.add('event-key', function(){
    console.log('the event occurred')
});

registry.execute('event-key');

```
