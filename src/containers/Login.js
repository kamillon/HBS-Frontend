import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Login.css';

const Login = () => {
    const { loginUser, error } = useAuth()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Pole jest wymagane'),
            email: Yup.string()
                .email('Wprowadź poprawny adres e-mail')
                .required('Pole jest wymagane'),
        }),

        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });

    const { email, password } = formik.values;

    const onSubmit = async (values) => {
        loginUser({ email, password })
    };

    return (
        <div className='min-vh-100 color-overlay d-flex justify-content-center align-items-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded login-form text-center' onSubmit={formik.handleSubmit}>
                <h1>Zaloguj się</h1>
                <div className="mt-5 mb-3">
                    <input
                        className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                        type='email'
                        placeholder='E-mail'
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
                <div className="mb-3">
                    <input
                        className={`form-control ${formik.touched.password && formik.errors.password && 'is-invalid'}`}
                        type='password'
                        placeholder='Hasło'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </span>
                </div>
                <div className='error'>
                    {error ? error : <></>}
                </div>
                <div className='text-center mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>Zaloguj się</button>
                    <p className='mt-3'>
                        <Link to='/reset-password' style={{ textDecoration: 'none' }}>Nie pamiętasz hasła?</Link>
                    </p>
                    <hr />
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