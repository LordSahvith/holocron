'use strict';

/**********
 * Module *
 **********/
console.groupCollapsed('Module');

String.method(
  'deentityify',
  (function () {
    // the entity table maps entity names to characters
    const entity = {
      quot: '"',
      lt: '<',
      gt: '>',
      trade: '™',
    };

    // return the deentityify method
    return function () {
      /**
       * this is the deentityify method. it calls the string
       * replace method, looking for substrings that start
       * with '&' and end with ';'. if the characters in
       * between are in the entity table, then replace the
       * entity with the character from the table. it uses
       * regular expression (chapter 7).
       */
      return this.replace(/&([^&;]+);/g, function (a, b) {
        // console.log('a:', a);
        // console.log('b:', b);
        const r = entity[b];
        return typeof r === 'string' ? r : a;
      });
    };
  })()
);

console.log('module: ', '&lt;&quot;&gt;'.deentityify()); // <">
console.log('module: ', '&lt;&quot;&gt;&reg;'.deentityify()); // <">&reg;
console.log('module: ', '&lt;&quot;&gt;&reg;&trade;'.deentityify()); // <">&reg;™

const serial_maker = function () {
  /**
   * product an object that produces unique strings. A
   * unique string is made up of two parts: a prefix
   * and a sequence number. the object comes with
   * methods for setting the prefix and sequence
   * number, and a gensym method that produces unique
   * stings.
   */
  let prefix = '';
  let seq = 0;
  return {
    set_prefix: function (p) {
      prefix = String(p);
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function () {
      const result = prefix + seq;
      seq += 1;
      return result;
    },
  };
};

const seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
const uniqueArray = [];

for (let i = 0; i < 5; i++) {
  uniqueArray.push(seqer.gensym());
}

console.log('unique: ', uniqueArray); // ['Q1000', 'Q1001', 'Q1002', 'Q1003', 'Q1004']

console.groupEnd('Module');
