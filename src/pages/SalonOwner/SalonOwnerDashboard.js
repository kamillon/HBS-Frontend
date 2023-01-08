import React from 'react';
import Sidebar from '../../components/Sidebar';
import '../Admin/admin.css';
import { useAuth } from "../../context/AuthContext"
import DashboardCard from '../../components/dashboard/DashboardCard';

const SalonOwnerDashboard = () => {
    const { userRole, currentUser } = useAuth()

    return (
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole} />
                <div className="col-auto col-md-9 col-lg-10 main p-5">
                    <div className='row'>
                        <h2>Dashboard</h2>
                        <h5 className='text-secondary'>Witaj, {currentUser?.first_name} !</h5>
                    </div>
                    <div className='row mt-2'>
                        <DashboardCard
                            path={"employee/"}
                            text={"Pracownicy"}
                            className={"bi bi-people fs-1"}
                        />

                        <DashboardCard
                            path={"salons/"}
                            text={"Salony"}
                            className={"bi bi-building fs-1"}
                        />

                        <DashboardCard
                            path={"services/"}
                            text={"Usługi"}
                            className={"bi bi-scissors fs-1"}
                        />
                        <DashboardCard
                            path={"reservations/"}
                            text={"Rezerwacje"}
                            className={"bi bi-calendar-check-fill fs-1"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SalonOwnerDashboard;