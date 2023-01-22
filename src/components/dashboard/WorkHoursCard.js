import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays, setHours, setMinutes } from 'date-fns';
import moment from 'moment';

const WorkHoursCard = (props) => {
    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()
    const weekday = props.weekday
    const sId = props.sId
    const employeeId = props.employeeId
    const [workHours, setWorkHours] = useState('');
    const [salonOpeningHours, setSalonOpeningHours] = useState('');
    const [employee, setEmployee] = useState([]);
    const [openingHour, setOpeningHour] = useState(null);
    const [closeHour, setCloseHour] = useState(null);
    const [salonId, setSalonId] = useState(sId)

    const { from_hour, to_hour, is_day_off } = workHours

    const switchWeekday = (param) => {
        switch (param) {
            case 0:
                return "Niedziela";
            case 1:
                return "Poniedziałek";
            case 2:
                return "Wtorek";
            case 3:
                return "Środa";
            case 4:
                return "Czwartek";
            case 5:
                return "Piątek";
            case 6:
                return "Sobota";
            default:
                return <></>
        }
    }

    const getEmployee = async () => {
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`http://127.0.0.1:8000/employee/${employeeId}/`, config);
                setEmployee(res.data)
            } catch (err) {
                setEmployee(null)
                console.log(err)
            }
        } else {
            setEmployee(null)
            console.log("Blad")
        }
    };

    const getSalonOpeningHours = async () => {
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`http://127.0.0.1:8000/list-opening-hours/${salonId}/`, config);
                setSalonOpeningHours(res.data.filter(i => i.weekday === weekday)[0])
            } catch (err) {
                setSalonOpeningHours(null)
                console.log(err)
            }
        } else {
            setSalonOpeningHours(null)
            console.log("Blad")
        }
    };

    useEffect(() => {
        if (employeeId) {
            getEmployee()
        }
    }, [access])


    useEffect(() => {
        if (employee.salon) {
            setSalonId(employee.salon)
        }

        if (salonId) {
            getSalonOpeningHours()
        }
    }, [employee])

    useEffect(() => {
        setWorkHours({
            from_hour: props.from_hour,
            to_hour: props.to_hour,
            is_day_off: props.is_day_off,
        })
    }, [props])

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
                'Authorization': `JWT ${access}`,
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
            is_day_off: is_day_off
        });
        try {
            const res = await axios.patch(`http://127.0.0.1:8000/work-hours/${props.id}/`, body, config)
            props.setWorkHoursUpdated(true)
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (from_hour) {
            setOpeningHour(moment(from_hour, "HH:mm").toDate())
        }
        if (to_hour) {
            setCloseHour(moment(to_hour, "HH:mm").toDate())
        }
    }, [workHours])

    function onChange(event) {
        const { name, value, type, checked } = event.target
        setWorkHours(workHours => {
            return {
                ...workHours,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    let minTime = setHours(setMinutes(new Date(),
        moment(salonOpeningHours.from_hour, 'HH:mm').minute()),
        moment(salonOpeningHours.from_hour, 'HH:mm').hour()
    )

    let maxTime = setHours(setMinutes(new Date(),
        moment(salonOpeningHours.to_hour, 'HH:mm').minute()),
        moment(salonOpeningHours.to_hour, 'HH:mm').hour()
    )

    return (
        <div className='container d-flex align-items-center justify-content-center'>
            <div className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form'>
                <div className='row'>
                    <div className='col-6 text-start'>
                        <h6>{switchWeekday(weekday)}</h6>
                    </div>
                    <div className='col-6 text-end'>
                        {salonOpeningHours.is_closed ||
                            (!salonOpeningHours.is_closed &&
                                salonOpeningHours.from_hour === null &&
                                salonOpeningHours.to_hour === null) ?
                            <button
                                type="button"
                                disabled
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => {
                                    handleShow1();
                                }}
                            >
                                <i className="bi bi-pencil-fill"></i> Edytuj
                            </button>
                            :
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => {
                                    handleShow1();
                                }}
                            >
                                <i className="bi bi-pencil-fill"></i> Edytuj
                            </button>
                        }
                    </div>
                </div>
                <hr />

                <div className='row'>
                    <div className='col-6 text-start'>
                        {salonOpeningHours.is_closed ?
                            "Salon zamknięty" :
                            is_day_off ?
                                "Dzień wolny" :
                                from_hour && to_hour ?
                                    moment(from_hour, 'HH:mm:ss').format('HH:mm')
                                    + "-" +
                                    moment(to_hour, 'HH:mm:ss').format('HH:mm') :
                                    "Ustal godziny"
                        }
                    </div>
                </div>
            </div>

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>{switchWeekday(weekday)}</Modal.Title>
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
                                minTime={minTime}
                                maxTime={maxTime}
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
                                minTime={minTime}
                                maxTime={maxTime}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            <p><b>Czy dzień wolny?</b></p>
                        </div>
                        <div className='col-6'>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="is_day_off"
                                    value={is_day_off}
                                    checked={workHours.is_day_off}
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

export default WorkHoursCard;