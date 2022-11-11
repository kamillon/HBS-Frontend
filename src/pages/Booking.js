import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';
import { useAuth } from "../context/AuthContext"
import ListServices from '../components/ListServices';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import moment from 'moment';

const Booking = (props) => {
    const navigate = useNavigate()
    const { salonId } = useParams()
    const [data, setData] = useState([]);
    const location = useLocation();
    const { access, userRole, currentUser } = useAuth()

    const [selectedDate, setSelectedDate] = useState(null);

    const date14 = new Date();
    date14.setDate(date14.getDate() + 14);

    const [czas, setCzas] = useState([]);


    const holidays = [
        new Date("2022-11-15"),
        new Date("2022-11-10"),

    ];

    const timeOff = [
        setHours(setMinutes(new Date(), 0), 14),
        setHours(setMinutes(new Date(), 30), 12),
        setHours(setMinutes(new Date(), 30), 11),
        setHours(setMinutes(new Date(), 30), 17),

    ];

    const timeOff2 = [
        setHours(setMinutes(new Date(), 0), 10),

    ];



    useEffect(() => {
        const listOpeningHours = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/employee-work-hours/1/', config);

                setData(res.data)
                console.log(res.data)

            } catch (err) {
                setData(null)
                console.log(err)
            }
        };


        listOpeningHours()

        
    }, [])



    const [rowData, setRowData] = useState([]);

    useEffect(() => {
    setRowData(data.filter(i => moment(selectedDate).format("YYYY-MM-DD") === moment(i.date).format("YYYY-MM-DD")).map(item => ({
        from_hour: item.from_hour,
        to_hour: item.to_hour,
    })));
    }, [selectedDate]);
    




    // const do_godz = moment(data.od_godziny, 'HH:mm').hour()
    // console.log(moment(new Date()).day())



    const tablicaDat = data.map(i => moment(i.date, 'YYYY-MM-DD').toDate())
    // const tD = tablicaDat.filter(i => moment(i.data, 'YYYY-MM-DD').format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD"))
    // const tD = data.map(i => {
    //     moment(i.data).format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD") ?
    //     moment(i.data, 'YYYY-MM-DD').toDate():
    //     null
    // })

    const dates = []
    tablicaDat.forEach((date) => {
        if(moment(date).isAfter(moment(new Date()))){
            dates.push(date)
        }
    })

    console.log(dates)



    console.log(rowData)

    console.log(selectedDate)

    let slots = [
        { start: new Date('2022-11-13T09:00:00'), end: new Date('2022-11-13T09:30:00') },
        { start: new Date('2022-11-14T09:00:00'), end: new Date('2022-11-14T09:30:00') },
        { start: new Date('2022-11-14T09:31:00'), end: new Date('2022-11-14T09:40:00') },
        { start: new Date('2022-11-14T12:40:00'), end: new Date('2022-11-14T14:00:00') },

        ]


    return (
        <div className='container mt-5'>
            umow wizytę<br/>
            id: {location.state.serviceId}<br/>
            {location.state.name}


            <DatePicker
                className='mt-3'
                withPortal
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                calendarStartDay={1}
                dateFormat='yyyy/MM/dd'
                // minDate={new Date()}
                // maxDate={date14}
                // excludeDates={holidays}
                includeDates={dates}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={30}
                minTime={setHours(setMinutes(new Date(), 0), 8)}
                maxTime={setHours(setMinutes(new Date(), 0), moment(rowData[0]?.to_hour, 'HH:mm').hour())}
                // excludeTimes={selectedDate.getDate() == new Date().getDate() ? timeOff : timeOff2}
                filterTime={(time) => {
                    for (let i = 0; i < slots.length; i++) {
                      const e = slots[i];
  
                      var x = moment(time),
                        beforeTime = moment(e.start),
                        afterTime = moment(e.end);
  
                      if (
                        x.isBetween(beforeTime, afterTime) ||
                        x.isSame(moment(beforeTime)) ||
                        x.isSame(moment(afterTime))
                      ) {
                        return false;
                      }
                      if (i + 1 == slots.length) {
                        return true;
                      }
                    }
                  }}
            />

        </div>
    )
};

export default Booking;