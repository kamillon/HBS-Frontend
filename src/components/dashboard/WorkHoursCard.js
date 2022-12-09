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


const WorkHoursCard = (props) => {

    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()

    const weekday = props.weekday

    const initialState = {
        from_hour: props.from_hour,
        to_hour: props.to_hour,
        is_day_off: props.is_day_off,
    };

    const [workHours, setWorkHours] = useState(initialState);
    const [workHours2, setWorkHours2] = useState(initialState);
    const [employee, setEmployee] = useState([]);

    const [openingHour, setOpeningHour] = useState(null);
    const [closeHour, setCloseHour] = useState(null);
    const [salonId, setSalonId] = useState(null)

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



    useEffect(() => {
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
                    const res = await axios.get(`http://127.0.0.1:8000/employee/${currentUser.id}/`, config);
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

        
        getEmployee()
    }, [access])


    useEffect(() => {
        const getWorkHours2 = async () => {
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
                    setWorkHours2(res.data.filter(i => i.weekday === weekday)[0])
                    // console.log(res.data)
                } catch (err) {
                    setWorkHours2(null)
                    console.log(err)
                }
            } else {
                setWorkHours2(null)
                console.log("Blad")
            }
        };




        if (employee.salon) {
            setSalonId(employee.salon)
        }

        if(salonId){
            getWorkHours2()
        }

        
        
    }, [employee])




    const [workHoursUpdated, setWorkHoursUpdated] = useState(false);
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
            is_day_off: is_day_off
        });

        try {
            const res = await axios.patch(`http://127.0.0.1:8000/work-hours/${props.id}/`, body, config)
            // console.log(res.data)
            setWorkHoursUpdated(true);

        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (workHoursUpdated) {
            window.location.reload(false);
        }
    }, [workHoursUpdated])


    useEffect(() => {
        if (from_hour) {
            setOpeningHour(moment(from_hour, "HH:mm").toDate())
        }
        if (to_hour) {
            setCloseHour(moment(to_hour, "HH:mm").toDate())
        }
        

        
    }, [workHours])

    // useEffect(() => {
    

    //     const onSubmit2 = (params) => {    
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'Authorization': `JWT ${access}`,
    //                 'Accept': 'application/json'
    //             }
    //         };
    
    
    //         const body = JSON.stringify({
    //             is_day_off: params
    //         });
    
    //         try {
    //             const res = axios.patch(`http://127.0.0.1:8000/work-hours/${props.id}/`, body, config)
    //             // console.log(res.data)
    //             // setWorkHoursUpdated(true);
    
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }
    //     };






    // //    console.log(workHours2.is_closed)
        
    //     if(workHours2.is_closed == true){
    //         onSubmit2(true)
    //         console.log(workHours)
    //     }
    //     else if(workHours2.is_closed == false){
    //         onSubmit2(false)
    //     }
        
    // }, [workHours2])

    


    function onChange(event) {
        const { name, value, type, checked } = event.target
        setWorkHours(workHours => {
            return {
                ...workHours,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    let minTime=setHours(setMinutes(new Date(), 
    moment(workHours2.from_hour, 'HH:mm').minute()), 
    moment(workHours2.from_hour, 'HH:mm').hour()
    )

    let maxTime=setHours(setMinutes(new Date(), 
    moment(workHours2.to_hour, 'HH:mm').minute()), 
    moment(workHours2.to_hour, 'HH:mm').hour()
    )

    return (
        <div className='container d-flex align-items-center justify-content-center'>
            <div className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form'>
                <div className='row'>
                    <div className='col-6 text-start'>
                        <h6>{switchWeekday(weekday)}</h6>
                    </div>
                    <div className='col-6 text-end'>
                        {!workHours2.is_closed ?
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => {
                                handleShow1();
                            }}
                        >
                            + Edytuj
                        </button>
                        :
                        <button
                            type="button"
                            disabled
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => {
                                handleShow1();
                            }}
                        >
                            + Edytuj
                        </button>
                        }
                    </div>
                </div>
                <hr />

                <div className='row'>
                    <div className='col-6 text-start'>
                        {/* {is_day_off ?
                            "Dzień wolny" :
                            from_hour && to_hour ?
                                moment(from_hour, 'HH:mm:ss').format('HH:mm')
                                + "-" +
                                moment(to_hour, 'HH:mm:ss').format('HH:mm') :
                                "Ustal godziny"
                        } */}

                        {/* {workHours2.is_closed ?
                            "Dzień wolny" :
                            from_hour && to_hour ?
                                moment(from_hour, 'HH:mm:ss').format('HH:mm')
                                + "-" +
                                moment(to_hour, 'HH:mm:ss').format('HH:mm') :
                                "Ustal godziny"
                        } */}

                        {workHours2.is_closed ?
                            "Salon zamkniety" :
                            is_day_off ?
                            "Dzień wolny" :
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
                            <p><b>Czy zamknięte?</b></p>
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