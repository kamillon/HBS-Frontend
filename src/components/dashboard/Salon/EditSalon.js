import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../../context/AuthContext"
import OpeningHours from './OpeningHours';
import { Tab, Tabs } from 'react-bootstrap';
import LoadingSpinner from '../../LoadingSpinner';
import { API } from '../../../App';

const EditSalon = () => {
    const { access, userRole } = useAuth()
    const navigate = useNavigate()
    const { uid } = useParams()
    const [key, setKey] = useState('general');
    const [dataOwners, setDataOwners] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({
        email: '',
        phone_number: '',
    });

    const initialState = {
        name: '',
        street: '',
        house_number: '',
        city: '',
        post_code: '',
        postal_code_locality: '',
        phone_number: '',
        email: '',
        owner: '',
    };

    const [data, setData] = useState(initialState);

    const phoneRegExp = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/
    const postCodeRegExp = /^[0-9]{2}-[0-9]{3}$/

    const formik = useFormik({
        initialValues: data,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Pole jest wymagane"),
            street: Yup.string()
                .required("Pole jest wymagane"),
            house_number: Yup.string()
                .required("Pole jest wymagane"),
            city: Yup.string()
                .required("Pole jest wymagane"),
            post_code: Yup.string()
                .matches(postCodeRegExp, 'Wprowadzony kod pocztowy jest nieprawidłowy')
                .required("Pole jest wymagane"),
            postal_code_locality: Yup.string()
                .required("Pole jest wymagane"),
            phone_number: Yup.string()
                .matches(phoneRegExp, 'Wprowadzony numer telefonu jest nieprawidłowy')
                .max(9, "Nr telefonu musi zawierać 9 znaków")
                .required("Pole jest wymagane"),
            email: Yup.string()
                .email('Wprowadź poprawny adres e-mail')
                .required('Pole jest wymagane'),
            owner: Yup.string()
                .required('Pole jest wymagane'),
        }),
        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });

    const [salonUpdated, setSalonUpdated] = useState(false);
    const { name, street, house_number, city, post_code, postal_code_locality, phone_number, email, owner } = formik.values;


    const listOwners = async () => {
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
                const res = await axios.get(`${API}/salon-owner/`, config);
                setDataOwners(res.data)
                setIsLoading(false)

            } catch (err) {
                setDataOwners(null)
                console.log(err)
                setIsLoading(false)
            }
        } else {
            setDataOwners(null)
            console.log("Blad")
            setIsLoading(false)
        }
    };

    const getSalon = async () => {
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
                const res = await axios.get(`${API}/salon/${uid}/`, config);
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
            getSalon()
            listOwners()
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

        const body = JSON.stringify({ name, street, house_number, city, post_code, postal_code_locality, phone_number, email, owner });

        try {
            const res = await axios.put(`${API}/salon/${uid}/`, body, config);
            setSalonUpdated(true);
            setIsSubmitting(false)

        }
        catch (error) {
            console.log(error)
            setErrors(null)
            setIsSubmitting(false)
            if (error.response.data.email) {
                if (error.response.data.email) {
                    if (error.response.data.email[0] === "hair salon with this email already exists.") {
                        setErrors((prevErrors) => {
                            return {
                                ...prevErrors,
                                email: "Salon z tym adrem e-mail już istnieje",
                            }
                        });
                    }
                }
                if (error.response.data.phone_number) {
                    if (error.response.data.phone_number[0] === "hair salon with this phone number already exists.") {
                        setErrors((prevErrors) => {
                            return {
                                ...prevErrors,
                                phone_number: "Salon z tym numerem telefonu już istnieje",
                            }
                        });
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (salonUpdated) {
            getSalon()
            setSalonUpdated(false)
        }
    }, [salonUpdated])


    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-12 mb-4'>
                    <button
                        className='btn btn-secondary me-1'
                        onClick={() => navigate(`/${userRole}/salons/`)}>
                        Powrót
                    </button>
                </div>
            </div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="general" title="Ogólne">
                    <div className='container mt-5 d-flex align-items-center justify-content-center'>
                        {isLoading ?
                            <LoadingSpinner text={"Loading..."} />
                            :
                            <>
                                <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={formik.handleSubmit}>
                                    <h1 className='mb-5'>Edytuj dane salonu</h1>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputName'
                                            className='form-label'>
                                            Nazwa salonu
                                        </label>
                                        <input
                                            id='inputName'
                                            className={`form-control ${formik.touched.name && formik.errors.name && 'is-invalid'}`}
                                            type='text'
                                            placeholder='Nazwa salonu'
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
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputStreet'
                                            className='form-label'>
                                            Ulica
                                        </label>
                                        <input
                                            id='inputStreet'
                                            className={`form-control ${formik.touched.street && formik.errors.street && 'is-invalid'}`}
                                            type='text'
                                            placeholder='Ulica'
                                            name='street'
                                            value={formik.values.street}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <span className='text-start error'>
                                            {formik.touched.street && formik.errors.street ? (
                                                <div>{formik.errors.street}</div>
                                            ) : null}
                                        </span>
                                    </div>

                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputHouseNumber'
                                            className='form-label'>
                                            Nr budynku
                                        </label>
                                        <input
                                            id='inputHouseNumber'
                                            className={`form-control ${formik.touched.house_number && formik.errors.house_number && 'is-invalid'}`}
                                            type='text'
                                            placeholder='Nr budynku'
                                            name='house_number'
                                            value={formik.values.house_number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <span className='text-start error'>
                                            {formik.touched.house_number && formik.errors.house_number ? (
                                                <div>{formik.errors.house_number}</div>
                                            ) : null}
                                        </span>
                                    </div>

                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputCity'
                                            className='form-label'>
                                            Miejscowość
                                        </label>
                                        <input
                                            id='inputCity'
                                            className={`form-control ${formik.touched.city && formik.errors.city && 'is-invalid'}`}
                                            type='text'
                                            placeholder='Miejscowość'
                                            name='city'
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <span className='text-start error'>
                                            {formik.touched.city && formik.errors.city ? (
                                                <div>{formik.errors.city}</div>
                                            ) : null}
                                        </span>
                                    </div>

                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputPostcode'
                                            className='form-label'>
                                            Kod pocztowy
                                        </label>
                                        <input
                                            id='inputPostcode'
                                            className={`form-control ${formik.touched.post_code && formik.errors.post_code && 'is-invalid'}`}
                                            type='text'
                                            placeholder='Kod pocztowy'
                                            name='post_code'
                                            value={formik.values.post_code}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <span className='text-start error'>
                                            {formik.touched.post_code && formik.errors.post_code ? (
                                                <div>{formik.errors.post_code}</div>
                                            ) : null}
                                        </span>
                                    </div>

                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputPostalCodeLocality'
                                            className='form-label'>
                                            Poczta
                                        </label>
                                        <input
                                            id='inputPostalCodeLocality'
                                            className={`form-control ${formik.touched.postal_code_locality && formik.errors.postal_code_locality && 'is-invalid'}`}
                                            type='text'
                                            placeholder='Poczta'
                                            name='postal_code_locality'
                                            value={formik.values.postal_code_locality}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <span className='text-start error'>
                                            {formik.touched.postal_code_locality && formik.errors.postal_code_locality ? (
                                                <div>{formik.errors.postal_code_locality}</div>
                                            ) : null}
                                        </span>
                                    </div>

                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputPhoneNumber'
                                            className='form-label'>
                                            Telefon
                                        </label>
                                        <input
                                            id='inputPhoneNumber'
                                            className={`form-control ${formik.touched.phone_number && formik.errors.phone_number && 'is-invalid'}`}
                                            type='text'
                                            placeholder='Telefon'
                                            name='phone_number'
                                            value={formik.values.phone_number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <span className='text-start error'>
                                            {formik.touched.phone_number && formik.errors.phone_number ? (
                                                <div>{formik.errors.phone_number}</div>
                                            ) : null}
                                            {errors ? errors.phone_number : <></>}
                                        </span>
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

                                    <div className="mb-3">
                                        <label
                                            htmlFor='inputOwner'
                                            className='form-label'>
                                            Właściciel
                                        </label>
                                        <select
                                            id='inputOwner'
                                            className={`form-control ${formik.touched.owner && formik.errors.owner && 'is-invalid'}`}
                                            name='owner'
                                            value={formik.values.owner}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            {dataOwners.map(owner => (
                                                <option key={owner.user.id} value={owner.user.id}>
                                                    {owner.user.first_name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className='text-start error'>
                                            {formik.touched.owner && formik.errors.owner ? (
                                                <div>{formik.errors.owner}</div>
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

                </Tab>
                <Tab eventKey="openingHours" title="Godziny otwarcia">
                    <div className='row'>
                        <div className='col-12'>
                            <h1 className='mb-5 text-center'>
                                Godziny otwarcia salonu
                            </h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <OpeningHours day={"Poniedziałek"} weekday={1} />
                            <OpeningHours day={"Wtorek"} weekday={2} />
                            <OpeningHours day={"Środa"} weekday={3} />
                            <OpeningHours day={"Czwartek"} weekday={4} />
                            <OpeningHours day={"Piątek"} weekday={5} />
                            <OpeningHours day={"Sobota"} weekday={6} />
                            <OpeningHours day={"Niedziela"} weekday={0} />
                        </div>
                    </div>

                </Tab>
            </Tabs>
        </div>
    );
};

export default EditSalon;