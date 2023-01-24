import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext";

const ResetPasswordConfirm = () => {
    const { logoutUser } = useAuth()
    const [requestSent, setRequestSent] = useState(false);

    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    const formik = useFormik({
        initialValues: {
            new_password: '',
            re_new_password: '',
        },
        validationSchema: Yup.object({
            new_password: Yup.string()
                .required('Pole jest wymagane')
                .matches(
                    passwordRegExp,
                    "Hasło musi zawierać min 8 znaków, 1 wielką literę, 1 małą literę, 1 cyfrę i 1 znak specjalny"
                ),
            re_new_password: Yup.string()
                .required("Pole jest wymagane")
                .oneOf([Yup.ref('new_password'), null], 'Hasła nie są identyczne'),
        }),
        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });

    const { new_password, re_new_password } = formik.values;

    const { uid, token } = useParams()

    const onSubmit = async e => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ uid, token, new_password, re_new_password });

        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/users/reset_password_confirm/', body, config)
            setRequestSent(true);
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (requestSent === true) {
            logoutUser()
        }
    }, [requestSent])

    return (
        <div className='min-vh-100 color-overlay d-flex justify-content-center align-items-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded login-form text-center' onSubmit={formik.handleSubmit}>
                <h1>Ustal nowe hasło</h1>
                <p>Ustal nowe hasło za pomocą którego będziesz logować się na swoje konto</p>
                <div className='mb-3 text-start'>
                    <label
                        htmlFor='inputPassword'
                        className='form-label'>
                        Hasło
                    </label>
                    <input
                        id='inputPassword'
                        className={`form-control ${formik.touched.new_password && formik.errors.new_password && 'is-invalid'}`}
                        type='password'
                        placeholder='Hasło'
                        name='new_password'
                        value={formik.values.new_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.new_password && formik.errors.new_password ? (
                            <div>{formik.errors.new_password}</div>
                        ) : null}
                    </span>
                </div>
                <div className='mb-3 text-start'>
                    <label
                        htmlFor='inputConfirmPassword'
                        className='form-label'>
                        Powtórz hasło
                    </label>
                    <input
                        id='inputConfirmPassword'
                        className={`form-control ${formik.touched.re_new_password && formik.errors.re_new_password && 'is-invalid'}`}
                        type='password'
                        placeholder='Powtórz hasło'
                        name='re_new_password'
                        value={formik.values.re_new_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.re_new_password && formik.errors.re_new_password ? (
                            <div>{formik.errors.re_new_password}</div>
                        ) : null}
                    </span>
                </div>
                <div className='text-center mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>Potwierdź</button>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordConfirm;