import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CardComponent from '../components/CardComponent';
import hair_salon_picture from '../images/hair_salon_picture.png';
import LoadingSpinner from '../components/LoadingSpinner';

const HairSalon = () => {
    const { access } = useAuth()
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [citySearch, setCitySearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const city = searchParams.get('city')

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
                let url = `http://127.0.0.1:8000/salon/`
                
                if (city) {
                    url = `http://127.0.0.1:8000/salon/?city=${city}`
                }
                const res = await axios.get(url, config);
                setData(res.data)
                setIsLoading(false)

            } catch (err) {
                setData(null)
                console.log(err)
                setIsLoading(false)
            }
        };
        listSalons()
    }, [city])

    const onSubmit = (e) => {
        e.preventDefault();
        if (search) {
            navigate(`/hairsalon/?city=${search}`)
        }
        else {
            navigate(`/hairsalon/`)
        }
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            {isLoading ?
                <div className='mt-5'>
                    <LoadingSpinner text={"Loading..."} />
                </div>
                :
                <>
                    <section className="bg-dark text-white">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <img
                                        src={hair_salon_picture}
                                        className="img-fluid w-50 d-none d-sm-block"
                                        alt="hair_salon_picture"
                                    />
                                </div>
                                <div className='col-md-6 pt-5'>
                                    <h2>Znajdź odpowiedni salon dla siebie</h2>
                                    <p>Przeglądaj z setek dostępnych salonów i umów się na wizytę już dziś.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-dark text-light p-5">
                        <div className='container'>
                            <div className='d-md-flex justify-content-between align-items-center'>
                                <form className='input-group' onSubmit={onSubmit}>
                                    <div className="input-group w-md-75 mx-auto">
                                        <input
                                            type="search"
                                            className="form-control p-2"
                                            placeholder="Wyszukaj salon"
                                            value={search}
                                            onChange={handleChange}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Szukaj
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>

                    <div className='container'>
                        {data.length <= 0 ?
                            <div className='row text-center'>
                                <h4 className='p-5'>
                                    Nie znaleziono salonów
                                </h4>
                            </div>
                            :
                            <div className='row'>
                                {data.length
                                    ? data.map((item) => (
                                        <div
                                            className='col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch'
                                            key={item.id}
                                        >
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
                        }
                    </div>
                </>
            }
        </div>
    )
};

export default HairSalon;