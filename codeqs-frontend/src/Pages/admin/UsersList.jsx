import DefaultAdminLayout from './layout/DefaultAdminLayout';

import './Userslist.css';

const UsersList = () => {
    return (
        <DefaultAdminLayout>
        <div className="user-dashboard-wrapper">
            <div className="user-dashboard-body">
                <div className="user-dashboard-content">
                    <p>Welcome to your user dashboard!</p>
                </div>
            </div>
        </div>
        </DefaultAdminLayout>
    );
};

export default UsersList;
