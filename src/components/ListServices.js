import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ListServices = (props) => {
    const navigate = useNavigate()
    const { salonId } = useParams()

    const convertMinsToTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        let minutesResult = minutes < 10 ? '0' + minutes : minutes;
        return `${hours ? `${hours}g ` : ''} ${minutes ? `${minutesResult}min ` : ''}`
    }

    return (
        <div>
            <table className="table table-hover">
                <tbody>
                    <tr key={props.id}>
                        <td className='w-75'>
                            <div className="ms-3">
                                <p className="fw-bold mb-1">{props.name}</p>
                                <p className="text-muted mb-0">{props.describe}</p>
                            </div>
                        </td>
                        <td className='w-25'>
                            <div className="row">
                                <div className="col-md-6 text-end">
                                    <p className="fw-bold mb-1">{props.price} zł</p>
                                    <p className="text-muted mb-0">{convertMinsToTime(props.time)}</p>
                                </div>
                                <div className="col-md-6 mt-2 mt-md-0">
                                    {props.employee.length > 0 ?
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/hairsalon/${salonId}/booking`, {
                                                state: {
                                                    serviceId: props.id,
                                                    name: props.name,
                                                    describe: props.describe,
                                                    price: props.price,
                                                    time: props.time,
                                                    employee: props.employee
                                                }
                                            })}
                                        >
                                            UMÓW
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            disabled
                                        >
                                            UMÓW
                                        </button>

                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ListServices;