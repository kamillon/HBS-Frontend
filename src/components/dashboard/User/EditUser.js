import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../../context/AuthContext"
import LoadingSpinner from '../../LoadingSpinner';
import { API } from '../../../App';

const EditUser = () => {
    const { access, userRole } = useAuth()
    const navigate = useNavigate()
    const { uid } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({
        email: '',
        username: '',
    });

    const initialState = {
        username: '',
        first_name: '',
        last_name: '',
        is_staff: '',
        is_superuser: '',
        email: '',
        phone: '',
        role: '',
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
            role: Yup.string()
                .required('Pole jest wymagane'),
        }),
        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });

    const getUser = async () => {
        setIsLoading(true)
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };
            try {
                const url = `${API}/auth/users/${uid}/`
                const res = await axios.get(url, config);
                setData(res.data)
                setIsLoading(false)

            } catch (err) {
                setData(null)
                console.log(err)
                setIsLoading(false)
            }
        } else {
            setData(null)
            console.log("Blad")
            setIsLoading(false)
        }
    };


    useEffect(() => {
        if (uid) {
            getUser()
        }
    }, [uid, access, userRole])

    const options = [
        { value: '', text: '--Choose an option--' },
        { value: 'admin', text: 'admin' },
        { value: 'customer', text: 'klient' },
        { value: 'employee', text: 'pracownik' },
        { value: 'salon_owner', text: 'właściciel salonu' },
    ];

    const [accountUpdated, setAccountUpdated] = useState(false);
    const { username, first_name, last_name, email, phone, role } = formik.values;

    const onSubmit = async e => {
        setIsSubmitting(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };

        let is_superuser = true
        let is_staff = true

        if (role === "employee" || role === "customer") {
            is_superuser = false
            is_staff = false
        }


        const body = JSON.stringify({
            username, first_name, last_name, is_staff, is_superuser,
            email, phone, role
        });

        try {
            const url = `${API}/auth/users/${uid}/`
            const res = await axios.put(url, body, config);
            setAccountUpdated(true);
            setIsSubmitting(false)
        }
        catch (error) {
            console.log(error)
            setErrors(null)
            setIsSubmitting(false)
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
    };

    useEffect(() => {
        if (accountUpdated) {
            getUser()
            setAccountUpdated(false)
        }
    }, [accountUpdated])

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-12 mb-4'>
                    <button
                        className='btn btn-secondary me-1'
                        onClick={() => navigate(`/${userRole}/users/`)}>
                        Powrót
                    </button>
                </div>
            </div>
            <div className='container mt-3 d-flex align-items-center justify-content-center'>
                {isLoading ?
                    <LoadingSpinner text={"Loading..."} />
                    :
                    <>
                        <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={formik.handleSubmit}>
                            <h1>Edytuj dane użytkownika</h1>
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
                            <div>
                                <div className="mb-3">
                                    <label className="FormControlSelect">Typ użytkownika</label>
                                    <select
                                        id='FormControlSelect'
                                        className={`form-control ${formik.touched.role && formik.errors.role && 'is-invalid'}`}
                                        name='role'
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        {options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </select>
                                    <span className='text-start error'>
                                        {formik.touched.role && formik.errors.role ? (
                                            <div>{formik.errors.role}</div>
                                        ) : null}
                                    </span>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label
                                    htmlFor='inputEmail'
                                    className='form-label'>
                                    Email
                                </label>
                                <input
                                    id='inputEmail'
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
                            <div className="d-flex align-items-center">
                                <button
                                    className='btn btn-primary me-1'
                                    type='submit'
                                    disabled={isSubmitting}
                                >
                                    Zapisz
                                </button>
                                {isSubmitting ?
                                    <LoadingSpinner text={''} />
                                    :
                                    <></>
                                }
                            </div>
                        </form>
                    </>
                }
            </div>
        </div>
    );
};

export default EditUser;