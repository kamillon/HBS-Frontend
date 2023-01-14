import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from "../../context/AuthContext"
import barber from '../../images/barber.svg';
import searchSalon from '../../images/searchSalon.svg';
import chooseService from '../../images/chooseService.svg';
import schedule from '../../images/schedule.svg';


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



            <section className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-4 d-flex justify-content-center'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <i className="bi bi-clock" style={{ fontSize: "7rem" }}></i>
                                </div>
                                <div className='col-12 text-center'>
                                    <h5>Szybko znajdziesz</h5>
                                    <p>salon w okolicy</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 d-flex justify-content-center'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <i className="bi bi-laptop" style={{ fontSize: "7rem" }}></i>
                                </div>
                                <div className='col-12 text-center'>
                                    <h5>Wygodnie przez</h5>
                                    <p>telefon lub laptop</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 d-flex justify-content-center'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <i className="bi bi-calendar-check" style={{ fontSize: "7rem" }}></i>
                                </div>
                                <div className='col-12 text-center'>
                                    <h5>Szybko umówisz</h5>
                                    <p>termin wizyty</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='py-5' style={{backgroundColor: "#fbe2b1"}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <h1>Jak to działa?</h1>
                            <div className='fs-3' style={{ color: "#e06c5c" }}>Jak łatwo i szybko zarezerwować wizytę w salonie fryzjerskim?</div>
                            <div className='fs-3 fw-bold' style={{ color: "#e06c5c" }}>To proste! Wystarczą tylko 3 kroki!</div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="p-5">
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md'>
                            <h2 className='mb-5'>Znajdź salon</h2>
                            <p>
                                Wpisz w wyszukiwarkę nazwę miejscowości, w której chcesz znaleźć salon fryzjerski.
                                {/* Możesz rówież wybrać z menu zakładkę "Fryzjer". System przekieruje Cię na stronę ze wszystkimi dostępnymi salonami fryzjerskimi. */}
                            </p>
                            <p>
                                Możesz rówież wybrać z menu zakładkę "Fryzjer". System przekieruje Cię na stronę ze wszystkimi dostępnymi salonami fryzjerskimi.
                            </p>
                        </div>
                        <div className='col-md text-center'>
                            <img src={searchSalon} className="img-fluid w-75" alt="searchSalonImage" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5">
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md text-center'>
                            <img src={chooseService} className="img-fluid w-50" alt="chooseServiceImage" />
                        </div>
                        <div className='col-md'>
                            <h2 className='mb-5'>Wybierz interesującą Cię usługę</h2>
                            <p>
                                Przeglądaj listę usług, jakie oferuje wybrany salon. Spośród nich wybierz tą, która Cię interesuje.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="p-5">
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <h2 className='mb-5'>Rezerwuj wizytę</h2>
                            <p>
                                Wybierz pracownika, do którego chcesz się zapisać. Następnie z kalendarza wybierz dzień oraz godzinę.
                                {/* Zarezerwuj termin i poczekaj już tylko na potwierdzenie rezerwacji, które przyjdzie do Ciebie mailem. */}
                            </p>
                            <p>
                                To wszystko. Poczekaj na potwierdzenie rezerwacji, które przyjdzie do Ciebie mailem.
                            </p>
                        </div>
                        <div className='col-md text-center'>
                            <img src={schedule} className="img-fluid w-50" alt="scheduleImage" />
                        </div>
                    </div>
                </div>
            </section>



        </div>
    )
};
export default Home;