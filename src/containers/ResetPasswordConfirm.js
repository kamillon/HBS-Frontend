import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordConfirm = () => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const { uid, token } = useParams()

    const onSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ uid, token, new_password, re_new_password });

        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/users/reset_password_confirm/', body, config)

            console.log(res.data)
            setRequestSent(true);

        }
        catch (error) {
            console.log(error)
        }
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
<div className='min-vh-100 color-overlay d-flex justify-content-center align-items-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded login-form text-center' onSubmit={e => onSubmit(e)}>
                <h1>Ustal nowe hasło</h1>
                <p>Ustal nowe hasło za pomocą którego będziesz logować się na swoje konto</p>
                         <div className='form-group mb-3'>
                     <input
                        className='form-control'
                        type='password'
                        placeholder='Nowe hasło'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group mb-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Powtórz nowe hasło'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='text-center mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>Potwierdź</button>
                </div>
            </form>
        </div>







        // <div className='container mt-5'>
        //     <form onSubmit={e => onSubmit(e)}>
        //         <div className='form-group'>
        //             <input
        //                 className='form-control'
        //                 type='password'
        //                 placeholder='New Password'
        //                 name='new_password'
        //                 value={new_password}
        //                 onChange={e => onChange(e)}
        //                 minLength='6'
        //                 required
        //             />
        //         </div>
        //         <div className='form-group'>
        //             <input
        //                 className='form-control'
        //                 type='password'
        //                 placeholder='Confirm New Password'
        //                 name='re_new_password'
        //                 value={re_new_password}
        //                 onChange={e => onChange(e)}
        //                 minLength='6'
        //                 required
        //             />
        //         </div>
        //         <button className='btn btn-primary' type='submit'>Reset Password</button>
        //     </form>
        // </div>
    );
};

export default ResetPasswordConfirm;