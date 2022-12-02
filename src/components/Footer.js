import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Fragment>
            {/* <footer className="bg-light text-center text-lg-start mt-auto">
                <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    © 2022 Copyright:
                    <Link className='navbar-text-dark' to='/'>Salon Fryzjerski</Link>
                </div>

            </footer> */}

            <footer className="bg-dark text-center text-lg-start mt-auto py-4">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-6 text-white text-center text-md-start">
                            IBOOKING
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0 list-unstyled">
                                <a className="me-3 text-decoration-none link-secondary" href="/">Home</a>
                                <a className="me-3 text-decoration-none link-secondary" href="/hairsalon">Fryzjer</a>
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col ">
                            <div className="copyright text-white">
                                <p style={{color: "#8a8b8b"}}><small>© 2022. Wszystkie prawa zastrzeżone.</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;