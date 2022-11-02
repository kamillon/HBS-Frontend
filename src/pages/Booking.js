import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ListServices from '../components/ListServices';

const Booking = (props) => {
    const navigate = useNavigate()
    const { salonId } = useParams()
    const [data, setData] = useState([]);
    const location = useLocation();

    
    return (
        <div>
            umow wizytę
            {location.state.serviceId}
            {location.state.nazwa_uslugi}
        </div>
    )
};

export default Booking;