import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ email });
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/users/reset_password/', body, config)

            console.log(res.data)
            
        } 
        catch(error) {
            console.log(error)
        }

        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <div className='min-vh-100 color-overlay d-flex justify-content-center align-items-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded login-form text-center' onSubmit={e => onSubmit(e)}>
                <h1>Nie pamiętasz hasła?</h1>
                <p>Jeśli na ten e-mail jest założone konto, to wyślemy na niego wiadomość.</p>
                <div className='form-group'>
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
                <div className='text-center mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>Odzyskaj hasło</button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;