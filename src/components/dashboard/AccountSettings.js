import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '../../pages/Admin/admin.css';
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditAccount from './EditAccount';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';


const AccountSettings = () => {   
    const { access, userRole, currentUser } = useAuth()


    const [data, setData] = useState([]);
    const [accountUpdated, setAccountUpdated] = useState(false);

    const { email } = data;

    useEffect(() => {
        const getUser = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {

                    const res = await axios.get(`http://127.0.0.1:8000/auth/users/me/`, config);

                    setData(res.data)
                    console.log(res.data)

                } catch (err) {
                    setData(null)
                    console.log(err)
                }
            } else {
                setData(null)
                console.log("Blad")
            }
        };

        getUser()
    }, [access, userRole])



    return(
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole} />

                <div className="col-auto col-md-9 col-lg-10 main p-5">

                    {/* <p className="lead d-none d-sm-block">Add Employee Details and Records</p>
                    <h2>Witaj, {currentUser?.first_name} !</h2>
                    <p>EmployeeDashboard</p>

                    <div className="row mb-3">
                        <div className="col-sm-6 col-md-12 py-2">
                            <p>Ustawienia profilu</p>
                            <p>Tu zobaczysz podsumowanie swojego profilu</p>
                        </div>
                    </div> */}

                    <div className="row">
                        <div className="col-md-8">
                            <h2>Account Settings</h2>
                            {/* <p>Witaj, {currentUser.first_name} {currentUser.last_name} !</p> */}
                            <EditAccount/>
                        </div>
                        <div className="col-md-4">
                            <ChangePassword dataUser={data}/>
                            <ChangeEmail dataUser={data}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)};

export default AccountSettings;