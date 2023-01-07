import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from '../components/Slider';
import { AuthContext, useAuth } from "../context/AuthContext"
import barber from '../images/barber.svg';
import booking from '../images/booking.svg';
import building from '../images/building.svg';
import fryzjerIcon from '../images/fryzjer1.png';


const Home = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/hairsalon/?city=${search}`)
    };

    return (
        <div>
            <section className='bg-dark text-light p-5 text-center text-sm-start'>
                <div className='container'>
                    <div className='d-sm-flex align-items-center justify-content-between'>
                        <div className='px-5'>
                            <h1>Umów się<br />
                                na nowy look</h1>
                            <span>Odkryj najlepsze salony w okolicy i umów się na wizytę</span>
                            <form className='search-bar' onSubmit={onSubmit}>
                                <div className="input-group mt-5">
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Wyszukaj miasto"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
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
                        <img src={barber} className="img-fluid w-50 d-none d-sm-block" alt="barber_image" />
                    </div>
                </div>
            </section>

            <section className='py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h4>Our Company</h4>
                            <div className='underline'></div>
                            <p>
                                Lorem ipsum asdsadsadsadsad
                                asdsadsadsadsadasdsad
                                asdsadasdasssssssssssssad
                                asdassdsd lorem asdsadsadsadsadasdsadasdasdsadsadsadasd
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-5 bg-light'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 d-flex justify-content-center'>
                            <Link to='/hairsalon' style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="card border-0 bg-light" style={{ width: "12rem" }}>
                                    <img src={fryzjerIcon} className="card-img-top p-4" alt="hairdresser_icon" />
                                    <div className="card-body text-center">
                                        <h4>Fryzjerstwo</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5">
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md'>
                            <h1 className='mb-5'>Umów się online</h1>
                            <p>
                                Chcesz umówić się do fryzjera, barbera, stylistki paznokci lub salonu masażu w okolicy? Szukasz miejsca, w którym najlepsi specjaliści zadbają o Twoją brodę, brwi lub zrobią relaksujący masaż?
                            </p>
                            <p>
                                Booksy to darmowa aplikacja do rezerwacji, dzięki której z łatwością znajdziesz wolny termin i wygodnie umówisz się na wizytę. Bez dzwonienia — rezerwujesz o każdej porze i z dowolnego miejsca.
                            </p>
                        </div>
                        <div className='col-md text-center'>
                            <img src={building} className="img-fluid w-50" alt="building_image" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5">
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md text-center'>
                            <img src={booking} className="img-fluid w-50" alt="booking_image" />
                        </div>
                        <div className='col-md'>
                            <h1 className='mb-5'>Coś Ci wypadło? Nie szkodzi!</h1>
                            <p>
                                Pobierz Booksy, darmową aplikację do rezerwacji, i zarządzaj swoimi wizytami, gdziekolwiek jesteś. Zmień termin wizyty lub odwołaj rezerwację bez dzwonienia.
                            </p>
                            <p>
                                Wiemy, że każdego dnia dużo się u Ciebie dzieje, dlatego będziemy wysyłać Ci przypomnienia o nadchodzących wizytach. Dzięki nim nigdy nie przegapisz terminu!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='p-5 pb-1 bg-dark text-white'>
                <div className='container'>
                    <h2 className='text-center mb-4'>Znajdź specjalistę według miasta</h2>
                    <div className='row py-5'>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link " href="/">Warszawa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Kraków</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Poznań</a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link " href="/">Warszawa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Kraków</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Poznań</a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link " href="/">Warszawa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Kraków</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Poznań</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
        </div>
    )
};
export default Home;