import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './SignUp.css';
import { useAuth } from "../../context/AuthContext"
import LoadingSpinner from '../../components/LoadingSpinner';
import SuccessModal from '../../components/SuccessModal';
import ErrorModal from '../../components/ErrorModal';

const Signup = () => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)


    const phoneRegExp = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    const formik = useFormik({
        initialValues: {
            username: '',
            first_name: '',
            last_name: '',
            is_staff: false,
            is_superuser: false,
            email: '',
            password: '',
            re_password: '',
            phone: '',
            role: 'customer',
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
            password: Yup.string()
                .required('Pole jest wymagane')
                .matches(
                    passwordRegExp,
                    "Hasło musi zawierać min 8 znaków, 1 wielką literę, 1 małą literę, 1 cyfrę i 1 znak specjalny"
                ),
            re_password: Yup.string()
                .required("Pole jest wymagane")
                .oneOf([Yup.ref('password'), null], 'Hasła nie są identyczne'),
            phone: Yup.string()
                .matches(phoneRegExp, 'Wprowadzony numer telefonu jest nieprawidłowy')
                .max(9, "Nr telefonu musi zawierać 9 znaków")
                .required("Pole jest wymagane"),
        }),

        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
            resetForm();
        },
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { username, first_name, last_name, is_staff, is_superuser, email, password, re_password, phone, role } = formik.values;

    const onSubmit = async e => {
        setIsLoading(true)
        if (password === re_password) {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({
                username, first_name, last_name, is_staff, is_superuser,
                email, password, re_password, phone, role
            });

            try {
                const res = await axios.post(`http://127.0.0.1:8000/auth/users/`, body, config);
                setIsLoading(false)
            }
            catch (error) {
                console.log(error)
                setIsLoading(false)
                handleShow2()
            }
            setAccountCreated(true);
            setIsLoading(false)
        }
    };


    if (isAuthenticated) {
        navigate(`/`)
    }
    if (accountCreated) {
        handleShow1()
    }

    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center'>
            {isLoading ?
                <LoadingSpinner text={"Loading..."} />
                :
                <>
                    <form className='p-4 p-sm-4 shadow p-3 mb-5 mt-5 bg-white rounded signup-form' onSubmit={formik.handleSubmit}>
                        <h1 className='text-center'>Zarejestruj się</h1>
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
                            </span>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor='inputPassword'
                                className='form-label'>
                                Hasło
                            </label>
                            <input
                                id='inputPassword'
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
                        <div className='mb-3'>
                            <label
                                htmlFor='inputConfirmPassword'
                                className='form-label'>
                                Powtórz hasło
                            </label>
                            <input
                                id='inputConfirmPassword'
                                className={`form-control ${formik.touched.re_password && formik.errors.re_password && 'is-invalid'}`}
                                type='password'
                                placeholder='Powtórz hasło'
                                name='re_password'
                                value={formik.values.re_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className='text-start error'>
                                {formik.touched.re_password && formik.errors.re_password ? (
                                    <div>{formik.errors.re_password}</div>
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
                        <div className='text-center mt-4'>
                            <button className='btn btn-primary w-100' type='submit'>Zarejestruj się</button>
                        </div>
                    </form>
                </>
            }

            <SuccessModal
                show={show1}
                handleClose={handleClose1}
                title={"Twoje konto zostało utworzone!"}
                onClick={(e) => {
                    handleClose1()
                    navigate(`/login`)
                }}
            >
                <div className='text-center'>
                    Na podany adres e-mail wysłaliśmy link do aktywacji konta.
                </div>
            </SuccessModal>

            <ErrorModal
                show={show2}
                handleClose={handleClose2}
                title={"Wystąpił błąd"}
                onClick={(e) => {
                    handleClose2()
                    window.location.reload(false);
                }}
            >
                <div className='text-center mt-2'>
                    Spróbuj ponownie.
                </div>
            </ErrorModal>

        </div>
    );
};

export default Signup;