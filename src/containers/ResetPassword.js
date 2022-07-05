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
        <div className='container mt-5'>
            <h1>Request Password Reset:</h1>
            <form onSubmit={e => onSubmit(e)}>
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
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;