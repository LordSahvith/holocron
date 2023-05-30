'use strict';

/********************
 * Augmenting Types *
 ********************/
console.groupCollapsed('Augmenting Types');

Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

Number.method('integer', function () {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

console.log((-10 / 3).integer()); // -3
console.log((10 / -3).integer()); // -3
console.log((10 / 3).integer()); // 3
console.log((10).integer()); // 10
console.log((10 * 4).integer()); // 40

String.method('trim', function () {
  return this.replace(/^\s+|\s+$/g, '');
});

console.log(' neat '.trim(), ''); // neat

// conditionally set the method of it's not there
// this helps prevent cross library discrepancies
Function.prototype.method2 = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
};

console.groupEnd('Augmenting Types');
