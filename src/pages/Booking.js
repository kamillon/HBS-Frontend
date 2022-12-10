import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';
import { useAuth } from "../context/AuthContext"
import ListServices from '../components/ListServices';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import subDays from "date-fns/subDays";
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
// import { addDays } from 'date-fns';

import { subDays, addDays, setHours, setMinutes } from 'date-fns';
import moment from 'moment';

const Booking = () => {
    const navigate = useNavigate()
    const { salonId } = useParams()
    const [data, setData] = useState([]);
    const [workHours, setWorkHours] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [service, setService] = useState([]);

    const [employee, setEmployee] = useState([]);
    const location = useLocation();
    const { access, userRole, currentUser } = useAuth()

    const [selectedDate, setSelectedDate] = useState(new Date);

    const [rowData, setRowData] = useState({});
    const [slots2, setSlots2] = useState([]);

    const props = location.state
    // console.log(props)


    const [formData, setFormData] = useState({
        // customerId: currentUser.id,
        serviceId: props.serviceId,
        employeeId: 4,
        // date: '',
        // start_time: '',
        // end_time: '',
        is_active: false,
    });

    const [chooseDate, setChooseDate] = useState()
    const [chooseStartTime, setChooseStartTime] = useState(null)
    const [chooseEndTime, setChooseEndTime] = useState()


    console.log(chooseDate)
    console.log(chooseStartTime)

    const { customerId, serviceId, employeeId, is_active } = formData;

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


    const employeeDaysOff = [];

    workHours.forEach(function(item) {
        if ( item.is_day_off === true ) { 
            employeeDaysOff.push(item.weekday)
        }
    })
    console.log(employeeDaysOff)



    const isWeekday = (date) => {
        const day = date.getDay();
        const numbers = [0, 6, 5];
        let x = true;
        for (const element of employeeDaysOff) {
            if(day == element){
                x &&= false
            }
            else{
                x &&= true
            }
          }
          return x
    };




    useEffect(() => {
        const getEmployee = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/employee/', config);

                setEmployee(res.data.filter(i => parseInt(i.salon) === parseInt(salonId)))
                console.log(res.data)

            } catch (err) {
                setEmployee(null)
                console.log(err)
            }
        };

        const getReservation = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `JWT ${access}`,
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

        const getService = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`http://127.0.0.1:8000/service/`, config);

                setService(res.data.filter(i => parseInt(i.id) === parseInt(props.serviceId)))
                console.log(res.data)

            } catch (err) {
                setService(null)
                console.log(err)
            }
        };

        getEmployee()
        getReservation()
        getService()

    }, [])


    console.log(employee)
    console.log(reservations)
    console.log(service)


    // const [selectedEmployee, setSelectedEmployee] = useState('1')

    useEffect(() => {
        const listWorkHours = async (employeeID) => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`http://127.0.0.1:8000/employee-work-hours/${employeeID}/`, config);

                // setData(res.data.filter(i => moment(i.date).isAfter(moment(new Date()))).map(item => moment(item.date, 'YYYY-MM-DD').toDate()))
                setWorkHours(res.data)
                // setData(res.data.filter(i => moment(i.date).isAfter(moment(new Date()))).map(item => moment(item.date, 'YYYY-MM-DD').toDate()))
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
                    // 'Authorization': `JWT ${access}`,
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
    }, [employeeId])

    console.log(workHours)
    console.log(openingHours)

    useEffect(() => {
        setRowData(workHours.filter(i => i.weekday === moment(selectedDate).day()).map(item => ({
            from_hour: item.from_hour,
            to_hour: item.to_hour,
        })));

        setSlots2(reservations.map(item => ({
            start: new Date(moment(item.date + " " + item.start_time).format("YYYY-MM-DDTHH:mm:ss")),
            end: new Date(moment(item.date + " " + item.end_time).format("YYYY-MM-DDTHH:mm:ss")),
        })));


        setChooseDate(moment(selectedDate).format("YYYY-MM-DD"))
        setChooseStartTime(moment(selectedDate).format("HH:mm:ss"))
        setChooseEndTime(moment(selectedDate).add(service[0]?.time, 'minutes').format("HH:mm:ss"))

    }, [selectedDate]);

    console.log(rowData)


    // const minTime=setHours(setMinutes(new Date(), moment(rowData[0]?.from_hour, 'HH:mm').minute()), moment(rowData[0]?.from_hour, 'HH:mm').hour())

    let minTime = setHours(setMinutes(new Date(),
        moment(rowData[0]?.from_hour, 'HH:mm').minute()),
        moment(rowData[0]?.from_hour, 'HH:mm').hour()
    )

    const maxTime = setHours(setMinutes(new Date(), moment(rowData[0]?.to_hour, 'HH:mm').minute()), moment(rowData[0]?.to_hour, 'HH:mm').hour())



    console.log(chooseEndTime)

    const currentTime = setHours(setMinutes(new Date(),
        moment(new Date(), 'HH:mm').minute()),
        moment(new Date(), 'HH:mm').hour()
    )

    if (moment(selectedDate).day() === moment(new Date()).day()) {
        if (minTime < currentTime && currentTime < maxTime) {
            minTime = currentTime;
        }
    }



 



    // const do_godz = moment(data.od_godziny, 'HH:mm').hour()
    // console.log(moment(new Date()).day())



    // const tablicaDat = data.map(i => moment(i.date, 'YYYY-MM-DD').toDate())
    // const tD = tablicaDat.filter(i => moment(i.data, 'YYYY-MM-DD').format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD"))
    // const tD = data.map(i => {
    //     moment(i.data).format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD") ?
    //     moment(i.data, 'YYYY-MM-DD').toDate():
    //     null
    // })

    // const dates = []
    // data.forEach((date) => {
    //     if(moment(date).isAfter(moment(new Date()))){
    //         dates.push(date)
    //     }
    // })

    // console.log(data[0])



    console.log(rowData)
    console.log(selectedDate)

    // let slots = [
    //     { start: new Date('2022-11-13T09:00:00'), end: new Date('2022-11-13T09:30:00') },
    //     { start: new Date('2022-11-14T09:00:00'), end: new Date('2022-11-14T09:30:00') },
    //     { start: new Date('2022-11-14T09:31:00'), end: new Date('2022-11-14T09:40:00') },
    //     { start: new Date('2022-11-14T12:40:00'), end: new Date('2022-11-14T14:00:00') },

    //     ]





    console.log(selectedDate)
console.log(workHours)




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

    

    // let obj = { age: 12, name: "John Doe" };
    // workHours.forEach((val) => console.log(val.is_day_off));


    // const employeeDaysOf = [];

    // workHours.forEach(function(item,index) {
    //     if ( item.is_day_off === true ) { 
    //         employeeDaysOf.push(item.weekday)
    //     }
    // })
    // console.log(employeeDaysOf)


    // console.log(typeof openingHours)

    // for (let [key, value] of Object.entries(openingHours)) {
    //     console.log(key, value);
    // }


    // const array = [];
    
    // for(var i in openingHours){
    //     array.push([i, openingHours[i]]);
    // }
    // console.log(array)





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
                                {/* <h1 className='mb-5'>Rezerwacja</h1> */}
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


                                <div className='mb-3'>
                                    <DatePicker
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
                                        showTimeSelect
                                        timeFormat='HH:mm'
                                        timeIntervals={30}
                                        minTime={minTime}
                                        maxTime={maxTime}
                                    // excludeTimes={selectedDate.getDate() == new Date().getDate() ? timeOff : timeOff2}
                                    // filterTime={filterPassedTime}
                                    />

                                </div>
                                {access ?
                                    <button className='btn btn-primary me-1' type='submit'>Rezerwuj</button>
                                    :


                                    <button
                                        type='button'
                                        className="btn btn-primary me-1"
                                        onClick={() => navigate(`/login`, { state: { ...props, path: location.pathname } }, { replace: true })}
                                    >
                                        Rezerwuj
                                    </button>
                                }
                            </form>

                        </div>

                        <div className='col-12 col-md-6 col-lg-6 d-flex justify-content-center'>
                            umow wizytę<br />
                            id: {props.serviceId}<br />
                            {props.name}
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
};

export default Booking;