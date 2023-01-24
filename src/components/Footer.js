import React, { Fragment } from 'react';

const Footer = () => {
    return (
        <Fragment>
            <footer className="bg-dark text-center text-lg-start mt-auto py-4">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-6 text-white text-center text-md-start">
                            Salonfy
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0 list-unstyled">
                                <a className="me-3 text-decoration-none link-secondary" href="/">Home</a>
                                <a className="me-3 text-decoration-none link-secondary" href="/hairsalon">Fryzjer</a>
                            </p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <div className="copyright text-white">
                                <p
                                    style={{ color: "#8a8b8b" }}>
                                    <small>
                                        © 2023. Wszystkie prawa zastrzeżone.
                                    </small>

                                </p>
                                <p
                                    style={{ color: "#8a8b8b" }}>
                                    <small>
                                        Wykorzystane w aplikacji grafiki pochodzą ze strony:
                                        <a href="https://storyset.com/" className='ps-1'>Storyset</a>
                                    </small>

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;