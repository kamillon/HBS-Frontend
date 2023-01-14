import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from "../context/AuthContext"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListServices from '../components/ListServices';
import hair_salon from '../images/hair_salon.png';
import SalonContact from './SalonContact';
import LoadingSpinner from '../components/LoadingSpinner';

const HairSalonDetail = (props) => {
    const { access } = useAuth()
    const { salonId } = useParams()
    const [services, setServices] = useState([])
    const [employee, setEmployee] = useState([])
    const [salonData, setSalonData] = useState([])
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState({
        services: false,
        employees: false,
    });


    const getServices = async () => {
        setIsLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`http://127.0.0.1:8000/list-of-salon-services/${salonId}/`, config);
            setServices(res.data)
            setIsLoading(false)
        } catch (err) {
            setServices(null)
            console.log(err)
            setIsLoading(false)
            if (err.response.status === 404) {
                setErrors((prevErrors) => {
                    return {
                        ...prevErrors,
                        services: true,
                    }
                });
            }
        }
    };


    const getEmployee = async () => {
        setIsLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        try {
            const url = `http://127.0.0.1:8000/list-of-salon-employees/${salonId}/`
            const res = await axios.get(url, config);
            setEmployee(res.data)
            setIsLoading(false)

        } catch (err) {
            setEmployee(null)
            console.log(err)
            setIsLoading(false)
            if (err.response.status === 404) {
                setErrors((prevErrors) => {
                    return {
                        ...prevErrors,
                        employees: true,
                    }
                });
            }
        }
    };

    const getSalons = async () => {
        setIsLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get('http://127.0.0.1:8000/salon/', config);
            setSalonData(res.data.filter(i => i.id == salonId))
            setIsLoading(false)

        } catch (err) {
            setSalonData(null)
            console.log(err)
            setIsLoading(false)
        }
    };

    useEffect(() => {
        getServices()
        getEmployee()
        getSalons()

    }, [salonId])


    let searchFilteredServices = ''


    if (errors.services) {
        searchFilteredServices = null
    }
    else {
        searchFilteredServices = services.filter(item => (
            search === ''
                ? item
                : item.name.toLowerCase().includes(search)
        ))
    }



    function handleTypeChange(event) {
        setSelectedType(event.target.value);
    }

    function getFilteredList() {
        if (!selectedType) {
            return searchFilteredServices;
        }
        return searchFilteredServices.filter((item) => item.service_type === selectedType);
    }

    const filteredList = useMemo(getFilteredList, [selectedType, searchFilteredServices]);


    return (
        <div>
            {isLoading ?
                <div className='mt-5'>
                    <LoadingSpinner text={"Loading..."} />
                </div>
                :
                <>
                    <section className="p-5 bg-dark mb-5 text-white">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md'>
                                    <img
                                        src={hair_salon}
                                        className="img-fluid w-50 d-none d-sm-block"
                                        alt="hair_salon"
                                    />
                                </div>
                                {salonData ?
                                    salonData.map((salon) => (
                                        <div key={salon.id} className='col-md px-sm-0 px-md-5 py-sm-3 py-md-0'>
                                            <h2>{salon.name}</h2>
                                            <span>
                                                ul. {salon.street} {salon.house_number}, {salon.city}
                                            </span>
                                        </div>
                                    ))
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                    </section>
                    <div className='container'>
                        <div className='row'>
                            <div className="col-lg-8 pe-5">
                                <div className='row'>
                                    <div className='col-12 col-lg-3 mb-3 mb-lg-0'>
                                        <h5 className='ms-4 lg-3'>
                                            USŁUGI
                                        </h5>
                                    </div>

                                    <div className='col-12 col-lg-3 mb-2 mb-lg-0'>
                                        <div>
                                            <select
                                                className='form-select'
                                                name='typeList'
                                                id='typeList'
                                                value={selectedType}
                                                onChange={handleTypeChange}
                                            >
                                                <option value="">Typ usługi</option>
                                                <option value="women's">Damskie</option>
                                                <option value="men's">Męskie</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className='col-12 col-lg-6 mb-4 float-end'>

                                        <div className='search-bar'>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Wyszukaj usługę"
                                                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {!errors.services
                                    ? filteredList.map((item) => (
                                        <ListServices
                                            key={item.id}
                                            id={item.id}
                                            name={item.name}
                                            describe={item.describe}
                                            time={item.time}
                                            price={item.price}
                                            employee={employee}
                                        />
                                    ))
                                    :
                                    <p className='ms-4 mb-3'>Nie znaleziono usług</p>
                                }

                            </div>
                            <div className="col-lg-4 bg-light">
                                <div className='contact-container mt-4'>
                                    <h6>KONTAKT I GODZINY OTWARCIA</h6>
                                    {salonData ?
                                        salonData.map((salon) => (
                                            <div key={salon.id} className="p-2 mb-5 mt-4">
                                                <i className="bi bi-phone me-2"></i>
                                                <strong>{salon.phone_number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</strong>
                                            </div>
                                        ))
                                        :
                                        <></>
                                    }
                                    <table className="table">
                                        <tbody>
                                            <SalonContact day={"Poniedziałek"} weekday={1} salonId={salonId} />
                                            <SalonContact day={"Wtorek"} weekday={2} salonId={salonId} />
                                            <SalonContact day={"Środa"} weekday={3} salonId={salonId} />
                                            <SalonContact day={"Czwartek"} weekday={4} salonId={salonId} />
                                            <SalonContact day={"Piątek"} weekday={5} salonId={salonId} />
                                            <SalonContact day={"Sobota"} weekday={6} salonId={salonId} />
                                            <SalonContact day={"Niedziela"} weekday={0} salonId={salonId} />
                                        </tbody>
                                    </table>
                                </div>

                                {!errors.employees ?
                                    <div className='employee-container mt-4'>
                                        <h6>
                                            PRACOWNICY
                                        </h6>

                                        <div className="row text-center mt-4">
                                            {employee.map((i) => (
                                                <div key={i.user.id} className='col-4 col-md-6 col-lg-4 justify-content-center'>
                                                    <i className="bi bi-person-circle" style={{ fontSize: "64px" }}></i>
                                                    <p><strong>{i.user.first_name}</strong></p>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }

                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
};

export default HairSalonDetail;