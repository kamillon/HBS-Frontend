import React from 'react';
import { useAuth } from "../../context/AuthContext"
import Sidebar from '../../components/Sidebar';
import UserManagement from '../../components/UserManagement';
import './admin.css';

const ManageUsers = () => {
    const { userRole } = useAuth()

    return (
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole} />
                <div className="col-auto col-md-9 col-lg-10 main p-5">
                    <div>
                        <UserManagement />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ManageUsers;
