import './App.css';
import { useState, useEffect } from 'react';

function GithubUser({ name, avatar }) {
    return (
        <div>
            <h1>{name}</h1>
            <img src={avatar} height="150" alt={name} />
        </div>
    );
}

function App() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('https://api.github.com/users/LordSahvith')
            .then((response) => response.json())
            .then(setData);
    }, []);

    if (data) {
        return (
            <GithubUser
                name={data.login}
                avatar={data.avatar_url}
            />
        )
    }

    return <h1>Data</h1>;
}

export default App;
