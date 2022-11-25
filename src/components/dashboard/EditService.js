import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const EditService = () => {
    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()
    const { uid } = useParams()
    const [dataOwners, setDataOwners] = useState([]);

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

    const { name, service_type, describe, time, price, salonID } = data

    useEffect(() => {
        const getServices = async () => {
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
                    console.log(res.data)

                } catch (err) {
                    setData(null)
                    console.log(err)
                }
            } else {
                setData(null)
                console.log("Blad")
            }
        };

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
                    setSalonData(res.data)
                    console.log(res.data)

                } catch (err) {
                    setSalonData(null)
                    console.log(err)
                }
            } else {
                setSalonData(null)
                console.log("Blad")
            }
        };

        const listOfSalonsOwners = async () => {
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
                    console.log(res.data)
                } catch (err) {
                    setOwnerSalons(null)
                    console.log(err)
                }
            } else {
                setOwnerSalons(null)
                console.log("Blad")
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


    function onChange(event) {
        const { name, value, type, checked } = event.target
        setData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const onSubmit = async e => {
        e.preventDefault();

        if (localStorage.getItem('isAuthenticated')) {

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
                console.log(res.data)
                setServiceUpdated(true);

            }
            catch (error) {
                console.log(error)
            }
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
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h1>Edytuj dane</h1>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Nazwa usługi*'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className="mb-3">
                    {/* <label className="FormControlSelect">Typ usługi</label> */}
                    <select className="form-control" name='service_type' value={service_type} onChange={e => onChange(e)}>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Opis usługi*'
                        name='describe'
                        value={describe}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Czas*'
                        name='time'
                        value={time}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Cena*'
                        name='price'
                        value={price}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className="mb-3">
                    {/* <label className="FormControlSelect">SalonID</label> */}
                    <select className="form-control" name='salonID' value={salonID} onChange={e => onChange(e)}>
                        <option value=''>
                            --Wybierz salon--
                        </option>
                        {mappedSalons.map(salon => (
                            <option key={salon.id} value={salon.id}>
                                {salon.name} ({salon.city})
                            </option>
                        ))}
                    </select>
                </div>

                <button className='btn btn-primary me-1' type='submit'>Edytuj</button>
                <button className='btn btn-danger' onClick={() => navigate(`/${userRole}/services/`)}>Anuluj</button>
            </form>
        </div>
    );
};


export default EditService;