import './App.css';
import { Link, Outlet } from 'react-router-dom';

function CreateNav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/about/history">History</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

function Home() {
    return (
        <div>
            <CreateNav />
            <h1>My Website</h1>
        </div>
    );
}

export function About() {
    return (
        <div>
            <CreateNav />
            <h1>About Us</h1>
            <Outlet />
        </div>
    );
}

export function Contact() {
    return (
        <div>
            <CreateNav />
            <h1>Contact Us</h1>
        </div>
    );
}

export function History() {
    return (
        <div>
            <h1>Our History</h1>
        </div>
    );
}

export function App() {
    return <Home />;
}
