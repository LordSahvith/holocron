'use strict';

/*****************
 * RegEx Exmaple *
 *****************/
console.groupCollapsed('RegEx Exmaple');

// checks for follow url: {scheme}{slash}{host}{port}{path}{query}{hash}
// {scheme}   {slash}   {host}   {port}          {path}         {query}      {hash}
//   https  :   //    localhost : 8080  /  js-the-good-parts ? ch7-regex  #regexExample
const parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
const url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#syntax';

const result = parse_url.exec(url);
console.log('parse_url result:', result);

const urlNames = ['url', 'shceme', 'slash', 'host', 'port', 'path', 'query', 'hash'];

let blanks = '     ';

for (let i = 0; i < urlNames.length; i++) {
  console.log(`${urlNames[i]}: ${blanks.substring(urlNames[i].length), result[i]}`);
}

/**
 * url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#syntax
 * shceme: https
 * slash: //
 * host: developer.mozilla.org
 * port: undefined
 * path: en-US/docs/Web/JavaScript/Reference/Statements/for...in
 * query: undefined
 * hash: syntax
 */

console.groupEnd('RegEx Exmaple');
