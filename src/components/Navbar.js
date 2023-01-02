import React, { Fragment, useState, useContext } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { AuthContext, useAuth } from "../context/AuthContext"

const Navbar = () => {
    const { contextState, setContextState } = useContext(AuthContext);
    const { isAuthenticated, logoutUser, userRole } = useAuth()

    const guestLinks = () => (
        <Fragment>
            <ul className="navbar-nav navbar-right">
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>Zaloguj</Link>
                </li>
            </ul>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <ul className="navbar-nav navbar-right">
                <li className='nav-item'>
                    <Link className='nav-link' to={`/${userRole}/`}>{userRole === "customer" ? "Profil" : "Dashboard" }</Link>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/' onClick={logoutUser}>Wyloguj</a>
                </li>
            </ul>
        </Fragment>
    );

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
                <div className="container">
                    <Link className='navbar-brand' to='/'>IBOOKING</Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle="collapse"
                        data-bs-target='#navbarNav'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <Link className='nav-link' to='/'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/hairsalon'>Fryzjer</Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks() : guestLinks()}

                    </div>
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;