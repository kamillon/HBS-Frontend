import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { API } from '../../App';

const SalonContact = (props) => {
    const dayName = props.day
    const weekday = props.weekday
    const salonId = props.salonId

    const [openingHours, setOpeningHours] = useState([]);
    const { from_hour, to_hour, is_closed } = openingHours

    const getOpeningHours = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${API}/list-opening-hours/${salonId}/`, config);
            setOpeningHours(res.data.filter(i => i.weekday === weekday)[0])
        } catch (err) {
            setOpeningHours(null)
            console.log(err)
        }
    };

    useEffect(() => {
        if (salonId) {
            getOpeningHours()
        }
    }, [salonId, weekday])

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
                            "Zamknięte"
                    }
                </div>
            </td>
        </tr>
    );
};

export default SalonContact;