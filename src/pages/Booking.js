import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';
import { useAuth } from "../context/AuthContext"
import ListServices from '../components/ListServices';
import { subDays, addDays, setHours, setMinutes } from 'date-fns';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

// import subDays from "date-fns/subDays";
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
// import { addDays } from 'date-fns';


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

    const [formData, setFormData] = useState({
        serviceId: props.serviceId,
        employeeId: props.employee[0].user.id,
        is_active: false,
    });

    const { serviceId, employeeId, is_active } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value ?? e.target.checked });

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

        getReservation()
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
        // const numbers = [0, 6, 5];
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

        //gdy zmienimy pracownika ustalamy wybraną datę i godzinę na null
        setSelectedDate(null)
        setSelectedTime(null)

    }, [employeeId])



    useEffect(() => {
        setRowData(workHours.filter(i => i.weekday === moment(selectedDate).day()).map(item => ({
            from_hour: item.from_hour,
            to_hour: item.to_hour,
        })));

        setSlots2(reservations.map(item => ({
            start: new Date(moment(item.date + " " + item.start_time).format("YYYY-MM-DDTHH:mm:ss")),
            end: new Date(moment(item.date + " " + item.end_time).format("YYYY-MM-DDTHH:mm:ss")),
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

    console.log(minTime)
    let maxTime = setHours(setMinutes(new Date(),
        moment(rowData[0]?.to_hour, 'HH:mm').minute()),
        moment(rowData[0]?.to_hour, 'HH:mm').hour()
    )


    const currentTime = setHours(setMinutes(new Date(),
        moment(new Date(), 'HH:mm').minute()),
        moment(new Date(), 'HH:mm').hour()
    )

    if (moment(selectedDate).day() === moment(new Date()).day()) {
        if (minTime < currentTime && currentTime < maxTime) {
            minTime = currentTime;
        }
        else if (minTime < currentTime && currentTime > maxTime) {
            minTime = currentTime;
            maxTime = currentTime;
        }
    }

    console.log(moment(selectedDate).day())
    console.log(moment(new Date()).day())
    console.log((moment(selectedDate).day() === moment(new Date()).day()))
    console.log(currentTime)
    console.log(minTime)


    const filterPassedTime = (time) => {
        for (let i = 0; i < slots2.length; i++) {
            const e = slots2[i];

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
            if (i + 1 == slots2.length) {
                return true;
            }
        }
    };

    // function getTimeStops(start, end){
    //     var startTime = moment(start, 'HH:mm');
    //     var endTime = moment(end, 'HH:mm');

    //     if( endTime.isBefore(startTime) ){
    //       endTime.add(1, 'day');
    //     }

    //     var timeStops = [];

    //     while(startTime <= endTime){
    //       timeStops.push(new moment(startTime).format('HH:mm'));
    //       startTime.add(15, 'minutes');
    //     }
    //     return timeStops;
    //   }

    //   var timeStops = getTimeStops('11:00', '02:00');
    //   console.log('timeStops ', timeStops);
    //   timeStops = getTimeStops('11:00', '23:59');
    //   console.log('timeStops ', timeStops);


    console.log(chooseDate)
    console.log(chooseStartTime)
    console.log(employeeDaysOff)
    console.log(employee)
    console.log(reservations)
    console.log(workHours)
    console.log(openingHours)
    console.log(rowData)
    console.log(chooseStartTime)
    console.log(chooseEndTime)
    console.log(rowData)
    console.log(selectedDate)
    console.log(selectedTime)
    console.log(workHours)


    return (

        <div className='container mt-5'>
            <div className='container mt-5 align-items-center justify-content-center'>
                <div className='row p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded'>
                    <div className='col-12 text-center'>
                        <h1>Rezerwacja</h1>
                        <p className='mb-5'>Wybierz date</p>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 d-flex justify-content-center'>
                            <form className='' onSubmit={e => onSubmit(e)}>
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

                                <div className='mb-3'>
                                    <DatePicker
                                        locale="pl"
                                        className='mt-3'
                                        // withPortal
                                        inline
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)}
                                        calendarStartDay={1}
                                        dateFormat='yyyy/MM/dd'
                                        minDate={new Date()}
                                        maxDate={addDays(new Date(), 14)}
                                        // excludeDates={holidays}
                                        // includeDates={data}
                                        filterDate={isWeekday}
                                    // showTimeSelect
                                    // timeFormat='HH:mm'
                                    // timeIntervals={30}
                                    // minTime={minTime}
                                    // maxTime={maxTime}
                                    // filterTime={filterPassedTime}
                                    />

                                    <DatePicker
                                        locale="pl"
                                        inline
                                        selected={selectedTime}
                                        onChange={(date) => setSelectedTime(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        timeFormat='HH:mm'
                                        timeIntervals={30}
                                        minTime={minTime}
                                        maxTime={maxTime}
                                        filterTime={filterPassedTime}
                                    />
                                </div>

                                {employeeId && selectedDate && selectedTime ?
                                    access ?
                                        // <button className='btn btn-primary me-1' type='submit'>Rezerwuj</button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            // onClick={() => navigate(`/hairsalon/${salonId}/booking/details/`)}
                                            onClick={() => navigate(`/hairsalon/${salonId}/booking/details`, {
                                                state: {
                                                    serviceId: serviceId,
                                                    name: props.name,
                                                    describe: props.describe,
                                                    price: props.price,
                                                    time: props.time,
                                                    chooseDate: chooseDate,
                                                    chooseStartTime: chooseStartTime,
                                                    chooseEndTime: chooseEndTime,
                                                    selectedEmployee: selectedEmployee,
                                                }
                                            })}
                                        >
                                            Rezerwuj
                                        </button>
                                        :
                                        <button
                                            type='button'
                                            className="btn btn-primary me-1"
                                            onClick={() => navigate(`/login`,
                                                { state: { ...props, path: location.pathname } },
                                                { replace: true })
                                            }
                                        >
                                            Rezerwuj
                                        </button>
                                    :
                                    <button className='btn btn-primary me-1' disabled>Rezerwuj</button>
                                }
                            </form>
                        </div>

                        <div className='col-12 col-md-6 col-lg-6 text-center'>
                            <p>
                                umow wizytę<br />
                                id: {props.serviceId}<br />
                                {props.name}<br />
                                pracownik: {selectedEmployee[0]?.user.first_name + " " +
                                    selectedEmployee[0]?.user.last_name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Booking;