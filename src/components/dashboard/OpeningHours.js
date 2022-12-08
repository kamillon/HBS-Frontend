import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

    const { uid } = useParams()
    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()

    const dayName = props.day
    const weekday = props.weekday

    const initialState = {
        from_hour: '',
        to_hour: '',
        is_closed: '',
    };

    const [openingHours, setOpeningHours] = useState(initialState);
    const [openingHour, setOpeningHour] = useState(null);
    const [closeHour, setCloseHour] = useState(null);

    const { from_hour, to_hour, is_closed } = openingHours


    useEffect(() => {
        const getOpeningHours = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const res = await axios.get(`http://127.0.0.1:8000/list-opening-hours/${uid}/`, config);
                    setOpeningHours(res.data.filter(i => i.weekday === weekday)[0])
                    // console.log(res.data)
                } catch (err) {
                    setOpeningHours(null)
                    console.log(err)
                }
            } else {
                setOpeningHours(null)
                console.log("Blad")
            }
        };

        if (uid) {
            getOpeningHours()
        }
    }, [uid, access, userRole])


    const [openingHoursUpdated, setOpeningHoursUpdated] = useState(false);
    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)
    let fHour;
    let tHour;


    const onSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };

        if (openingHour) {
            fHour = moment(openingHour).format("HH:mm:ss")
        }
        else {
            fHour = null
        }

        if (closeHour) {
            tHour = moment(closeHour).format("HH:mm:ss")
        }
        else {
            tHour = null
        }

        const body = JSON.stringify({
            from_hour: fHour,
            to_hour: tHour,
            is_closed: is_closed
        });

        try {
            const res = await axios.patch(`http://127.0.0.1:8000/opening-hours/${openingHours.id}/`, body, config)
            // console.log(res.data)
            setOpeningHoursUpdated(true);

        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (openingHoursUpdated) {
            window.location.reload(false);
        }
    }, [openingHoursUpdated])


    useEffect(() => {
        if (from_hour) {
            setOpeningHour(moment(from_hour, "HH:mm").toDate())
        }
        if (to_hour) {
            setCloseHour(moment(to_hour, "HH:mm").toDate())
        }
    }, [openingHours])


    function onChange(event) {
        const { name, value, type, checked } = event.target
        setOpeningHours(openingHours => {
            return {
                ...openingHours,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }


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
                            + Edytuj
                        </button>
                    </div>
                </div>
                <hr />

                <div className='row'>
                    <div className='col-6 text-start'>
                        {is_closed ?
                            "Zamknięte" :
                            from_hour && to_hour ?
                                moment(from_hour, 'HH:mm:ss').format('HH:mm')
                                + "-" +
                                moment(to_hour, 'HH:mm:ss').format('HH:mm') :
                                "Ustal godziny"
                        }
                    </div>
                    <div className='col-6 text-end'>
                        icon
                    </div>
                </div>
            </div>

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>{dayName}</Modal.Title>
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

                    <div className='row'>
                        <div className='col-6'>
                            <p><b>Czy zamknięte?</b></p>
                        </div>
                        <div className='col-6'>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="is_closed"
                                    value={is_closed}
                                    checked={openingHours.is_closed}
                                    onChange={e => onChange(e)}
                                />
                            </div>
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