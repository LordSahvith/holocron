const sortNumbersFunc = (a, b) => {
  return a - b;
};

const sortMultiFunc = (a, b) => {
  if (a === b) {
    return 0;
  }

  if (typeof a === typeof b) {
    return a < b ? -1 : 1;
  }

  // these aren't necessary by any means
  // my VS Code was complaining about using
  // return typeof a < typeof b ? -1 : 1; 
  // it may not have liked 2 reserved words
  // in the same statement
  const typeA = typeof a;
  const typeB = typeof b;

  return typeA < typeB ? -1 : 1;
};

const by = (name) => {
  return (o, p) => {
    let a;
    let b;

    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name];
      b = p[name];

      if (a === b) {
        return 0;
      }

      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }

      const typeA = typeof a;
      const typeB = typeof b;

      return typeA < typeB ? -1 : 1;
    } else {
      throw {
        name: 'Error',
        message: 'Expected an object when sorting by ' + name
      };
    }
  };
};