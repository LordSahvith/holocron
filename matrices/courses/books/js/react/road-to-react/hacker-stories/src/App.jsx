import * as React from 'react';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordal Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 3,
    objectID: 1,
  },
];

const App = () => {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      {/* create instance of List */}
      <List />
      {/* create instance of List */}
      <List />
    </div>
  );
};

const Search = () => {
  const handleChange = (event) => {
    // synthetic event
    console.log(event);

    // value of target 
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
    </div>
  );
};

const List = () => {
  return (
    <ul>
      {list.map(item => {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> {item.author} </span>
            <span> {item.num_comments} </span>
            <span> {item.points} </span>
          </li>
        );
      })}
    </ul>
  );
};

export default App;
