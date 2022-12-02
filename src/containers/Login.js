import React, { useState, useContext, useEffect } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext, useAuth } from "../context/AuthContext"
import axios from 'axios';
import './Login.css';

const Login = () => {
    const { loginUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/'


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        loginUser({ email, password })
    };

    return (
        <div className='min-vh-100 color-overlay d-flex justify-content-center align-items-center'>
        {/* <div className='d-flex align-items-center justify-content-center'> */}
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded login-form text-center' onSubmit={e => onSubmit(e)}>
                <h1>Zaloguj się</h1>
                <div className="mt-5 mb-3">
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                {/* <p className='mt-3'>
                    <Link to='/reset-password' style={{ textDecoration: 'none' }}>Nie pamiętasz hasła?</Link>
                </p> */}
                <div className='text-center mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>Zaloguj się</button>
                    <p className='mt-3'>
                    <Link to='/reset-password' style={{ textDecoration: 'none' }}>Nie pamiętasz hasła?</Link>
                </p>
                    <hr/>
                    <p className='mt-3'><small>
                        Nie masz konta?
                        <Link to='/signup' style={{ textDecoration: 'none' }}> Zarejestruj się teraz</Link>
                        </small>
                    </p>
                </div>
            </form>
        </div>
    );
};


export default Login;