const savior = 'Batman';

let count = 0;

const increment = () => ++count; 
const decrement = () => --count; 

const getCount = () => count;

module.exports = {
    savior,
    increment,
    decrement,
    getCount
};