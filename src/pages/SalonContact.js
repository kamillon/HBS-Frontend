import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"
import moment from 'moment';

const SalonContact = (props) => {
    const { access } = useAuth()
    const dayName = props.day
    const weekday = props.weekday
    const salonId = props.salonId

    const [openingHours, setOpeningHours] = useState([]);
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
                    const res = await axios.get(`http://127.0.0.1:8000/list-opening-hours/${salonId}/`, config);
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

        if (salonId) {
            getOpeningHours()
        }
    }, [salonId, access, weekday])

    return (
        <tr>
            <td className='w-50'>
                <div>
                    <p>{dayName}</p>
                </div>
            </td>
            <td className='w-50'>
                <div className="text-end">
                    {is_closed ?
                        "Zamknięte" :
                        from_hour && to_hour ?
                            moment(from_hour, 'HH:mm:ss').format('HH:mm')
                            + "-" +
                            moment(to_hour, 'HH:mm:ss').format('HH:mm') :
                            "Nie ustalono"
                    }
                </div>
            </td>
        </tr>
    );
};

export default SalonContact;