import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"
import moment from 'moment';
import 'moment/locale/pl';

import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

const BookingDetailsPage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const { access, userRole, currentUser } = useAuth()
    const props = location.state

    console.log(props)
    const date = moment(props.chooseDate)

    const formatted = format(new Date(date), 'EEEE, dd MMMM yyyy', {
        locale: pl,
    });

    return (
        <div className='container mt-5'>
            <p>booking details</p>
            {/* {date.format('dddd, MMMM Do YYYY')}
        {date.format('dddd, Do MMMM YYYY')}<br/> */}

            {formatted}
        </div>
    )
};

export default BookingDetailsPage;