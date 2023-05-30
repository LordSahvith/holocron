'use strict';

/***************
 * Memoization *
 ***************/
console.groupCollapsed('Memoization');

let counterNoMemo = 0;
const fibonacciNoMemo = function (n) {
  counterNoMemo++;
  return n < 2 ? n : fibonacciNoMemo(n - 1) + fibonacciNoMemo(n - 2);
};

for (let i = 0; i <= 10; i++) {
  console.log(`${i}: ${fibonacciNoMemo(i)}`);
}
console.log('counter no memo: ', counterNoMemo); // 453

let counterMemo = 0;
const fibonacciMemo = (function () {
  let memo = [0, 1];
  const fib = function (n) {
    counterMemo++;
    let result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
})();

for (let i = 0; i <= 10; i++) {
  console.log(`${i}: ${fibonacciMemo(i)}`);
}
console.log('counter memo: ', counterMemo); // 29

let counterFib = 0;
const followingN = [];
const fibonacciArray = [];

const memoizer = function (memo, formula) {
  const recur = function (n) {
    counterFib++;
    followingN.push(n);
    console.log('n: ', n);
    let result = memo[n]; // memo is in a closure and can still be updated
    if (typeof result !== 'number') {
      result = formula(recur, n); // pass recur function and current iteration (n) back to the initial formula function
      memo[n] = result; // updated here
    }
    console.log('result: ', result);
    fibonacciArray.push(result);
    return result;
  };
  return recur;
};

const fibonacci = memoizer([0, 1], function (recur, n) {
  // recur and n come from line 718
  return recur(n - 1) + recur(n - 2); // get the 2 previous numbers and add them
});

const fibonacciSeq = [];
for (let i = 0; i <= 10; i++) {
  const result = fibonacci(i);
  fibonacciSeq.push(result);
  console.log(`${i}: ${result}`);
}
console.log('counter memoizer: ', counterFib); // 29
console.log('followingN: ', followingN); // (29) [0, 1, 2, 1, 0, 3, 2, 1, 4, 3, 2, 5, 4, 3, 6, 5, 4, 7, 6, 5, 8, 7, 6, 9, 8, 7, 10, 9, 8]
console.log('fibonacci array:', fibonacciArray); // (29) [0, 1, 1, 0, 1, 1, 1, 2, 2, 1, 3, 3, 2, 5, 5, 3, 8, 8, 5, 13, 13, 8, 21, 21, 13, 34, 34, 21, 55]
console.log('fibonacci seq:', fibonacciSeq); // (11) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

const factorialMemo = memoizer([1, 1], function (recur, n) {
  return n * recur(n - 1);
});

const factorialSeq = [];
for (let i = 0; i <= 10; i++) {
  const result = factorialMemo(i);
  factorialSeq.push(result);
  console.log(`${i}: ${result}`);
}
console.log('counter memoizer: ', counterFib); // 49
console.log('followingN: ', followingN); // (49) [0, 1, 2, 1, 0, 3, 2, 1, 4, 3, 2, 5, 4, 3, 6, 5, 4, 7, 6, 5, 8, 7, 6, 9, 8, 7, 10, 9, 8, 0, 1, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9]
console.log('factorial array:', fibonacciArray); // (49) [0, 1, 1, 0, 1, 1, 1, 2, 2, 1, 3, 3, 2, 5, 5, 3, 8, 8, 5, 13, 13, 8, 21, 21, 13, 34, 34, 21, 55, 1, 1, 1, 2, 2, 6, 6, 24, 24, 120, 120, 720, 720, 5040, 5040, 40320, 40320, 362880, 362880, 3628800]
console.log('factorial seq:', factorialSeq); // (11) [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]

console.groupEnd('Memoization');
