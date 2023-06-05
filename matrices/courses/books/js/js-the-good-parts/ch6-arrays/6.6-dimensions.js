'use strict';

/**************
 * Dimensions *
 **************/
console.groupCollapsed('Dimensions');

Array.dim = function (dimension, initial) {
  const a = [];

  for (let i = 0; i < dimension; i++) {
    a[i] = initial;
  }

  return a;
};

// make an array with 10 zeros
const myArrayDimension = Array.dim(10, 0);
console.log('my array dimension:', myArrayDimension); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// array within an array
const matrixEx = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log('matrixEx:', matrixEx[1][2]); // 6

Array.matrix = function (m, n, initial) {
  let a, i, j;
  const mat = [];
  for (i = 0; i < m; i++) {
    a = [];
    for (j = 0; j < n; j++) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};

// make a 4 x 4 matrix filled with zeros
let myMatrix = Array.matrix(4, 4, 0);
console.log('my matrix:', myMatrix); // [Array(4), Array(4), Array(4), Array(4)]
console.log('my matrix retrieve:', myMatrix[3][3]); // 0

// method to make an identity matrix
Array.identity = function (n) {
  let i;
  const mat = Array.matrix(n, n, 0);
  for (i = 0; i < n; i++) {
    mat[i][i] = 1;
  }
  return mat;
};

myMatrix = Array.identity(4);
console.log('my matrix retrieve:', myMatrix[3][3]); // 1

console.groupEnd('Dimensions');
