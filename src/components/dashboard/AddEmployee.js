import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddEmployee = () => {

    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()

    const [accountCreated, setAccountCreated] = useState(false);
    const [salonData, setSalonData] = useState([]);
    const [selectedSalon, setSelectedSalon] = useState();
    const [errors, setErrors] = useState({
        username: '',
        email: '',
    });


    const phoneRegExp = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/

    const formik = useFormik({
        initialValues: {
            salon: '',
            user: {
                username: '',
                first_name: '',
                last_name: '',
                is_staff: true,
                is_superuser: true,
                is_employee: true,
                email: '',
                password: 'zaq1@WSX',
                phone: '',
                role: 'employee',
            },
        },
        validationSchema: Yup.object({
            salon: Yup.string()
                .required("Pole jest wymagane"),
            user: Yup.object({
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

        }),

        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
            // resetForm();
        },
    });

    useEffect(() => {
        const getSalons = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/salon/`, config);
                    setSalonData(res.data.filter(i => i.owner == currentUser.id))
                } catch (err) {
                    setSalonData(null)
                    console.log(err)
                }
            } else {
                setSalonData(null)
                console.log("Blad")
            }
        };
        getSalons()
    }, [access])

    const { salon, user } = formik.values;

    const onSubmit = async e => {
        if (localStorage.getItem('isAuthenticated')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json',
                }
            };

            const body = JSON.stringify({ salon, user });

            try {
                const url = `http://127.0.0.1:8000/employee/`
                const res = await axios.post(url, body, config);
                setAccountCreated(true);
            }
            catch (error) {
                console.log(error)
                setErrors(null)
                if (error.response.data.user.username) {
                    if (error.response.data.user.username[0] === "A user with that username already exists.") {
                        setErrors((prevErrors) => {
                            return {
                                ...prevErrors,
                                username: "Użytkownik z tą nazwą użytkownika już istnieje",
                            }
                        });
                    }
                }
                if (error.response.data.user.email) {
                    if (error.response.data.user.email[0] === "user with this email already exists.") {
                        setErrors((prevErrors) => {
                            return {
                                ...prevErrors,
                                email: "Użytkownik z tym adrem e-mail już istnieje",
                            }
                        });
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (accountCreated) {
            navigate(`/${userRole}/employee/`)
        }
    }, [accountCreated])


    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={formik.handleSubmit}>
                <h1 className='text-center'>Utwórz konto</h1>
                <div className='mb-3 mt-5'>
                    <label
                        htmlFor='inputSalon'
                        className='form-label'>
                        Salon
                    </label>
                    <select
                        id='inputSalon'
                        className={`form-control ${formik.touched.salon && formik.errors.salon && 'is-invalid'}`}
                        name='salon'
                        value={formik.values.salon}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value=''>---Wybierz salon---</option>
                        {salonData.map(salon => (
                            <option key={salon.id} value={salon.id}>
                                {salon.name} ({salon.city})
                            </option>
                        ))}
                    </select>
                    <span className='text-start error'>
                        {formik.touched.salon && formik.errors.salon ? (
                            <div>{formik.errors.salon}</div>
                        ) : null}
                    </span>
                </div>

                <div className='mb-3 mt-5'>
                    <label
                        htmlFor='inputUsername'
                        className='form-label'>
                        Nazwa użytkownika
                    </label>
                    <input
                        id='inputUsername'
                        className={`form-control ${formik.errors.user && formik.touched.user && formik.touched.user.username && formik.errors.user.username && 'is-invalid'}`}
                        type='text'
                        placeholder='Nazwa użytkownika'
                        name='user.username'
                        value={formik.values.user.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.errors.user && formik.touched.user && formik.touched.user.username && formik.errors.user.username ? (
                            <div>{formik.errors.user.username}</div>
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
                        className={`form-control ${formik.errors.user && formik.touched.user && formik.touched.user.first_name && formik.errors.user.first_name && 'is-invalid'}`}
                        type='text'
                        placeholder='Imię'
                        name='user.first_name'
                        value={formik.values.user.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.errors.user && formik.touched.user && formik.touched.user.first_name && formik.errors.user.first_name ? (
                            <div>{formik.errors.user.first_name}</div>
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
                        className={`form-control ${formik.errors.user && formik.touched.user && formik.touched.user.last_name && formik.errors.user.last_name && 'is-invalid'}`}
                        type='text'
                        placeholder='Nazwisko'
                        name='user.last_name'
                        value={formik.values.user.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.errors.user && formik.touched.user && formik.touched.user.last_name && formik.errors.user.last_name ? (
                            <div>{formik.errors.user.last_name}</div>
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
                        className={`form-control ${formik.errors.user && formik.touched.user && formik.touched.user.email && formik.errors.user.email && 'is-invalid'}`}
                        type='email'
                        placeholder='Email'
                        name='user.email'
                        value={formik.values.user.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.errors.user && formik.touched.user && formik.touched.user.email && formik.errors.user.email ? (
                            <div>{formik.errors.user.email}</div>
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
                        className={`form-control ${formik.errors.user && formik.touched.user && formik.touched.user.phone && formik.errors.user.phone && 'is-invalid'}`}
                        type='text'
                        placeholder='Telefon'
                        name='user.phone'
                        value={formik.values.user.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.errors.user && formik.touched.user && formik.touched.user.phone && formik.errors.user.phone ? (
                            <div>{formik.errors.user.phone}</div>
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
                        onClick={() => navigate(`/${userRole}/employee/`)}>
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;