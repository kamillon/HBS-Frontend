import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const EditAccount = () => {

    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()


    const initialState = {
        username: '',
        first_name: '',
        last_name: '',
        is_staff: '',
        is_superuser: '',
        is_employee: '',
        email: '',
        phone: '',
        role: '',
    };

    const [data, setData] = useState(initialState);

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





    const [accountUpdated, setAccountUpdated] = useState(false);



    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, phone, role } = data;



    function onChange(event) {
        const { name, value, type, checked } = event.target
        setData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    

    const onSubmit = async e => {
        e.preventDefault();

        if (localStorage.getItem('isAuthenticated')) {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({
                username, first_name, last_name, is_staff, is_superuser, is_employee,
                email, phone, role
            });

            try {

                const res = await axios.put(`http://127.0.0.1:8000/users/me/`, body, config);

                console.log(res.data)
                setAccountUpdated(true);

            }
            catch (error) {
                console.log(error)
            }


        }
    };

    useEffect(() => {
        if (accountUpdated) {
            // navigate(`/${userRole}/account-settings/`)
            window.location.reload(false);
        }
    }, [accountUpdated])



    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h3>General Information</h3>
                {/* <p>Create your Account</p> */}
                <p>Witaj, {currentUser.first_name} {currentUser.last_name} !</p>
                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First Name*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last Name*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Phone*'
                        name='phone'
                        maxLength='9'
                        value={phone}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary me-1' type='submit'>Zapisz</button>
                {/* <button className='btn btn-danger' onClick={() => navigate(`/${userRole}/account-settings/`)}>Anuluj</button> */}
            </form>
        </div>
    );
};


export default EditAccount;