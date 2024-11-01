import { Link } from 'react-router-dom';
import '../master.css';

export default function Master() {
    return (
        <nav className="master-nav">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                        <i className="nav-icon fas fa-tachometer-alt"></i>
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className="nav-link">
                        <i className="nav-icon fas fa-users"></i>
                        <p>Users</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
