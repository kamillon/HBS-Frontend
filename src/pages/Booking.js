import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';
import { useAuth } from "../context/AuthContext"
import ListServices from '../components/ListServices';
import checkmark from '../images/checkmark.png';
import { format } from 'date-fns'
import { subDays, addDays, setHours, setMinutes } from 'date-fns';
import { Modal, Button, Col, Row, Container } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/pl';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

const Booking = () => {
    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    const props = location.state

    const { salonId } = useParams()
    const [data, setData] = useState([]);
    const [workHours, setWorkHours] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [employee, setEmployee] = useState(props.employee);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [rowData, setRowData] = useState({});
    const [slots2, setSlots2] = useState([]);
    const [chooseDate, setChooseDate] = useState()
    const [chooseStartTime, setChooseStartTime] = useState(null)
    const [chooseEndTime, setChooseEndTime] = useState()
    const [salonData, setSalonData] = useState([]);

    const [isTime, setIsTime] = useState(false);

    const [formData, setFormData] = useState({
        serviceId: props.serviceId,
        employeeId: props.employee[0].user.id,
        is_active: false,
    });


    const { serviceId, employeeId, is_active } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value ?? e.target.checked });


    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)


    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)


    const convertMinsToTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        let minutesResult = minutes < 10 ? '0' + minutes : minutes;
        return `${hours ? `${hours}g ` : ''} ${minutes ? `${minutesResult}min ` : ''}`
    }


    const onSubmit = async e => {
        e.preventDefault();

        if (localStorage.getItem('isAuthenticated')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json',
                }
            };

            const body = JSON.stringify({
                customerId: currentUser.id,
                serviceId: serviceId,
                salonId: salonId,
                employeeId: employeeId,
                date: chooseDate,
                start_time: chooseStartTime,
                end_time: chooseEndTime,
                is_active: is_active
            });

            try {

                const res = await axios.post(`http://127.0.0.1:8000/reservation/`, body, config);
                console.log(res.data)
                handleShow2()
            }
            catch (error) {
                console.log(error)
            }
        }
    };

    useEffect(() => {
        const getReservation = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/reservation/', config);

                setReservations(res.data)
                console.log(res.data)

            } catch (err) {
                setReservations(null)
                console.log(err)
            }
        };

        const getSalon = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/salon/', config);

                setSalonData(res.data.filter(i => i.id == salonId))
                console.log(res.data)

            } catch (err) {
                setSalonData(null)
                console.log(err)
            }
        };

        getReservation()
        getSalon()
    }, [])


    const employeeDaysOff = [];

    openingHours.forEach(function (item) {
        if (item.is_closed === true) {
            employeeDaysOff.push(item.weekday)
        }
    })

    workHours.forEach(function (item) {
        if (item.from_hour == null && item.to_hour == null && item.is_day_off === false) {
            employeeDaysOff.push(item.weekday)
        }

        if (item.is_day_off === true) {
            employeeDaysOff.push(item.weekday)
        }
    })


    const isWeekday = (date) => {
        const day = date.getDay();
        let x = true;
        for (const element of employeeDaysOff) {
            if (day == element) {
                x &&= false
            }
            else {
                x &&= true
            }
        }
        return x
    };


    useEffect(() => {
        const listWorkHours = async (employeeID) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`http://127.0.0.1:8000/employee-work-hours/${employeeID}/`, config);
                setWorkHours(res.data)
                console.log(res.data)
            } catch (err) {
                setWorkHours(null)
                console.log(err)
            }

        };

        const listOpeningHours = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`http://127.0.0.1:8000/list-opening-hours/${salonId}/`, config);
                setOpeningHours(res.data)
                console.log(res.data)

            } catch (err) {
                setOpeningHours(null)
                console.log(err)
            }
        };


        if (employeeId) {
            listWorkHours(employeeId)
        }
        if (salonId) {
            listOpeningHours()
        }

        setSelectedEmployee(employee.filter(i => i.user.id == employeeId))
        setSelectedDate(null)
        setSelectedTime(null)

    }, [employeeId])



    useEffect(() => {
        setSelectedTime(selectedDate)
        setIsTime(false)
    }, [selectedDate]);

    useEffect(() => {
        setRowData(workHours.filter(i => i.weekday === moment(selectedDate).day()).map(item => ({
            from_hour: item.from_hour,
            to_hour: item.to_hour,
        })));

        setSlots2(reservations.map(item => ({
            start: new Date(moment(item.date + " " + item.start_time).format("YYYY-MM-DDTHH:mm:ss")),
            end: new Date(moment(item.date + " " + item.end_time).format("YYYY-MM-DDTHH:mm:ss")),
            reservationEmployeeId: item.employeeId,
        })));


        // setChooseDate(moment(selectedDate).format("YYYY-MM-DD"))
        // setChooseStartTime(moment(selectedDate).format("HH:mm:ss"))
        // setChooseEndTime(moment(selectedDate).add(props.time, 'minutes').format("HH:mm:ss"))
        setChooseDate(moment(selectedDate).format("YYYY-MM-DD"))
        setChooseStartTime(moment(selectedTime).format("HH:mm:ss"))
        setChooseEndTime(moment(selectedTime).add(props.time, 'minutes').format("HH:mm:ss"))

    }, [workHours, reservations, selectedDate, selectedTime]);


    let minTime = setHours(setMinutes(new Date(),
        moment(rowData[0]?.from_hour, 'HH:mm').minute()),
        moment(rowData[0]?.from_hour, 'HH:mm').hour()
    )

    let maxTime = setHours(setMinutes(new Date(),
        moment(rowData[0]?.to_hour, 'HH:mm').subtract(props.time, 'minutes').minute()),
        moment(rowData[0]?.to_hour, 'HH:mm').subtract(props.time, 'minutes').hour()
    )


    const currentTime = setHours(setMinutes(new Date(),
        moment(new Date(), 'HH:mm').minute()),
        moment(new Date(), 'HH:mm').hour()
    )


    // if (moment(selectedDate).day() === moment(new Date()).day()) {
        if (moment(selectedDate).format("LL") === moment(new Date()).format("LL")) {
        if (minTime < currentTime && currentTime < maxTime) {
            minTime = currentTime;
        }
        else if (minTime < currentTime && currentTime > maxTime) {
            minTime = currentTime;
            maxTime = currentTime;
        }
    }


    const filterPassedTime = (time) => {
        for (let i = 0; i < slots2.length; i++) {
            const e = slots2[i];

            if (e.reservationEmployeeId == employeeId) {
                const x = moment(time),
                    beforeTime = moment(e.start),
                    afterTime = moment(e.end);
                if (
                    x.isBetween(beforeTime, afterTime) ||
                    x.isSame(moment(beforeTime)) ||
                    x.isSame(moment(afterTime))
                ) {
                    return false;
                }
            }
            if (i + 1 == slots2.length) {
                return true;
            }
        }
    };

    return (
        <div className='container mt-5'>
            <div className='mt-5 align-items-center justify-content-center'>
                <div className='row p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded'>
                    <div className='col-12 text-center'>
                        <h1 className='mb-5'>Rezerwacja</h1>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-7 d-flex'>
                            <form id='bookingForm' className='' onSubmit={e => onSubmit(e)}>
                                <div className="mb-3">
                                    <label className="FormControlSelect">Wybierz pracownika</label>
                                    <select className="form-select mt-2" name='employeeId' value={employeeId} onChange={e => onChange(e)}>
                                        {employee.map(employee => (
                                            <option key={employee.user.id} value={employee.user.id}>
                                                {employee.user.first_name + ' ' + employee.user.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div className='mb-3'>
                                    // <DatePicker
                                    //     className='mt-3'
                                    //     // withPortal
                                    //     inline
                                    //     selected={selectedDate}
                                    //     onChange={date => setSelectedDate(date)}
                                    //     calendarStartDay={1}
                                    //     dateFormat='yyyy/MM/dd'
                                    //     minDate={new Date()}
                                    //     maxDate={addDays(new Date(), 14)}
                                    //     // excludeDates={holidays}
                                    //     // includeDates={data}
                                    //     filterDate={isWeekday}
                                    //     showTimeSelect
                                    //     timeFormat='HH:mm'
                                    //     timeIntervals={30}
                                    //     minTime={minTime}
                                    //     maxTime={maxTime}
                                    // // excludeTimes={selectedDate.getDate() == new Date().getDate() ? timeOff : timeOff2}
                                    //     filterTime={filterPassedTime}
                                    // /> */}

                                <div className='mb-3 d-flex flex-row'>
                                    <div>
                                        <DatePicker
                                            locale="pl"
                                            className='mt-3'
                                            // withPortal
                                            inline
                                            selected={selectedDate}
                                            onChange={date => { setSelectedDate(date); setSelectedTime(date) }}
                                            calendarStartDay={1}
                                            dateFormat='yyyy/MM/dd'
                                            minDate={new Date()}
                                            maxDate={addDays(new Date(), 14)}
                                            filterDate={isWeekday}
                                        />
                                    </div>
                                    <div>
                                        <DatePicker
                                            locale="pl"
                                            inline
                                            selected={selectedTime}
                                            onChange={(date) => { setSelectedTime(date); setIsTime(true) }}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeCaption="Godzina"
                                            dateFormat="h:mm aa"
                                            timeFormat='HH:mm'
                                            timeIntervals={15}
                                            minTime={minTime}
                                            maxTime={maxTime}
                                            filterTime={filterPassedTime}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className='col-12 col-md-6 col-lg-5 ps-5'>
                            <h5>Szczegóły rezerwacji</h5>
                            <hr />
                            <div className="row">
                                <div className="col-12 text-start">
                                    <div className='fw-bold'>Usługa</div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            {props.name}
                                        </div>
                                        <div className='col-6 text-end'>
                                            {props.price} zł
                                        </div>

                                    </div>
                                    <div className='text-muted'><small>{convertMinsToTime(props.time)}</small></div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-12 text-start">
                                    <div><b>Data i godzina</b></div>
                                    <div>
                                        {selectedDate && isTime ?
                                            moment(chooseDate).format("DD-MM-YYYY")
                                            + ", " +
                                            moment(chooseStartTime, 'HH:mm:ss').format('HH:mm') :
                                            <></>}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-12 text-start">
                                    <div><b>Pracownik</b></div>
                                    <div>
                                        {selectedEmployee[0]?.user.first_name + " " +
                                            selectedEmployee[0]?.user.last_name}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-12 text-start">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <b>Razem</b>
                                        </div>
                                        <div className='col-6 text-end'>
                                            {props.price} zł
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {employeeId && selectedDate && isTime && userRole === "customer" ?
                                access ?
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100 mt-4"
                                        onClick={() => {
                                            handleShow1();
                                        }}
                                    >
                                        Rezerwuj
                                    </button>
                                    :
                                    <button
                                        type='button'
                                        className="btn btn-primary w-100 mt-4"
                                        onClick={() => navigate(`/login`,
                                            { state: { ...props, path: location.pathname } },
                                            { replace: true })
                                        }
                                    >
                                        Rezerwuj
                                    </button>
                                :
                                <button className='btn btn-primary w-100 mt-4' disabled>Rezerwuj</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show1} onHide={handleClose1} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie rezerwacji</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='text-center'>
                        {selectedDate &&
                            format(new Date(selectedDate), 'EEEE, dd MMMM yyyy', {
                                locale: pl,
                            })}
                    </h5>
                    <div className='text-center'>
                        {moment(chooseStartTime, 'HH:mm:ss').format('HH:mm')} -
                        {moment(chooseEndTime, 'HH:mm:ss').format('HH:mm')}
                    </div>
                    <div className='text-center text-muted mb-5'>
                        {salonData[0]?.name}
                    </div>

                    <h6>Wybrane usługi</h6>
                    <Container className='p-4 shadow-sm bg-light rounded'>
                        <Row>
                            <Col xs={12} md={4}>
                                <div>
                                    {selectedEmployee[0]?.user.first_name + " " +
                                        selectedEmployee[0]?.user.last_name}
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div>{props.name}</div>
                                <div className='text-muted'><small>{convertMinsToTime(props.time)}</small></div>
                            </Col>
                            <Col xs={12} md={4} className='text-end'>
                                <div>{props.price} zł</div>
                            </Col>
                        </Row>
                    </Container>
                    <hr />
                    <h6>Metody płatności</h6>
                    <Container className='p-4 shadow-sm bg-light rounded'>
                        <Row>
                            <Col>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioPaymentMethod"
                                        id="paymentMethod"
                                        defaultChecked />
                                    <label
                                        className="form-check-label"
                                        htmlFor="paymentMethod">
                                        Płatność w salonie
                                    </label>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Container className='p-2 text-end'>
                        <Row>
                            <Col>
                                Łącznie do zapłaty:
                                <h5>{props.price} zł</h5>
                            </Col>
                        </Row>
                    </Container>

                    <Button
                        type='submit'
                        variant='primary'
                        form='bookingForm'
                        className='w-100'
                        onClick={(e) => {
                            handleClose1()
                        }}>
                        Potwierdź i umów
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={show2} onHide={handleClose2}>
                <Modal.Body>
                    <div className='text-center'>
                        <img src={checkmark} style={{ width: "15%" }} alt="checkmark" />
                        <h5 className='mt-3'>Wizyta potwierdzona</h5>
                        <h5 className='text-center'>
                            {selectedDate &&
                                format(new Date(selectedDate), 'EEEE, dd MMMM yyyy', {
                                    locale: pl,
                                })}
                        </h5>
                        <div className='text-center'>
                            {moment(chooseStartTime, 'HH:mm:ss').format('HH:mm')} -
                            {moment(chooseEndTime, 'HH:mm:ss').format('HH:mm')}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={(e) => {
                            handleClose2()
                            navigate(`/`)
                        }}
                        className='w-100'>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default Booking;