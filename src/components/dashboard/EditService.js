import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext"
import LoadingSpinner from '../LoadingSpinner';

const EditService = () => {
    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()
    const { uid } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const initialState = {
        name: '',
        service_type: '',
        describe: '',
        time: '',
        price: '',
        salonID: '',
    };

    const options = [
        { value: '', text: "--Typ usługi--" },
        { value: "women's", text: "Damskie" },
        { value: "men's", text: "Męskie" },
    ];

    const [salonData, setSalonData] = useState([]);
    const [data, setData] = useState(initialState);
    const [serviceUpdated, setServiceUpdated] = useState(false);
    const [ownerSalons, setOwnerSalons] = useState([]);

    const formik = useFormik({
        initialValues: data,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Pole jest wymagane"),
            service_type: Yup.string()
                .required("Pole jest wymagane"),
            time: Yup.string()
                .required("Pole jest wymagane"),
            price: Yup.number()
                .positive()
                .required('Pole jest wymagane'),
            salonID: Yup.string()
                .required('Pole jest wymagane'),
        }),

        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });

    const { name, service_type, describe, time, price, salonID } = formik.values;

    useEffect(() => {
        const getServices = async () => {
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
                    const res = await axios.get(`http://127.0.0.1:8000/service/${uid}/`, config);
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

        const getSalons = async () => {
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
                    const res = await axios.get(`http://127.0.0.1:8000/salon/`, config);
                    setSalonData(res.data)
                    setIsLoading(false)

                } catch (err) {
                    setSalonData(null)
                    console.log(err)
                    setIsLoading(false)
                }
            } else {
                setSalonData(null)
                console.log("Blad")
                setIsLoading(false)
            }
        };

        const listOfSalonsOwners = async () => {
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
                    const res = await axios.get(`http://127.0.0.1:8000/list-of-owners-salons/${currentUser.id}/`, config);
                    setOwnerSalons(res.data)
                    setIsLoading(false)
                } catch (err) {
                    setOwnerSalons(null)
                    console.log(err)
                    setIsLoading(false)
                }
            } else {
                setOwnerSalons(null)
                console.log("Blad")
                setIsLoading(false)
            }
        };

        if (uid) {
            getServices()
            if (currentUser.role === 'admin') {
                getSalons()
            }
            if (currentUser.role === 'salon_owner') {
                listOfSalonsOwners()
            }
        }
    }, [uid, access, userRole])

    const onSubmit = async e => {
        setIsSubmitting(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ name, service_type, describe, time, price, salonID });

        try {
            const res = await axios.put(`http://127.0.0.1:8000/service/${uid}/`, body, config);
            setServiceUpdated(true);
            setIsSubmitting(false)
        }
        catch (error) {
            console.log(error)
            setIsSubmitting(false)
        }
    };

    useEffect(() => {
        if (serviceUpdated) {
            navigate(`/${userRole}/services/`)
        }
    }, [serviceUpdated])

    let mappedSalons = ({})

    if (userRole === 'admin') {
        mappedSalons = salonData
    }
    else if (userRole === 'salon_owner') {
        mappedSalons = ownerSalons
    }


    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-12 mb-4'>
                    <button
                        className='btn btn-secondary me-1'
                        onClick={() => navigate(`/${userRole}/services/`)}>
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
                            <h1 className='mb-5'>Edytuj usługę</h1>
                            <div className='mb-3'>
                                <label
                                    htmlFor='inputName'
                                    className='form-label'>
                                    Nazwa usługi
                                </label>
                                <input
                                    id='inputName'
                                    className={`form-control ${formik.touched.name && formik.errors.name && 'is-invalid'}`}
                                    type='text'
                                    placeholder='Nazwa usługi'
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className='text-start error'>
                                    {formik.touched.name && formik.errors.name ? (
                                        <div>{formik.errors.name}</div>
                                    ) : null}
                                </span>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor='inputServiceType'
                                    className='form-label'>
                                    Typ usługi
                                </label>
                                <select
                                    id='inputServiceType'
                                    className={`form-control ${formik.touched.service_type && formik.errors.service_type && 'is-invalid'}`}
                                    name='service_type'
                                    value={formik.values.service_type}
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
                                    {formik.touched.service_type && formik.errors.service_type ? (
                                        <div>{formik.errors.service_type}</div>
                                    ) : null}
                                </span>
                            </div>

                            <div className='mb-3'>
                                <label
                                    htmlFor='inputDescribe'
                                    className='form-label'>
                                    Opis usługi
                                </label>
                                <textarea
                                    id='inputDescribe'
                                    className={`form-control ${formik.touched.describe && formik.errors.describe && 'is-invalid'}`}
                                    type='text'
                                    placeholder='Opis usługi'
                                    name='describe'
                                    value={formik.values.describe}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className='text-start error'>
                                    {formik.touched.describe && formik.errors.describe ? (
                                        <div>{formik.errors.describe}</div>
                                    ) : null}
                                </span>
                            </div>
                            <div className='mb-3'>
                                <label
                                    htmlFor='inputTime'
                                    className='form-label'>
                                    Czas trwania usługi (min)
                                </label>
                                <input
                                    id='inputTime'
                                    className={`form-control ${formik.touched.time && formik.errors.time && 'is-invalid'}`}
                                    type='text'
                                    placeholder='Czas trwania usługi'
                                    name='time'
                                    value={formik.values.time}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className='text-start error'>
                                    {formik.touched.time && formik.errors.time ? (
                                        <div>{formik.errors.time}</div>
                                    ) : null}
                                </span>
                            </div>
                            <div className='mb-3'>
                                <label
                                    htmlFor='inputPrice'
                                    className='form-label'>
                                    Cena usługi
                                </label>
                                <input
                                    id='inputPrice'
                                    className={`form-control ${formik.touched.price && formik.errors.price && 'is-invalid'}`}
                                    type='text'
                                    placeholder='Cena usługi'
                                    name='price'
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className='text-start error'>
                                    {formik.touched.price && formik.errors.price ? (
                                        <div>{formik.errors.price}</div>
                                    ) : null}
                                </span>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor='inputSalon'
                                    className='form-label'>
                                    Salon
                                </label>
                                <select
                                    id='inputSalon'
                                    className={`form-control ${formik.touched.salonID && formik.errors.salonID && 'is-invalid'}`}
                                    name='salonID'
                                    value={formik.values.salonID}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value=''>
                                        --Wybierz salon--
                                    </option>
                                    {mappedSalons.map(salon => (
                                        <option key={salon.id} value={salon.id}>
                                            {salon.name} ({salon.city})
                                        </option>
                                    ))}
                                </select>
                                <span className='text-start error'>
                                    {formik.touched.salonID && formik.errors.salonID ? (
                                        <div>{formik.errors.salonID}</div>
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

export default EditService;