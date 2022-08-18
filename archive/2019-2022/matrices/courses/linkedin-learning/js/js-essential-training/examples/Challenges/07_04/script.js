/**
 * Challenge: Build and modify an array
 * - Build an array with 8 items
 * - Remove the last item
 * - Add the last item as the first item on the array 
 * - Sort the items by alphabetical order
 * - Use the find() method to find a specific item in the array
 * - Remove the item you found using the find method from the array.
 */

// create array with 8 items
let collection = ['jedi', 66, 'execute', 'sith', 'anakin', 'obi-wan', 'yoda', 'lightsaber'];

console.log('collection: ', collection);

// remove the last item
collection.pop();

console.log('new collection: ', collection);

// remove last item
// add to first index
collection.unshift(collection.pop());

console.log('new collection: ', collection);

// sort alphabetically
collection.sort();

console.log('sorted collection: ', collection);

// find item in array and save to var
let item = collection.find(function(item) {
    if (item == 'yoda') {
        return item;
    }
});

console.log('item found: ', item);

// remove item by getting indexOf to get it's location
collection.splice(collection.indexOf(item), 1);

console.log(`item removed ${item}: new collection: ${collection}`);
