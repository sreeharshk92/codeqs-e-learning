import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import "./leftmenu.css"; 
const LeftMenu = () => {

    return (
        <nav className="left-menu">
            <ul className="nav nav-pills nav-sidebar flex-column" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to="/admin-dashboard" className="nav-link">
                        <FontAwesomeIcon icon={faTh} className="nav-icon" />
                        <p className="menu-item-text">
                            Admin Profile
                            {/* <span className="right badge badge-danger">New</span> */}
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin-courses" className="nav-link">
                        <FontAwesomeIcon icon={faTh} className="nav-icon" />
                        <p className="menu-item-text">
                            Add New Course
                            {/* <span className="right badge badge-danger">New</span> */}
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/courselist" className="nav-link">
                        <FontAwesomeIcon icon={faTh} className="nav-icon" />
                        <p className="menu-item-text">
                            Course List
                            {/* <span className="right badge badge-danger">New</span> */}
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/userslist" className="nav-link" onClick={() => localStorage.removeItem('userRole')}>
                        <FontAwesomeIcon icon={faTh} className="nav-icon" />
                        <p className="menu-item-text">
                            Users
                            {/* <span className="right badge badge-danger">New</span> */}
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/paymentslist" className="nav-link" onClick={() => localStorage.removeItem('userRole')}>
                        <FontAwesomeIcon icon={faTh} className="nav-icon" />
                        <p className="menu-item-text">
                            Payments List
                            {/* <span className="right badge badge-danger">New</span> */}
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={() => localStorage.removeItem('userRole')}>
                        <FontAwesomeIcon icon={faTh} className="nav-icon" />
                        <p className="menu-item-text">
                            Logout
                            {/* <span className="right badge badge-danger">New</span> */}
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default LeftMenu;