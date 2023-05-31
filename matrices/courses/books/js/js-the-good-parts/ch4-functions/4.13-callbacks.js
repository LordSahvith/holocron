'use strict';

/*************
 * Callbacks *
 *************/
console.groupCollapsed('Callbacks');

const apiURL = 'https://pokeapi.co/api/v2/pokemon/charmander';
const response = fetch(apiURL)
  .then(blob => blob.json())
  .then(json => console.log('ch4.13 - callback (async): ', json)) // {abilities: Array(2), base_experience: 62, forms: Array(1), game_indices: Array(20), height: 6, …}
  .catch(e => console.log(e.message));

console.log('no callback (sync): ', response); // in frozen state. response pending since it did not wait for server response

console.groupEnd('Callbacks');
