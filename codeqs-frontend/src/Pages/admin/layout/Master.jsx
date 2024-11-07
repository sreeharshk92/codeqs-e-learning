import { Link } from 'react-router-dom';
import './master.css';

export default function Master() {
    return (
        <nav className="master-nav">
            <h1 className='master-h1'>Admin Dashboard</h1>
            <div className="master-nav-links">
                <Link to="/admin-dashboard" className="master-nav-link">Dashboard</Link>
                <Link to="/" className="master-nav-link">Home</Link>
            </div>
        </nav>
    );
}