import React, { Fragment, useState, useContext } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { AuthContext, useAuth } from "../context/AuthContext"

const Navbar = () => {
    const { contextState, setContextState } = useContext(AuthContext);
    // const [navigate, setNavigate] = useState(false);
    const {access, logoutUser} = useAuth()

    // const token = localStorage.getItem('access');
    
    // const logout_user = () => {
    //     // localStorage.removeItem('access')
    //     // localStorage.removeItem('refresh')
    //     // localStorage.removeItem('isAuthenticated')
    //     // localStorage.removeItem('user')
    //     localStorage.clear();

    //     setNavigate(true);
        
    // };

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className='nav-item'>
            <a className='nav-link' href='/' onClick={logoutUser}>Logout</a>
        </li>
    );

    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link className='navbar-brand' to='/'>Auth System</Link>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#navbarNav' 
                    aria-controls='navbarNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'>Home <span className='sr-only'>(current)</span></Link>
                        </li>
                        {/* {localStorage.getItem('isAuthenticated') ? authLinks() : guestLinks()} */}
                        {access ? authLinks() : guestLinks()}
                    </ul>
                </div>
            </nav>
            {/* {navigate ? <Navigate to='/' /> : <Fragment></Fragment>} */}

            {/* {!auth.user && (
                <NavLink to='/login'>Login</NavLink>
            )} */}
        </Fragment>
    );
};

export default Navbar;