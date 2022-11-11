import React from 'react';
import Sidebar from '../../components/Sidebar';
import '../Admin/admin.css';
import { useAuth } from "../../context/AuthContext"

const SalonOwnerDashboard = () => {
    const { userRole, currentUser } = useAuth()
    
    return (
        // <div className='container'>
        //     <h1>SalonOwnerDashboard</h1>
        // </div>
        // <div className="container-fluid h-100" id="main">
        //     <div className="row row-offcanvas row-offcanvas-left h-100">
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole} />

                <div className="col-auto col-md-9 col-lg-10 main p-5">

                    <p className="lead d-none d-sm-block">Add Employee Details and Records</p>
                    <h2>Witaj, {currentUser?.first_name} !</h2>
                    <p>SalonOwnerDashboard</p>

                    <div className="row mb-3">
                        <div className="col-sm-6 col-md-12 py-2">
                            <p>Strona profilu</p>
                            <p>Tu zobaczysz podsumowanie swojego profilu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SalonOwnerDashboard;