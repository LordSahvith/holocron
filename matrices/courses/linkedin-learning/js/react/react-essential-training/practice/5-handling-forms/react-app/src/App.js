import './App.css';
import { useState } from 'react';

function App() {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#000000');

    const submit = (e) => {
        e.preventDefault();
        alert(`${title}, ${color}`);
        setTitle('');
        setColor('#000000');
    };

    return (
        <div className="App">
            <form onSubmit={submit}>
                <input
                    value={title}
                    type="text"
                    placeholder="color title..."
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                />
                <input
                    value={color}
                    type="color"
                    onChange={(event) => {
                        setColor(event.target.value)
                    }}
                />
                <button>ADD</button>
            </form>
        </div>
    );
}

export default App;
