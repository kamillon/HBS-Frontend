import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const Signup = () => {

    // const options = [
    //     {value: '', text: '--Choose an option--'},
    //     {value: 'admin', text: 'admin'},
    //     {value: 'customer', text: 'klient'},
    //     {value: 'employee', text: 'pracownik'},
    //     {value: 'salon_owner', text: 'właściciel salonu'},
    // ];

     

    // const [selected, setSelected] = useState(options[0].value);

    // const handleChange = event => {
    //     console.log(event.target.value);
    //     setSelected(event.target.value);
    // };


    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        is_staff: false,
        is_superuser: false,
        is_employee: false,
        email: '',
        password: '',
        re_password: '',
        phone: '',
        role: 'customer',
    });

    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, password, re_password, phone, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value ?? e.target.checked });

    const onSubmit = async e => {
        e.preventDefault();

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
               
                
            } 
            catch(error) {
                console.log(error)
            }

            setAccountCreated(true);
        }
    };


    if (localStorage.getItem('isAuthenticated')) {
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (
        <div className='min-vh-100 color-overlay2 d-flex justify-content-center align-items-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form text-center' onSubmit={e => onSubmit(e)}>
                <h1>Zarejestruj się</h1>
                <div className='mb-3 mt-5'>
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
                {/* <div className="mb-3 form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        name="is_staff"
                        value={is_staff}
                        onChange={e => onChange(e)}
                        
                    />
                    <label 
                        className="form-check-label" 
                        >is_staff
                    </label>
                </div> */}
                {/* <div className="mb-3 form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        name="is_superuser"
                        value={is_superuser}
                        onChange={e => onChange(e)}
                        
                    />
                    <label 
                        className="form-check-label" 
                        >is_superuser
                    </label>
                </div> */}
                {/* <div className="mb-3 form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        name="is_employee"
                        value={is_employee}
                        onChange={e => onChange(e)}
                        
                    />
                    <label 
                        className="form-check-label" 
                        >is_employee
                    </label>
                </div> */}
                {/* <div className="mb-3">
                    <label className="FormControlSelect">Typ użytkownika</label>
                    <select className="form-control" name='role' value={role} onChange={e => onChange(e)}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                    </select>
                </div> */}

                              

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
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
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
                <div className='text-center mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>Zarejestruj się</button>
                </div>
            </form>
        </div>
    );
};


export default Signup;