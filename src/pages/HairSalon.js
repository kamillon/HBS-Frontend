import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardComponent from '../components/CardComponent';
import hair_salon_picture from '../images/hair_salon_picture.png';
import LoadingSpinner from '../components/LoadingSpinner';

const HairSalon = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const listSalons = async () => {
            setIsLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/salon/', config);

                setData(res.data)
                console.log(res.data)
                setIsLoading(false)

            } catch (err) {
                setData(null)
                console.log(err)
                setIsLoading(false)
            }
        };
        listSalons()
    }, [])



    // const filteredServices = data.filter(salon => parseInt(salon.salonID) === parseInt(salonId))
    const searchFilteredServices = data.filter(item => (
        search.toLowerCase() === ''
            ? item
            : item.city.toLowerCase().includes(search)
            || item.name.toLowerCase().includes(search)
    ))



    return (
        <div>
            {isLoading ?
                <div className='mt-5'>
                    <LoadingSpinner text={"Loading..."} />
                </div>
                :
                <>
                    <section className="pt-5 bg-light">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md'>
                                    {/* <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png" className="img-fluid" alt="" /> */}
                                    <img src={hair_salon_picture} className="img-fluid w-75 d-none d-sm-block" alt="hair_salon_picture" />
                                </div>
                                <div className='col-md'>
                                    <h2>Znajdź odpowiedni salon dla siebie</h2>
                                    <p>Przeglądaj z setek dostępnych salonów i umów się na wizytę już dziś.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className='container'>
                        {/* 
                <div className="input-group mt-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Wyszukaj miasto"
                        aria-label="Wyszukaj miasto"
                        aria-describedby="button-addon2"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        id="button-addon2"
                    >
                        Szukaj
                    </button>
                </div> */}


                        <div className='col-md-6 mb-4'>
                            <div className='search-bar'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Wyszukaj salon"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>


                        {data.length <= 0 ? (<h4 className='pt-3'>Nie znaleziono salonów</h4>) : (
                            <div className='row'>

                                {/* {data.map((item) => ( */}
                                {searchFilteredServices.length
                                    ? searchFilteredServices.map((item) => (
                                        <div className='col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch' key={item.id} >
                                            <CardComponent
                                                id={item.id}
                                                title={item.name}
                                                ulica={item.street}
                                                nr_budynku={item.house_number}
                                                miejscowosc={item.city}
                                            />
                                        </div>
                                    ))
                                    :
                                    <p className='ms-4 mb-3'>Nie znaleziono salonów</p>
                                }

                            </div>
                        )}
                    </div>
                </>
            }
        </div>
    )
};

export default HairSalon;