import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './HairSalon.css';
import CardComponent from '../../components/CardComponent';
import LoadingSpinner from '../../components/LoadingSpinner';
import SearchBar from '../../components/SearchBar';
import { API } from '../../App';

const HairSalon = () => {
    const { access } = useAuth()
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [citySearch, setCitySearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const city = searchParams.get('city')
    const [searchByName, setSearchByName] = useState('')

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
                let url = `${API}/salon/`

                if (city) {
                    url = `${API}/salon/?city=${city}`
                }
                const res = await axios.get(url, config);
                setData(res.data)
                setSearchByName(res.data)
                setIsLoading(false)

            } catch (err) {
                setData(null)
                console.log(err)
                setIsLoading(false)
            }
        };
        listSalons()
    }, [city])

    useEffect(() => {
        setSearchByName(data)
    }, [data])


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
                    <section className="bg-dark text-white pt-5">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12 pt-5 text-center'>
                                    <h2>Znajdź odpowiedni salon dla siebie</h2>
                                    <p>Przeglądaj z setek dostępnych salonów i umów się na wizytę już dziś.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="bg-dark p-5">
                        <div className="container">
                            <div className="row height d-flex justify-content-center align-items-center">
                                <div className="col-md-8">
                                    <div className="search">
                                        <form onSubmit={onSubmit}>
                                            <input
                                                type="search"
                                                className="form-control p-2"
                                                placeholder="Lokalizacja"
                                                value={search}
                                                onChange={handleChange}
                                            />
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                Szukaj
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='container'>
                        <div className='row'>
                            <div className="col-12 col-md-4 p-4">
                                <div className=''>
                                <SearchBar
                                    keys={['name', 'street']}
                                    data={data}
                                    placeholder={"Wyszukaj po nazwie"}
                                    setSearch={setSearchByName}
                                />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className='container'>

                        {searchByName.length <= 0 ?
                            <div className='row text-center'>
                                <h4 className='p-5'>
                                    Nie znaleziono salonów
                                </h4>
                            </div>
                            :
                            <div className='row'>
                                {searchByName.length
                                    ? searchByName.map((item) => (
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