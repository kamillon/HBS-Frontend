import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';
import { useAuth } from "../../context/AuthContext"
import { subDays, addDays, setHours, setMinutes } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import 'moment/locale/pl';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import { format } from 'date-fns'
import LoadingSpinner from '../../components/LoadingSpinner';
import BookingSummaryModal from '../../components/Booking/BookingSummaryModal';
import SuccessModal from '../../components/SuccessModal';
import ErrorModal from '../../components/ErrorModal';
import { API } from '../../App';
registerLocale("pl", pl);

const Booking = () => {
    const { access, userRole, currentUser, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    const props = location.state
    const { salonId } = useParams()
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
    const [isLoading, setIsLoading] = useState(false)


    const phoneRegExp = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/

    const formik = useFormik({
        initialValues: {
            serviceId: props.serviceId,
            employeeId: props.employee[0].user.id,
            is_active: false,
            phone: props.customer ? props.customer.phone : currentUser?.phone,
            email: props.customer ? props.customer.email : currentUser?.email,
            price: props.price,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Wprowadź poprawny adres e-mail')
                .required('Pole jest wymagane'),
            phone: Yup.string()
                .matches(phoneRegExp, 'Wprowadzony numer telefonu jest nieprawidłowy')
                .max(9, "Nr telefonu musi zawierać 9 znaków")
                .required("Pole jest wymagane"),
        }),
        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });


    const { serviceId, employeeId, is_active, phone, email, price } = formik.values;

    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)


    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)

    const [show3, setShow3] = useState(false)
    const handleShow3 = () => setShow3(true)
    const handleClose3 = () => setShow3(false)


    const convertMinsToTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        let minutesResult = minutes < 10 ? '0' + minutes : minutes;
        return `${hours ? `${hours}g ` : ''} ${minutes ? `${minutesResult}min ` : ''}`
    }


    const onSubmit = async e => {
        e.preventDefault();
        setIsLoading(true)

        if (isAuthenticated) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json',
                }
            };

            const body = JSON.stringify({
                customerId: props.customer ? props.customer.id : currentUser.id,
                serviceId: serviceId,
                salonId: salonId,
                employeeId: employeeId,
                date: chooseDate,
                start_time: chooseStartTime,
                end_time: chooseEndTime,
                is_active: is_active,
                phone: phone,
                email: email,
                price: price
            });

            try {
                const res = await axios.post(`${API}/reservation/`, body, config);
                setIsLoading(false)
                handleShow2()
            }
            catch (error) {
                console.log(error)
                setIsLoading(false)
                handleShow3()
            }
        }
    };

    const getReservation = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${API}/reservation/`, config);
            setReservations(res.data)

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
            const res = await axios.get(`${API}/salon/${salonId}/`, config);
            setSalonData(res.data)

        } catch (err) {
            setSalonData(null)
            console.log(err)
        }
    };

    const listWorkHours = async (employeeID) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${API}/employee-work-hours/${employeeID}/`, config);
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
            const res = await axios.get(`${API}/list-opening-hours/${salonId}/`, config);
            setOpeningHours(res.data)
        } catch (err) {
            setOpeningHours(null)
            console.log(err)
        }
    };

    useEffect(() => {
        getReservation()
        getSalon()
    }, [])


    useEffect(() => {
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

        setChooseDate(moment(selectedDate).format("YYYY-MM-DD"))
        setChooseStartTime(moment(selectedTime).format("HH:mm:ss"))
        setChooseEndTime(moment(selectedTime).add(props.time, 'minutes').format("HH:mm:ss"))

    }, [workHours, reservations, selectedDate, selectedTime]);

    const currentTime = setHours(setMinutes(new Date(),
        moment(new Date(), 'HH:mm').minute()),
        moment(new Date(), 'HH:mm').hour()
    )


    let minTime = currentTime
    let maxTime = currentTime

    if (rowData.length > 0) {
        minTime = setHours(setMinutes(new Date(),
            moment(rowData[0]?.from_hour, 'HH:mm').minute()),
            moment(rowData[0]?.from_hour, 'HH:mm').hour()
        )
        maxTime = setHours(setMinutes(new Date(),
            moment(rowData[0]?.to_hour, 'HH:mm').subtract(props.time, 'minutes').minute()),
            moment(rowData[0]?.to_hour, 'HH:mm').subtract(props.time, 'minutes').hour()
        )
    }

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
        if (slots2.length > 0) {
            for (let i = 0; i < slots2.length; i++) {
                const e = slots2[i];
                if (e.reservationEmployeeId == employeeId) {
                    const x = moment(time),
                        beforeTime = moment(e.start),
                        afterTime = moment(e.end);
                    if (
                        x.isBetween(beforeTime, afterTime) ||
                        x.isSame(moment(beforeTime))
                    ) {
                        return false;
                    }
                }
                if (i + 1 == slots2.length) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };

    return (
        <div className='container mt-5'>
            {isLoading ?
                <LoadingSpinner />
                :
                <>
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
                                            <select className="form-select mt-2"
                                                name='employeeId'
                                                value={employeeId}
                                                onChange={formik.handleChange}
                                            >
                                                {employee.map(employee => (
                                                    <option key={employee.user.id} value={employee.user.id}>
                                                        {employee.user.first_name + ' ' + employee.user.last_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mb-3 d-flex flex-row'>
                                            <div>
                                                <DatePicker
                                                    locale="pl"
                                                    className='mt-3'
                                                    inline
                                                    selected={selectedDate}
                                                    onChange={date => { setSelectedDate(date); setSelectedTime(date) }}
                                                    calendarStartDay={1}
                                                    dateFormat='yyyy/MM/dd'
                                                    minDate={new Date()}
                                                    maxDate={addDays(new Date(), 28)}
                                                    filterDate={isWeekday}
                                                />
                                            </div>
                                            {selectedDate &&
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
                                            }
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

                                    {employeeId && selectedDate && isTime ?
                                        access ?
                                            userRole === "customer" ||
                                                ((userRole === "salon_owner" || userRole === "employee") && props.customer) ?
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
                                                <button className='btn btn-primary w-100 mt-4' disabled>Rezerwuj</button>
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

                    <BookingSummaryModal
                        show1={show1}
                        handleClose1={handleClose1}
                        selectedDate={selectedDate}
                        chooseStartTime={chooseStartTime}
                        chooseEndTime={chooseEndTime}
                        salonData={salonData}
                        selectedEmployee={selectedEmployee}
                        name={props.name}
                        time={props.time}
                        price={props.price}
                        formik={formik}
                        convertMinsToTime={convertMinsToTime}
                    />

                    <SuccessModal
                        show={show2}
                        handleClose={handleClose2}
                        title={"Wizyta potwierdzona"}
                        onClick={(e) => {
                            handleClose2()
                            navigate(`/`)
                        }}
                    >
                        <h5 className='text-center'>
                            {selectedDate &&
                                format(new Date(selectedDate), 'EEEE, dd MMMM yyyy', {
                                    locale: pl,
                                })}
                        </h5>
                        <div className='text-center'>
                            {moment(chooseStartTime, 'HH:mm:ss').format('HH:mm') + " - " +
                                moment(chooseEndTime, 'HH:mm:ss').format('HH:mm')}
                        </div>
                    </SuccessModal>

                    <ErrorModal
                        show={show3}
                        handleClose={handleClose3}
                        title={"Oops! Coś poszło nie tak"}
                        onClick={(e) => {
                            handleClose3()
                            window.location.reload(false);
                        }}
                    >
                        <div className='text-center mt-2'>
                            Prawdopodonie wybrany termin został już zarezerwowany.
                            Prosimy spróbować jeszcze raz
                        </div>
                    </ErrorModal>
                </>
            }
        </div>
    )
};

export default Booking;