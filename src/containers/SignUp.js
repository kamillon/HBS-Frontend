import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
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
    });

    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, password, re_password, phone } = formData;

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
                email, password, re_password, phone });
        
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
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
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
                <div className="form-group form-check">
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
                </div>
                <div className="form-group form-check">
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
                </div>
                <div className="form-group form-check">
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
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
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
                <button className='btn btn-primary' type='submit'>Register</button>
            </form>
            <p className='mt-3'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};


export default Signup;