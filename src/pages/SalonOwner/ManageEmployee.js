import React from 'react';
import { useAuth } from "../../context/AuthContext"
import Sidebar from '../../components/Sidebar';
import '../Admin/admin.css';
import EmployeesManagement from '../../components/dashboard/EmployeesManagement';

const ManageEmployee = () => {
    const { userRole } = useAuth()

    return (
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole} />
                <div className="col-auto col-md-9 col-lg-10 main p-5">
                    <div>
                        <EmployeesManagement />
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ManageEmployee;
