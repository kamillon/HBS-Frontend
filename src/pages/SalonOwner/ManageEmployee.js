import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';
import Sidebar from '../../components/Sidebar';
import UserManagement from '../../components/UserManagement';
import '../Admin/admin.css';

const ManageEmployee = () => {

    const navigate = useNavigate()
    const { access, currentUser, userRole } = useAuth()


    return (
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole}/>

                <div className="col-auto col-md-9 col-lg-10 main p-5">

                    {/* <div>
                    <p className="lead d-none d-sm-block">
                        Add Employee Details and Records
                    </p>
                    <h2>Witaj, {currentUser?.first_name} !</h2>
                    </div> */}

                    <div>
                        <UserManagement />
                    </div>
                </div>
            </div>
        </div>

    )
};


export default ManageEmployee;
