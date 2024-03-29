import React from 'react';
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import '../../../pages/Admin/admin.css';
import SalonsManagement from './SalonsManagement';

const Salons = () => {
    const { userRole } = useAuth()

    return (
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole} />
                <div className="col-auto col-md-9 col-lg-10 main p-5">
                    <div>
                        <SalonsManagement />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Salons;