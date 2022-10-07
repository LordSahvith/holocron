import './App.css';
import { useState, useEffect } from 'react';
import { useReducer } from 'react';

function App() {
    const [emotion, setEmotion] = useState('happy');
    const [secondary, setSecondary] = useState('tired');

    useEffect(() => {
        console.log(`It's ${emotion} right now`);
    }, [emotion]); // dependency array defines when this should run

    useEffect(() => {
        console.log(`It's ${secondary} right now`);
    }, [secondary]);

    const [checked, setChecked] = useReducer((checked) => !checked, false);

    return (
        <div className="App">
            <h1>Current emotion is {emotion}</h1>
            <button onClick={() => setEmotion('sad')}>Sad</button>
            <button onClick={() => setEmotion('excited')}>Excited</button>

            <h2>Current secondary emotion is {secondary}.</h2>
            <button onClick={() => setSecondary('grateful')}>Grateful</button>
            <button onClick={() => setSecondary('tired')}>Tired</button>

            <div>
                <input
                    id="check"
                    type="checkbox"
                    value={checked}
                    onChange={setChecked}
                />
                <label htmlFor="check">
                    {checked ? 'checked' : 'not checked'}
                </label>
            </div>
        </div>
    );
}

export default App;
