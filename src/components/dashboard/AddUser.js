import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const AddUser = () => {

    const navigate = useNavigate()
    const { access, userRole } = useAuth()

    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        username: 'manager1231111',
        first_name: '',
        last_name: '',
        is_staff: true,
        is_superuser: true,
        is_employee: false,
        email: '',
        password: 'zaq1@WSX',
        re_password: 'zaq1@WSX',
        phone: '',
        // role: 'manager',
    });

    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, password, re_password, phone } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value ?? e.target.checked });

    const onSubmit = async e => {
        e.preventDefault();

        if (localStorage.getItem('isAuthenticated')) {
            if (password === re_password) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json',
                    }
                };

                let role = ''
                if(userRole === 'admin'){
                    role = 'manager'
                }
                else if(userRole === 'manager'){
                    role = 'employee'
                }
            
                const body = JSON.stringify({ username, first_name, last_name, is_staff, is_superuser, is_employee, 
                    email, password, re_password, phone, role });

                try {

                    let url = ''
                    if(userRole === 'admin'){
                        url = `http://127.0.0.1:8000/auth/users/`
                    }
                    else if(userRole === 'manager'){
                        url = `http://127.0.0.1:8000/pracownik/`
                    }

                    const res = await axios.post(url, body, config);


                    // let res = ''
                    // if(userRole == 'admin'){
                    //     res = await axios.post(`http://127.0.0.1:8000/auth/users/`, body, config);
                    // }
                    // else if(userRole == 'manager'){
                    //     res = await axios.post(`http://127.0.0.1:8000/pracownik/`, body, config);
                    // }
        
                    console.log(res.data)
                    setAccountCreated(true);
                    
                } 
                catch(error) {
                    console.log(error)
                }

            }
        }
    };


    // if (localStorage.getItem('isAuthenticated')) {
    //     return <Navigate to='/' />
    // }
    // if (accountCreated) {
    //     // return <Navigate to='/admin/users/' />
    //     navigate('/admin/users/')
    // }

    useEffect(() => {
        if (accountCreated) {
            navigate(`/${userRole}/users/`)
        }
    },[accountCreated])

    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
            <h1 className='mb-5'>Utwórz konto</h1>
            {/* <p>Create your Account</p> */}
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
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
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
                <button className='btn btn-primary me-1' type='submit'>Utwórz</button>
                <button className='btn btn-danger' onClick={() => navigate(`/${userRole}/users/`)}>Anuluj</button>
            </form>
        </div>
    );
};


export default AddUser;