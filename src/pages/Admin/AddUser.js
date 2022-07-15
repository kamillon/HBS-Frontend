import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {

    const navigate = useNavigate()

    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        username: 'manager4',
        first_name: '',
        last_name: '',
        is_staff: true,
        is_superuser: true,
        is_employee: false,
        email: '',
        password: 'zaq1@WSX',
        re_password: 'zaq1@WSX',
        phone: '',
        role: 'manager',
    });

    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, password, re_password, phone, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value ?? e.target.checked });

    const onSubmit = async e => {
        e.preventDefault();

        if (localStorage.getItem('isAuthenticated')) {
            if (password === re_password) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            
                const body = JSON.stringify({ username, first_name, last_name, is_staff, is_superuser, is_employee, 
                    email, password, re_password, phone, role });

                try {
                    const res = await axios.post(`http://127.0.0.1:8000/auth/users/`, body, config);
        
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
            navigate('/admin/users/')
        }
    },[accountCreated])

    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
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
                <div className='form-group'>
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

                <div className='form-group'>
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
                
                <div className='form-group'>
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
                <button className='btn btn-primary' type='submit'>Utworz</button>
                <button className='btn btn-danger' onClick={() => navigate('/admin/users/')}>Anuluj</button>
            </form>
        </div>
    );
};


export default AddUser;