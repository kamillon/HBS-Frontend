import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListServices from '../components/ListServices';

const Booking = (props) => {
    const navigate = useNavigate()
    const { salonId } = useParams()
    const [data, setData] = useState([]);

    
    return (
        <div>
            umow wizytę
        </div>
    )
};

export default Booking;