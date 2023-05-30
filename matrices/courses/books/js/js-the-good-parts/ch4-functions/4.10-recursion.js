'use strict';

/*************
 * Recursion *
 *************/
console.groupCollapsed('Recursion');

const hanoi = function hanoi(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log(`Move disc ${disc} from ${src} to ${dst}`);
    hanoi(disc - 1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');

/**
 * Defines a function that visits every
 * node of the tree in HTML source order,
 * starting from some given node. It invokes
 * a function, passing it each node in turn.
 * walk_the_DOM calss itself to process each
 * of the child nodes
 */
const walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

/**
 * Takes an attributre name string and an optional
 * matching value. It calls walk_the_DOM, passing it
 * a function that looks for an attribute name in the
 * node. The matching nodes are accumulated in a
 * results array
 */
const getElementsByAttribute = function (att, value) {
  const results = [];

  walk_the_DOM(document.body, function (node) {
    const actual = node.nodeType === 1 && node.getAttribute(att); // returns string if present, otherwise false
    if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
      // || typeof value handles optional parameter
      console.log('node: ', node); // matching node
      console.log('actual: ', actual); // attribute's value
      results.push(node);
    }
  });

  return results;
};

console.log('data-test: ', getElementsByAttribute('data-test', 'in control')); // [h1.heading1]
console.log('class: ', getElementsByAttribute('class')); // [h1.heading1, p.paragraph, p.paragraph.two]
console.log('class two: ', getElementsByAttribute('class', 'paragraph two')); // [p.paragraph.two]

const classes = getElementsByAttribute('class');
console.log('retrieve value: ', classes[2].getAttribute('class')); // paragraph two

const factorial = function factorial(i, a) {
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i - 1, a * i);
};

console.log('js does not support tail recursion: ', factorial(4)); // 24

console.groupEnd('Recursion');
