import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import { AuthContext, useAuth } from "../context/AuthContext"



const Home = () => {
    // const { contextState, setContextState } = React.useContext(ThingsContext);
    // const isAuthenticated = contextState.isAuthenticated


    // useEffect(()=> {
    //     checkAuthenticated();
    //     loadUser();
    //     console.log("wyrenderowano")
    // })


    const { currentUser, isAuthenticated } = useAuth()
    console.log(currentUser)
    console.log(isAuthenticated)

    return (
        // <div className="container bg-light p-5 mt-5">
        <div>
            <Slider />
            <section className='py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h4>Our Company</h4>
                            <div className='underline'></div>
                            <p>
                                Lorem ipsum asdsadsadsadsad
                                asdsadsadsadsadasdsad
                                asdsadasd
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-5 bg-dark'>
                <div className='container'>
                    <div className='row g-4'>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <Link to='/hairdresser' style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="card" style={{ width: "12rem" }}>
                                    <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png" className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h4>Fryzjerstwo</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <Link to='/barber' style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="card" style={{ width: "12rem" }}>
                                    <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png" className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h4>Barber</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <Link to='/beauty-salon' style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="card" style={{ width: "12rem" }}>
                                    <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png" className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h4>Kosmetologia</h4>
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
                            <a href='#'>
                                <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png" className="img-fluid" alt="..." />
                            </a>
                        </div>
                        <div className='col-md'>
                            <h2>Learn The basic</h2>
                            <p>Contrart to populat belief, Lorem Ipsumasdsd
                                asdsadsadsadsadasdsadasdasdsadsadsad
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='p-5 bg-dark text-white'>
                <div className='container'>
                    <h2 className='text-center mb-4'>Znajdź specjalistę według miasta</h2>
                    <div className='row py-5'>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link " href="#">Warszawa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Kraków</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Poznań</a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link " href="#">Warszawa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Kraków</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Poznań</a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link " href="#">Warszawa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Kraków</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Poznań</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>



            <section className="p-5">
                <div className='container py-5'>
                    <div className='row'>
                    <div className='col-md'>
                            <h2>Learn The basic</h2>
                            <p>Contrart to populat belief, Lorem Ipsumasdsd
                                asdsadsadsadsadasdsadasdasdsadsadsad
                            </p>
                        </div>
                        <div className='col-md'>
                            <a href='#'>
                                <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png" className="img-fluid" alt="..." />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* <h1 className="display-4">Welcome to Auth System!</h1>
            <p className="lead">This is an incredible authentication system with production level features!</p>
            <hr className="my-4" />
            <p>Click the Log In button</p>
            <Link className='btn btn-primary btn-md' to='/login' role='button'>Login</Link> */}
        </div>
    )
};

export default Home;