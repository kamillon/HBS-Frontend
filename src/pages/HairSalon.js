import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardComponent from '../components/CardComponent';
import hair_salon_picture from '../images/hair_salon_picture.png';

const HairSalon = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([]);

    useEffect(() => {
        const listSalons = async () => {

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

            } catch (err) {
                setData(null)
                console.log(err)
            }
        };


        listSalons()
    }, [])

    return (
        <div>
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
            {data.length <= 0 ? (<h4 className='pt-3'>Nie znaleziono salonów</h4>) : (
                <div className='row'>

                    {data.map((item) => (
                        <div className='col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch' key={item.id} >
                            <CardComponent
                                id={item.id}
                                title={item.name}
                                ulica={item.street}
                                nr_budynku={item.house_number}
                                miejscowosc={item.city}
                            />
                        </div>
                    ))}
                    
                </div>
                )}
            </div>
        </div>
    )
};

export default HairSalon;