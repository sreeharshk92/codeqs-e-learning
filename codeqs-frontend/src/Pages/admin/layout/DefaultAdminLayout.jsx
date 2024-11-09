import Master from './Master';
import LeftMenu from './Leftmenu';
import './DefaultAdminLayout.css';

// eslint-disable-next-line react/prop-types
const DefaultAdminLayout = ({ children }) => {
    return (
        <div className="default-layout">
            <Master />
            <div className="layout-body">
                <LeftMenu />
                <div className="layout-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultAdminLayout;