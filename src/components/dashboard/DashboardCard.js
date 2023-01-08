import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"

const DashboardCard = (props) => {
    const { userRole } = useAuth()
    return (
        <div className='col-md-6 col-lg-4 col-xl-3 p-2'>
            <Link to={`/${userRole}/${props.path}`} className="text-decoration-none text-dark">
                <div className='p-3 bg-white shadow d-flex justify-content-around align-items-center rounded'>
                    <div className='row'>
                        <div className='col-6'></div>
                        <h3 className='p-4'>
                            {props.text}
                        </h3>
                        {/* <p className='fs-5'>
                            {props.text}
                        </p> */}
                    </div>
                    <i className={props.className}></i>
                </div>
            </Link>
        </div>
    )
};

export default DashboardCard;