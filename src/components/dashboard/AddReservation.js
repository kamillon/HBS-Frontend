import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import AddCustomerModal from '../AddCustomerModal';

const AddReservation = () => {
    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()
    const [data, setData] = useState([]);
    const [salonData, setSalonData] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [selectedSalon, setSelectedSalon] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [employeeSalon, setEmployeeSalon] = useState('');
    const [services, setServices] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [accountCreated, setAccountCreated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createdCustomerData, setCreatedCustomerData] = useState([]);

    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

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
            email: '',
            password: 'zaq1@WSX',
            re_password: 'zaq1@WSX',
            phone: '',
            role: 'customer',
            is_superuser: 'false',
            is_staff: 'false',
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

    const { username, first_name, last_name, email, password, re_password, phone, role, is_staff, is_superuser } = formik.values;

    const onSubmit = async e => {
        setIsSubmitting(true)
        if (password === re_password) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json',
                }
            };

            let url = `http://127.0.0.1:8000/auth/users/`

            let body = JSON.stringify({
                username, first_name, last_name,
                email, password, re_password, phone, role, is_superuser, is_staff
            });

            try {
                const res = await axios.post(url, body, config);
                setCreatedCustomerData(res.data)
                setAccountCreated(true);
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
        }
    };

    const listCustomers = async (salon) => {
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
                const url = `http://127.0.0.1:8000/list-of-salon-customers/${salon}/`
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

    const getEmployeeSalon = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const url = `http://127.0.0.1:8000/employee/${currentUser.id}/`
            const res = await axios.get(url, config);
            setEmployeeSalon(res.data.salon)

        } catch (err) {
            setEmployeeSalon(null)
            console.log(err)
        }

    };

    const getEmployee = async (salon) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json',
            }
        };
        try {
            const url = `http://127.0.0.1:8000/list-of-salon-employees/${salon}/`
            const res = await axios.get(url, config);
            setEmployee(res.data)

        } catch (err) {
            setEmployee(null)
            console.log(err)
        }

    };

    const getServices = async (salon) => {
        setIsLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`http://127.0.0.1:8000/list-of-salon-services/${salon}/`, config);
            setServices(res.data)
            setIsLoading(false)

        } catch (err) {
            setServices(null)
            console.log(err)
            setIsLoading(false)
        }
    };

    useEffect(() => {
        getSalons()
        if (userRole == "employee") {
            getEmployeeSalon()
        }
    }, [access])

    useEffect(() => {
        getSalons()
        if (employeeSalon) {
            setSelectedSalon(employeeSalon)
        }
    }, [employeeSalon])

    useEffect(() => {
        if (userRole === "salon_owner") {
            if (selectedSalon) {
                listCustomers(selectedSalon)
                getServices(selectedSalon)
                getEmployee(selectedSalon)
            }
            else {
                setData([])
            }
        }
        else if (userRole === "employee") {
            if (employeeSalon) {
                listCustomers(employeeSalon)
                getServices(employeeSalon)
                getEmployee(employeeSalon)
            }

        }
    }, [selectedSalon, employeeSalon])

    useEffect(() => {
        handleClose1()
        setAccountCreated(false)
        if (accountCreated && createdCustomerData) {
            navigate(`/hairsalon/${selectedSalon}/booking`, {
                state: {
                    serviceId: selectedService.id,
                    name: selectedService.name,
                    describe: selectedService.describe,
                    price: selectedService.price,
                    time: selectedService.time,
                    employee: employee,
                    customer: createdCustomerData,
                }
            })
        }
    }, [accountCreated])


    let salonDataFiltered = ''
    if (userRole === "salon_owner") {
        salonDataFiltered = salonData.filter(i => i.owner == currentUser.id)
    }
    else if (userRole === "employee") {
        salonDataFiltered = salonData.filter(i => i.id === employeeSalon)
    }

    const handleChange = event => {
        if (event.target.value === '') {
            setSelectedService('')
        }
        else {
            const found = services.find(element => {
                return element.id === parseInt(event.target.value);
            });
            setSelectedService(found)
            setSelectedCustomer('')
        }
    };

    const handleChangeCustomer = event => {
        if (event.target.value === '') {
            setSelectedCustomer('')
        }
        else {
            const found = data.find(element => {
                return element.customerId.user.id === parseInt(event.target.value);
            });
            setSelectedCustomer(found.customerId.user)
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-12 mb-4'>
                    <button
                        className='btn btn-secondary me-1'
                        onClick={() => navigate(`/${userRole}/reservations/`)}>
                        Powrót
                    </button>
                </div>
            </div>
            {isLoading ?
                <LoadingSpinner text={"Loading..."} />
                :
                <>
                    <div className='container mt-3 d-flex align-items-center justify-content-center'>
                        <div className='row p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded'>
                            <div className='col-12'>
                                <h1 className='mb-5'>Dodawanie rezerwacji</h1>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-lg-8'>
                                    {userRole === "salon_owner" &&
                                        <div className='mb-3'>
                                            <div className="row">
                                                <div className="col-10 col-lg-8">
                                                    <div>
                                                        <label
                                                            htmlFor="chooseSalon"
                                                            className="form-label text-secondary">
                                                            Wybierz salon
                                                        </label>
                                                        <select
                                                            id="chooseSalon"
                                                            className="form-select"
                                                            value={selectedSalon}
                                                            onChange={e => { setSelectedSalon(e.target.value); setSelectedService('') }}
                                                        >
                                                            <option value=''>
                                                                Wybierz salon
                                                            </option>
                                                            {salonDataFiltered ?
                                                                salonDataFiltered.map(salon => (
                                                                    <option key={salon.id} value={salon.id}>
                                                                        {salon.name} ({salon.city})
                                                                    </option>
                                                                ))
                                                                :
                                                                <></>
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className='mb-3'>
                                        <div className="row">
                                            <div className="col-10 col-lg-8">
                                                <div>
                                                    <label
                                                        htmlFor="chooseEmployee"
                                                        className="form-label text-secondary">
                                                        Wybierz usługę
                                                    </label>
                                                    {selectedSalon ?
                                                        <select
                                                            id="chooseEmployee"
                                                            className="form-select"
                                                            value={selectedService.id}
                                                            onChange={handleChange}
                                                        >
                                                            <option value=''>
                                                                Wybierz usługę
                                                            </option>
                                                            {services ?
                                                                services.map(service => (
                                                                    <option
                                                                        key={service.id}
                                                                        value={service.id}>
                                                                        {service.name}
                                                                    </option>
                                                                ))
                                                                :
                                                                <></>
                                                            }
                                                        </select>
                                                        :
                                                        <select
                                                            id="chooseEmployee"
                                                            className="form-select"
                                                            value={selectedService.id}
                                                            disabled
                                                        >
                                                            <option value=''>
                                                                Wybierz klienta
                                                            </option>
                                                        </select>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <div className="row">
                                            <div className='col-12'>
                                                <div className='row'>
                                                    <div className="col-10 col-lg-8">
                                                        <div>
                                                            <label
                                                                htmlFor="chooseCustomer"
                                                                className="form-label text-secondary">
                                                                Wybierz klienta
                                                            </label>
                                                            {selectedService ?
                                                                <select
                                                                    id="chooseCustomer"
                                                                    className="form-select"
                                                                    value={selectedCustomer.id}
                                                                    onChange={handleChangeCustomer}
                                                                >
                                                                    <option value=''>
                                                                        Wszystkie
                                                                    </option>
                                                                    {data ?
                                                                        data.map(customer => (
                                                                            <option
                                                                                key={customer.customerId.user.id}
                                                                                value={customer.customerId.user.id}>
                                                                                {customer.customerId.user.first_name} {customer.customerId.user.last_name}
                                                                            </option>
                                                                        ))
                                                                        :
                                                                        <></>
                                                                    }
                                                                </select>
                                                                :
                                                                <select
                                                                    id="chooseCustomer"
                                                                    className="form-select"
                                                                    value={selectedCustomer.id}
                                                                    disabled
                                                                >
                                                                    <option value=''>
                                                                        Wszystkie
                                                                    </option>
                                                                </select>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-2 col-lg-2 d-flex align-items-end">
                                                        {!selectedCustomer && selectedSalon && selectedService ?
                                                            <button
                                                                type='button'
                                                                className='btn btn-dark'
                                                                onClick={() => {
                                                                    handleShow1();
                                                                }}
                                                            >
                                                                <i className="bi bi-person-plus-fill"></i>
                                                            </button>
                                                            :
                                                            <button
                                                                type='button'
                                                                className='btn btn-dark'
                                                                disabled
                                                            >
                                                                <i className="bi bi-person-plus-fill"></i>
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <div className="row">
                                            <div className="col-10 col-lg-8">
                                                <div className='col-12'>
                                                    {(selectedSalon && selectedService && selectedCustomer) ?
                                                        <button
                                                            type='button'
                                                            className='btn btn-primary w-100'
                                                            onClick={() => navigate(`/hairsalon/${selectedSalon}/booking`, {
                                                                state: {
                                                                    serviceId: selectedService.id,
                                                                    name: selectedService.name,
                                                                    describe: selectedService.describe,
                                                                    price: selectedService.price,
                                                                    time: selectedService.time,
                                                                    employee: employee,
                                                                    customer: selectedCustomer,
                                                                }
                                                            })}
                                                        >
                                                            DALEJ
                                                        </button>
                                                        :
                                                        <button
                                                            type='button'
                                                            className='btn btn-primary w-100'
                                                            disabled
                                                        >
                                                            DALEJ
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <AddCustomerModal
                        show1={show1}
                        handleClose1={handleClose1}
                        formik={formik}
                        errors={errors}
                        isSubmitting={isSubmitting}
                    />
                </>
            }
        </div>
    )
};

export default AddReservation;