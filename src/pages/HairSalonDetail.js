import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListServices from '../components/ListServices';
import hair_salon from '../images/hair_salon.png';
import SalonContact from './SalonContact';
import avatar from '../images/avatar.png';

const HairSalonDetail = (props) => {
    const { access } = useAuth()
    const { salonId } = useParams()
    const [data, setData] = useState([])
    const [employee, setEmployee] = useState([])
    const [salonData, setSalonData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const listServices = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/service/', config);

                setData(res.data)
                console.log(res.data)

            } catch (err) {
                setData(null)
                console.log(err)
            }
        };

        const getEmployee = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const url = `http://127.0.0.1:8000/employee/`

                    const res = await axios.get(url, config);

                    setEmployee(res.data.filter(i => i.salon == salonId))
                    console.log(res.data)

                } catch (err) {
                    setEmployee(null)
                    console.log(err)
                }
            } else {
                setEmployee(null)
                console.log("Blad")
            }
        };

        const getSalons = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/salon/', config);

                setSalonData(res.data.filter(i => i.id == salonId))
                console.log(res.data)

            } catch (err) {
                setSalonData(null)
                console.log(err)
            }
        };

        listServices()
        getEmployee()
        getSalons()

    }, [access, salonId])

    const filteredServices = data.filter(service => parseInt(service.salonID) === parseInt(salonId))
    const searchFilteredServices = filteredServices.filter(item => (
        search.toLowerCase() === ''
            ? item
            : item.name.toLowerCase().includes(search)
    ))

    return (
        <div>
            <section className="p-5 bg-dark mb-5 text-white">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md'>
                            <img src={hair_salon} className="img-fluid w-50 d-none d-sm-block" alt="hair_salon" />
                        </div>
                        {employee.length > 0 ?
                            salonData.map((salon) => (
                                <div key={salon.id} className='col-md px-sm-0 px-md-5 py-sm-3 py-md-0'>
                                    <h2>{salon.name}</h2>
                                    <p>Contrart to populat belief, Lorem Ipsumasdsd
                                        asdsadsadsadsadasdsadasdasdsadsadsad
                                    </p>
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
                    <div className="col-md-8 pe-5">
                        <div className='row'>
                            <div className='col-md-6'>
                                <h5 className='ms-4 mb-3'>
                                    USŁUGI
                                </h5>
                            </div>


                            <div className='col-md-6 mb-4'>
                                <div className='search-bar'>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Wyszukaj usługę"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {searchFilteredServices.length
                            ? searchFilteredServices.map((item) => (
                                <ListServices
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    describe={item.describe}
                                    time={item.time}
                                    price={item.price}
                                />
                            ))
                            :
                            <p className='ms-4 mb-3'>Nie znaleziono usług</p>
                        }

                    </div>
                    <div className="col-md-4 bg-light">
                        <div className='contact-container mt-4'>
                            <h6>KONTAKT I GODZINY OTWARCIA</h6>
                            {employee.length > 0 ?
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

                        <div className='employee-container mt-4'>
                            <h6>
                                PRACOWNICY
                            </h6>
                            {employee.length > 0 ?
                                <div className="row text-center mt-4">
                                    {employee.map((i) => (
                                        <div key={i.user.id} className='col-4 col-md-6 col-lg-4 justify-content-center'>
                                            <img
                                                className="rounded-circle"
                                                alt="10x10"
                                                src={avatar}
                                                data-holder-rendered="true"
                                                width={64} />
                                            <p><strong>{i.user.first_name}</strong></p>

                                        </div>
                                    ))}
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HairSalonDetail;