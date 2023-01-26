import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API } from '../../App';

const ResetPassword = () => {
    const [requestSent, setRequestSent] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Wprowadź poprawny adres e-mail')
                .required('Pole jest wymagane'),
        }),

        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });

    const { email } = formik.values;

    const onSubmit = async e => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ email });

        try {
            const res = await axios.post(`${API}/auth/users/reset_password/`, body, config)
            setRequestSent(true);
        }
        catch (error) {
            console.log(error)
            if (error.response.status == 400) {
                setError('Użytkownik o podanym adresie e-mail nie istnieje');
            }
        }
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <div className='min-vh-100 color-overlay d-flex justify-content-center align-items-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded login-form text-center' onSubmit={formik.handleSubmit}>
                <h1>Nie pamiętasz hasła?</h1>
                <p>Jeśli na ten e-mail jest założone konto, to wyślemy na niego wiadomość.</p>
                <div className='mb-3'>
                    <input
                        className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </span>
                </div>
                <div className='error'>
                    {error ? error : <></>}
                </div>
                <div className='text-center mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>Odzyskaj hasło</button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;