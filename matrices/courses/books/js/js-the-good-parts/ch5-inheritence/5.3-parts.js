'use strict';

/*********
 * Parts *
 *********/
console.groupCollapsed('Parts');

const eventuality = function (that) {
  const registry = {};

  that.fire = function (event) {
    /**
     * Fire an even on an object. the event can be either
     * a string contaning a type property containing the
     * name of the event. handlers registered by the 'on'
     * method that match the event name will be invoked
     */
    let array;
    let func;
    let handler;
    let i;
    let type = typeof event === 'string' ? event : event.type;

    // if an array of handlers exist for this event, then
    // loop thorugh it and execute the handlers in order.
    if (registry.hasOwnProperty(type)) {
      array = registry[type];
      for (i = 0; array.length; i++) {
        handler = array[i];

        /**
         * A handler record contains a method and an optional
         * array of parameters. if the method is a name, look
         * up the function
         */
        func = handler.method;
        if (typeof func === 'string') {
          func = this[func];
        }

        /**
         * invoke a handler. if the record conatined 
         * parameters, then pass them. Otherwise, pass
         * the event object.
         */
        func.apply(this, handler.parameters || [event]);
      }
    }
    return this;
  };

  that.on = function (type, method, parameters) {
    /**
     * Register an event. Make a handler record. Put it
     * in a handler array, making one if it doesn't yet
     * exist for this type
     */
    const handler = {
      method: method,
      parameters: parameters
    };

    if (registry.hasOwnProperty(type)) {
      registry[type].push(handler);
    } else {
      registry[type] = [handler];
    }
    return this;
  };
  return that;
};

const partsObj = {
  test: true,
  name: 'savith'
};

eventuality(partsObj)

console.log('parts:', partsObj);

console.groupEnd('Parts');
