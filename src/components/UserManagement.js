import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import wykrzyknik from '../images/wykrzyknik.png';
import UsersTable from './UsersTable';
import LoadingSpinner from './LoadingSpinner';


const UserManagement = () => {

    const navigate = useNavigate()
    const { access, userRole } = useAuth()
    const [data, setData] = useState([]);
    const [key, setKey] = useState('all');
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)



    const listUsers = async () => {
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
                const url = `http://127.0.0.1:8000/auth/users/`
                const res = await axios.get(url, config);
                setData(res.data)
                console.log(res.data)
                setIsLoading(false)

            } catch (err) {
                setData(null)
                console.log(err)
                setIsLoading(false)
            }
        } else {
            setData(null)
            console.log("Blad")
        }
    };

    useEffect(() => {
        listUsers()
    }, [access])


    const adminData = data.filter(i => i.role === "admin")
    const salon_ownerData = data.filter(i => i.role === "salon_owner")
    const employeeData = data.filter(i => i.role === "employee")
    const customerData = data.filter(i => i.role === "customer")


    const keys = ["first_name", "last_name", "email"]

    // const searchFilteredServices = (data) => {
    //     return data.filter(item => (
    //         search.toLowerCase() === ''
    //             ? item
    //             : item.first_name.toLowerCase().includes(search)
    //             || item.last_name.toLowerCase().includes(search)
    //     ))
    // };

    const searchFilteredServices = (data) => {
        return data.filter(item => (
            keys.some((key) => item[key].toLowerCase().includes(search)))
        );
    };

    return (
        <div className='container'>
            {isLoading ?
                <LoadingSpinner/>
                :
                <>
                    <h2>Użytkownicy</h2>


                    <div className='row'>
                        <div className='col-md-6 mt-5 mb-4 text-start'>
                            <div className='search-bar'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Szukaj"
                                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                />
                            </div>
                        </div>
                        <div className='col-md-6 mt-5 mb-4 d-flex justify-content-end'>
                            <button
                                onClick={() => navigate(`/${userRole}/users/add/`)}
                                type='button'
                                className='btn btn-primary'
                            >
                                DODAJ UŻYTKOWNIKA
                            </button>
                        </div>
                    </div>

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="all" title="Wszyscy użytkownicy">
                            <UsersTable data={data} search={searchFilteredServices(data)} />
                        </Tab>
                        <Tab eventKey="admin" title="Adminstratorzy">
                            <UsersTable data={adminData} search={searchFilteredServices(adminData)} />
                        </Tab>
                        <Tab eventKey="salon_owner" title="Właściciele salonów">
                            <UsersTable data={salon_ownerData} search={searchFilteredServices(salon_ownerData)} />
                        </Tab>
                        <Tab eventKey="employee" title="Pracownicy">
                            <UsersTable data={employeeData} search={searchFilteredServices(employeeData)} />
                        </Tab>
                        <Tab eventKey="customer" title="Klienci">
                            <UsersTable data={customerData} search={searchFilteredServices(customerData)} />
                        </Tab>
                    </Tabs>
                </>
            }
        </div>
    )
};

export default UserManagement;
