import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext"

const EditAccount = () => {
    const { access, userRole } = useAuth()

    const initialState = {
        username: '',
        first_name: '',
        last_name: '',
        is_staff: '',
        is_superuser: '',
        is_employee: '',
        email: '',
        phone: '',
    };

    const [data, setData] = useState(initialState);

    const phoneRegExp = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/

    const formik = useFormik({
        initialValues: data,
        enableReinitialize: true,
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

    useEffect(() => {
        const getUser = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const res = await axios.get(`http://127.0.0.1:8000/auth/users/me/`, config);
                    setData(res.data)

                } catch (err) {
                    setData(null)
                    console.log(err)
                }
            } else {
                setData(null)
                console.log("Blad")
            }
        };

        getUser()
    }, [access, userRole])

    const [accountUpdated, setAccountUpdated] = useState(false);
    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, phone, role } = formik.values;

    const onSubmit = async e => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({
            username, first_name, last_name, is_staff, is_superuser, is_employee,
            email, phone, role
        });

        try {
            const res = await axios.put(`http://127.0.0.1:8000/users/me/`, body, config);
            setAccountUpdated(true);

        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (accountUpdated) {
            window.location.reload(false);
        }
    }, [accountUpdated])


    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h3>Informacje podstawowe</h3>
                <div className='mb-3 mt-4'>
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
                <button className='btn btn-primary me-1' type='submit'>Zapisz</button>
            </form>
        </div>
    );
};

export default EditAccount;