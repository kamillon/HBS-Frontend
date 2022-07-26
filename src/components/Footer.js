import React, { Fragment } from 'react';
import { Link} from 'react-router-dom';

const Footer = () => {
    return (
        <Fragment>
            <footer className="bg-light text-center text-lg-start mt-auto">
                <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    © 2022 Copyright:
                    <Link className='navbar-text-dark' to='/'>Salon Fryzjerski</Link>
                </div>

            </footer>
        </Fragment>
    );
};

export default Footer;