import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import "react-datepicker/dist/react-datepicker.css";
import WorkHoursCard from './WorkHoursCard';

const WorkHoursManagement = (props) => {
    const { access } = useAuth()

    const initialState = {
        id: '',
        weekday: '',
        from_hour: '',
        to_hour: '',
        is_day_off: '',
    };

    const [workHours, setWorkHours] = useState([initialState]);
    const [workHoursUpdated, setWorkHoursUpdated] = useState(false);

    const { from_hour, to_hour, is_day_off } = workHours

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
            } catch (err) {
                setWorkHours(null)
                console.log(err)
            }
        } else {
            setWorkHours(null)
            console.log("Blad")
        }
    };

    useEffect(() => {
        getWorkHours()
        setWorkHoursUpdated(false)
    }, [access, workHoursUpdated])

    return (
        <div className='container'>
            <div className='row mb-5'>
                <div className='col-12 text-center'>
                    <h1>Grafik pracy</h1>
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
                            setWorkHoursUpdated={setWorkHoursUpdated}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
};


export default WorkHoursManagement;


