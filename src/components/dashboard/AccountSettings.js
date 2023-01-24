import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '../../pages/Admin/admin.css';
import { useAuth } from "../../context/AuthContext"
import axios from 'axios';
import EditAccount from './EditAccount';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import LoadingSpinner from '../LoadingSpinner';

const AccountSettings = () => {
    const { access, userRole } = useAuth()
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true)
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
                    setIsLoading(false)

                } catch (err) {
                    setData(null)
                    console.log(err)
                    setIsLoading(false)
                }
            } else {
                setData(null)
                console.log("Blad")
                setIsLoading(false)
            }
        };

        getUser()
    }, [access, userRole])


    return (
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left full-screen">
                <Sidebar role={userRole} />
                <div className="col-auto col-md-9 col-lg-10 main p-5">
                    {isLoading ?
                        <div className='mt-5'>
                            <LoadingSpinner text={"Loading..."} />
                        </div>
                        :
                        <>
                            <div className='container'>
                                <div className='p-4 bg-dark text-white'>
                                    <div className="row align-items-end">
                                        <div className="col-md-6">
                                            <h2>Ustawienia konta</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8">
                                        <EditAccount />
                                    </div>
                                    <div className="col-lg-4">
                                        <ChangePassword dataUser={data} />
                                        <ChangeEmail dataUser={data} />
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
};

export default AccountSettings;