import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';
import Form from 'react-bootstrap/Form';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays, setHours, setMinutes } from 'date-fns';
import moment from 'moment';



const OpeningHours = (props) => {

    const [openingHour, setOpeningHour] = useState(null);
    const [closeHour, setCloseHour] = useState(null);

    const dayId = props.openingHours[0]?.id
    const from_hour = props.openingHours[0]?.from_hour
    const to_hour = props.openingHours[0]?.to_hour
    const weekday = props.openingHours[0]?.weekday
    const salonId = props.openingHours[0]?.salonId

    const [chooseStartTime, setChooseStartTime] = useState(null)
    const [chooseEndTime, setChooseEndTime] = useState()
    


    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()

    const [openingHoursUpdated, setOpeningHoursUpdated] = useState(false);

    // const { email } = dataUser;


    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)


    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)


    const onSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ 
            from_hour: moment(openingHour).format("HH:mm:ss"), 
            to_hour: moment(closeHour).format("HH:mm:ss"),
            weekday: weekday,
            salonId: salonId });

        try {
            const res = await axios.put(`http://127.0.0.1:8000/opening-hours/${dayId}/`, body, config)

            console.log(res.data)

        }
        catch (error) {
            console.log(error)
        }

        setOpeningHoursUpdated(true);
    };

    // useEffect(() => {
    //     if (openingHoursUpdated) {
    //         window.location.reload(false);
    //     }
    // }, [openingHoursUpdated])

 

    return (
        <div className='container d-flex align-items-center justify-content-center'>
            <div className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form'>
                <div className='row'>
                    <div className='col-6 text-start'>
                        <h6>{props.day}</h6>
                    </div>
                    <div className='col-6 text-end'>
                        <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                            handleShow1();
                        }}
                        >
                        + Dodaj
                        </button>
                    </div>
                </div>
                <hr/>

                <div className='row'>
                    <div className='col-6 text-start'>
                        {/* 08:00 - 16:00 */}
                        {/* {props.openingHours.map(i => {
        return <div key={i.id}>{i.salonId}</div>;
      })} */}

        {from_hour ? 
        from_hour :
        "null"
        } - 
        {to_hour ? 
        to_hour :
        "null"
        }
                    </div>
                    <div className='col-6 text-end'>
                        icon
                    </div>
                </div>
            </div>

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Godziny Otwarcia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <div className='row'>
                        <div className='col-6'>
                            <p><b>Od</b></p>
                        </div>
                        <div className='col-6'>
                        <DatePicker
                            selected={openingHour}
                            onChange={(date) => setOpeningHour(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            dateFormat="HH:mm"
                            timeFormat='HH:mm'
                        />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p><b>Do</b></p>
                        </div>
                        <div className='col-6'>
                        <DatePicker
                            selected={closeHour}
                            onChange={(date) => setCloseHour(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            dateFormat="HH:mm"
                            timeFormat='HH:mm'
                        />
                        </div>
                    </div>
              


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose1}>
                        Anuluj
                    </Button>
                    <Button variant="outline-primary"
                        onClick={(e) => {
                            onSubmit(e)
                            handleClose1()
                            
                        }}
                        >
                        Zapisz
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default OpeningHours;