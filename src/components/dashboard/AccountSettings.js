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


    return (
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole} />
                <div className="col-auto col-md-9 col-lg-10 main p-5">
                    <div className="row">
                        <div className='col-12'>
                            <h2 className='ms-5'>Ustawienia konta</h2>
                        </div>
                        <div className="col-lg-8">
                            <EditAccount />
                        </div>
                        <div className="col-lg-4">
                            <ChangePassword dataUser={data} />
                            <ChangeEmail dataUser={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AccountSettings;