import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddUser = () => {
    const navigate = useNavigate()
    const { access, userRole } = useAuth()
    const [accountCreated, setAccountCreated] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        username: '',
    });

    const phoneRegExp = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/

    const formik = useFormik({
        initialValues: {
            username: '',
            first_name: '',
            last_name: '',
            is_staff: true,
            is_superuser: true,
            is_employee: false,
            email: '',
            password: 'zaq1@WSX',
            re_password: 'zaq1@WSX',
            phone: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Pole jest wymagane"),
            first_name: Yup.string()
                .required("Pole jest wymagane"),
            last_name: Yup.string()
                .required("Pole jest wymagane"),
            email: Yup.string()
                .email('Wprowadź poprawny adres e-mail')
                .required('Pole jest wymagane'),
            phone: Yup.string()
                .matches(phoneRegExp, 'Wprowadzony numer telefonu jest nieprawidłowy')
                .max(9, "Nr telefonu musi zawierać 9 znaków")
                .required("Pole jest wymagane"),
        }),

        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });

    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, password, re_password, phone } = formik.values;

    const onSubmit = async e => {
        if (localStorage.getItem('isAuthenticated')) {
            if (password === re_password) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json',
                    }
                };

                let role = ''
                if (userRole === 'admin') {
                    role = 'salon_owner'
                }
                else if (userRole === 'salon_owner') {
                    role = 'employee'
                }

                const body = JSON.stringify({
                    username, first_name, last_name, is_staff, is_superuser, is_employee,
                    email, password, re_password, phone, role
                });

                try {
                    const url = `http://127.0.0.1:8000/auth/users/`
                    const res = await axios.post(url, body, config);
                    setAccountCreated(true);
                }
                catch (error) {
                    console.log(error)
                    setErrors(null)
                    if (error.response.data.email) {
                        if (error.response.data.email) {
                            if (error.response.data.email[0] === "user with this email already exists.") {
                                setErrors((prevErrors) => {
                                    return {
                                        ...prevErrors,
                                        email: "Użytkownik z tym adrem e-mail już istnieje",
                                    }
                                });
                            }
                        }
                    }
                    if (error.response.data.username) {
                        if (error.response.data.username[0] === "A user with that username already exists.") {
                            setErrors((prevErrors) => {
                                return {
                                    ...prevErrors,
                                    username: "Użytkownik z tą nazwą użytkownika już istnieje",
                                }
                            });
                        }
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (accountCreated) {
            navigate(`/${userRole}/users/`)
        }
    }, [accountCreated])

    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={formik.handleSubmit}>
                <h1 className='text-center'>Utwórz konto</h1>
                <div className='mb-3 mt-5'>
                    <label
                        htmlFor='inputUsername'
                        className='form-label'>
                        Nazwa użytkownika
                    </label>
                    <input
                        id='inputUsername'
                        className={`form-control ${formik.touched.username && formik.errors.username && 'is-invalid'}`}
                        type='text'
                        placeholder='Nazwa użytkownika'
                        name='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.username && formik.errors.username ? (
                            <div>{formik.errors.username}</div>
                        ) : null}
                        {errors ? errors.username : <></>}
                    </span>
                </div>
                <div className='mb-3'>
                    <label
                        htmlFor='inputFirstName'
                        className='form-label'>
                        Imię
                    </label>
                    <input
                        id='inputFirstName'
                        className={`form-control ${formik.touched.first_name && formik.errors.first_name && 'is-invalid'}`}
                        type='text'
                        placeholder='Imię'
                        name='first_name'
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.first_name && formik.errors.first_name ? (
                            <div>{formik.errors.first_name}</div>
                        ) : null}
                    </span>
                </div>
                <div className='mb-3'>
                    <label
                        htmlFor='inputLastName'
                        className='form-label'>
                        Nazwisko
                    </label>
                    <input
                        id='inputLastName'
                        className={`form-control ${formik.touched.last_name && formik.errors.last_name && 'is-invalid'}`}
                        type='text'
                        placeholder='Nazwisko'
                        name='last_name'
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.last_name && formik.errors.last_name ? (
                            <div>{formik.errors.last_name}</div>
                        ) : null}
                    </span>
                </div>
                <div className='mb-3'>
                    <label
                        htmlFor='inputEmail'
                        className='form-label'>
                        Email
                    </label>
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
                        {errors ? errors.email : <></>}
                    </span>
                </div>
                <div className='mb-3'>
                    <label
                        htmlFor='inputPhone'
                        className='form-label'>
                        Telefon
                    </label>
                    <input
                        id='inputPhone'
                        className={`form-control ${formik.touched.phone && formik.errors.phone && 'is-invalid'}`}
                        type='text'
                        placeholder='Telefon'
                        name='phone'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.phone && formik.errors.phone ? (
                            <div>{formik.errors.phone}</div>
                        ) : null}
                    </span>
                </div>
                <div className='text-center mt-4'>
                    <button
                        className='btn btn-primary me-1'
                        type='submit'>
                        Utwórz
                    </button>
                    <button
                        className='btn btn-danger'
                        onClick={() => navigate(`/${userRole}/users/`)}>
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;