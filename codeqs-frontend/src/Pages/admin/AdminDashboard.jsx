import DefaultAdminLayout from './layout/DefaultAdminLayout';

import { Link,useNavigate } from 'react-router-dom';

// import Course from './adminCourse';
import './AdminDashboard.css';

const AdminDashboard = () =>{
    const navigate = useNavigate();
    const adminName = localStorage.getItem('userName') || 'Admin';
    const adminemail = localStorage.getItem('userEmail') || 'admin email';
    const handleLogout = () => {
        localStorage.removeItem('userRole'); // Remove user role
        navigate('/login'); // Redirect to login
    };
    return (
        <DefaultAdminLayout>
        <div className="admin-dashboard-container">
            
            <div className="dashboard-body">
                
                <div className="dashboard-content">
                    <div className="dashboard-header">
                        <p>Welcome to the admin dashboard!</p>
                    </div>
                    <div className="profile-section">
                        <div className="profile-info">
                            <img src="path/to/profile.jpg" alt="Profile" className="profile-pic" />
                            <div className="admin-details">
                                <h2>{adminName}</h2>
                                <p>{adminemail}</p>
                                <div className="admin-btns">
                                   <button onClick={handleLogout}  className="logout-btn">Logout</button>
                                   <button  className="logout-btn">Edit</button>
                                  </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to="/admin-courses" className="add-course-btn">
                                 Add New Courses
                        </Link>
                        <Link to="/courselist" className="add-course-btn">
                                Course List
                        </Link>
                        <Link to="/userslist" className="add-course-btn">
                                  Registered Users
                        </Link>
                        <Link to="/userslist" className="add-course-btn">
                                  Payment Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </DefaultAdminLayout>
    );
};

export default AdminDashboard;
