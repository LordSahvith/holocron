/**
 * Practice: Pass values between functions
 *
 * - Create two functions
 * - Main function creates article element with data from object
 * - Helper function creates.
 */

// traditional funciton
function traditionalFunction() {
    console.log('traditionalFunction()');
    document.querySelector('main').style.height = '100vh';
    document.querySelector('main').style.background = 'red';

    functionExpression();
}

// function expression
const functionExpression = () => {
    console.log('functionExpression() with arrowFunction()');
};

// ran as soon as it's encountered
(() => {
    console.log('instantFunction()');
})();

traditionalFunction();