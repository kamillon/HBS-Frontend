import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import wykrzyknik from '../images/wykrzyknik.png';
import UsersTable from './UsersTable';


const UserManagement = () => {

    const navigate = useNavigate()
    const { access, userRole } = useAuth()
    const [data, setData] = useState([]);
    const [key, setKey] = useState('all');


    const listUsers = async () => {
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

            } catch (err) {
                setData(null)
                console.log(err)
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


    return (
        <div className='container'>
            <h2>Użytkownicy</h2>
            <button
                onClick={() => navigate(`/${userRole}/users/add/`)}
                type='button'
                className='btn btn-primary mt-5 mb-3'
            >
                DODAJ UŻYTKOWNIKA
            </button>

            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="all" title="Wszyscy użytkownicy">
                    <UsersTable data={data} />
                </Tab>
                <Tab eventKey="admin" title="Adminstratorzy">
                    <UsersTable data={adminData} />
                </Tab>
                <Tab eventKey="salon_owner" title="Właściciele salonów">
                    <UsersTable data={salon_ownerData} />
                </Tab>
                <Tab eventKey="employee" title="Pracownicy">
                    <UsersTable data={employeeData} />
                </Tab>
                <Tab eventKey="customer" title="Klienci">
                    <UsersTable data={customerData} />
                </Tab>
            </Tabs>
        </div>
    )
};

export default UserManagement;
