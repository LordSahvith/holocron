import './App.css';

const [firstCity, bob] = ['Tokyo', 'London', 'Rome'];

console.log(firstCity);
console.log(bob);

function App({library}) {
  return (
    <div className="App">
        <h1>Hello from {library}!</h1>
    </div>
  );
}

export default App;
