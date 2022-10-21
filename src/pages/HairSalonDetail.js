import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListServices from '../components/ListServices';

const HairSalonDetail = (props) => {
    const navigate = useNavigate()
    const { salonId } = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        const listServices = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/usluga/', config);

                setData(res.data)
                console.log(res.data)

            } catch (err) {
                setData(null)
                console.log(err)
            }
        };

        listServices()
    }, [])

    return (
        <div>
            <section className="p-5 bg-dark mb-5 text-white">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md'
                            style={{
                                backgroundImage: `url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                                height: '60vh'
                            }}>
                            {/* <Link to='/'>
                                <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png" className="img-fluid" alt="..." />
                            </Link> */}
                        </div>
                        <div className='col-md px-sm-0 px-md-5 py-sm-3 py-md-0'>
                            <h2>Salon 1</h2>
                            <p>Contrart to populat belief, Lorem Ipsumasdsd
                                asdsadsadsadsadasdsadasdasdsadsadsad
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-8">
                        <h5 className='ms-5 mb-3'>
                            USŁUGI
                        </h5>
                        {data.map((item) => (
                            <ListServices
                                key={item.id}
                                id={item.id}
                                nazwa_uslugi={item.nazwa_uslugi}
                                opis={item.opis}
                                czas={item.czas}
                                cena={item.cena}
                            />
                        ))}

                    </div>
                    <div className="col-md-4 bg-light">
                        <h3 className='text-center'>Znajdziesz nas</h3>
                        <div className='map-container mb-5'>
                            mapa<br />
                        </div>

                        <div className='about-us-container'>
                            <h6>
                                O NAS
                            </h6>
                            <p>
                                Witamy w Rozczochranym Harrym, salonie fryzjersko-kosmetycznym w Warszawie dzielnica Wola, który został stworzony z myślą o wymagających i świadomych swoich potrzeb Klientach,
                            </p>
                        </div>
                        <div className='employee-container mt-4'>
                            <h6>
                                PRACOWNICY
                            </h6>
                            <div className="row text-center mt-4">
                                <div className='col-4 col-md-6 col-lg-4 justify-content-center'>
                                    <img className="rounded-circle" alt="10x10" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                                        data-holder-rendered="true" width={64} />

                                    <p><strong>Kasia</strong></p>

                                </div>
                                <div className='col-4 col-md-6 col-lg-4 justify-content-center'>
                                    <img className="rounded-circle z-depth-2" alt="10x10" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"
                                        data-holder-rendered="true" width={64} />

                                    <p><strong>Gosia</strong></p>
                                </div>

                                <div className='col-4 col-md-6 col-lg-4 justify-content-center'>
                                    <img className="rounded-circle z-depth-2" alt="10x10" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"
                                        data-holder-rendered="true" width={64} />

                                    <p><strong>Gosia</strong></p>
                                </div>
                                <div className='col-4 col-md-6 col-lg-4 justify-content-center'>
                                    <img className="rounded-circle z-depth-2" alt="10x10" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"
                                        data-holder-rendered="true" width={64} />

                                    <p><strong>Gosia</strong></p>

                                </div>
                            </div>
                        </div>

                        <div className='contact-container mt-4'>
                            <h6>KONTAKT</h6>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td className='w-50'>
                                            <div>
                                                {/* <p className="fw-bold mb-1">{props.nazwa_uslugi}</p>
                                            <p className="text-muted mb-0">{props.opis}</p> */}
                                                <p>Poniedziałek</p>
                                            </div>
                                        </td>
                                        <td className='w-50'>
                                            <div className="text-end">
                                                8.00 - 16.00
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-50'>
                                            <div>
                                                <p>Wtorek</p>
                                            </div>
                                        </td>
                                        <td className='w-50'>
                                            <div className="text-end">
                                                8.00 - 16.00
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-50'>
                                            <div>
                                                <p>Środa</p>
                                            </div>
                                        </td>
                                        <td className='w-50'>
                                            <div className="text-end">
                                                8.00 - 16.00
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-50'>
                                            <div>
                                                <p>Czwartek</p>
                                            </div>
                                        </td>
                                        <td className='w-50'>
                                            <div className="text-end">
                                                8.00 - 16.00
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-50'>
                                            <div>
                                                <p>Piątek</p>
                                            </div>
                                        </td>
                                        <td className='w-50'>
                                            <div className="text-end">
                                                8.00 - 16.00
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-50'>
                                            <div>
                                                <p>Sobota</p>
                                            </div>
                                        </td>
                                        <td className='w-50'>
                                            <div className="text-end">
                                                9.00 - 14.00
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-50'>
                                            <div>
                                                <p>Niedziela</p>
                                            </div>
                                        </td>
                                        <td className='w-50'>
                                            <div className="text-end">
                                                Zamknięte
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* {data.map((item) => (
                    <ListServices 
                    key={item.id} 
                    id={item.id}
                    nazwa_uslugi={item.nazwa_uslugi} 
                    opis={item.opis}
                    czas={item.czas}
                    cena={item.cena}
                    />
                ))} */}

                </div>
            </div>
        </div>
    )
};

export default HairSalonDetail;