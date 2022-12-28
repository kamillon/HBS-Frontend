import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays, setHours, setMinutes } from 'date-fns';
import moment from 'moment';
import WorkHoursCard from './WorkHoursCard';

const WorkHoursManagement = (props) => {
    console.log(props)

    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()

    const initialState = {
        id: '',
        weekday: '',
        from_hour: '',
        to_hour: '',
        is_day_off: '',
    };

    const [workHours, setWorkHours] = useState([initialState]);

    // const [openingHour, setOpeningHour] = useState(null);
    // const [closeHour, setCloseHour] = useState(null);

    const { from_hour, to_hour, is_day_off } = workHours


    useEffect(() => {
        const getWorkHours = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const res = await axios.get(`http://127.0.0.1:8000/employee-work-hours/${props.uid}/`, config);
                    setWorkHours(res.data)
                    // console.log(res.data)
                } catch (err) {
                    setWorkHours(null)
                    console.log(err)
                }
            } else {
                setWorkHours(null)
                console.log("Blad")
            }
        };

        getWorkHours()

    }, [access])


    console.log(workHours)

    return (
        <div className='container'>
            <div className='row mb-5'>
                <div className='col-6'>
                    <h2>Godziny pracy</h2>
                </div>
                <div className='col-6 text-end'>
                    <button
                        className='btn btn-danger'
                        onClick={() => navigate(`/${userRole}/employee/`)}>
                        Powrót
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {workHours.map((item) => (
                        <WorkHoursCard
                            key={item.id}
                            id={item.id}
                            weekday={item.weekday}
                            from_hour={item.from_hour}
                            to_hour={item.to_hour}
                            is_day_off={item.is_day_off}
                            employeeId={item.employeeId}
                            sId={props.salon}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
};


export default WorkHoursManagement;


