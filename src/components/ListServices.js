import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListServices = (props) => {
    const navigate = useNavigate()
    const { salonId } = useParams()

    const convertMinsToTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        let minutesResult = minutes < 10 ? '0' + minutes : minutes;
        // return `${hours}hrs:${minutes}mins`;
        // return `${hours ? `${hours}g ` : ''}${minutes}min`
        return `${hours ? `${hours}g ` : ''} ${minutes ? `${minutesResult}min ` : ''}`
    }
    
    return (
        <div>
           <table className="table table-hover">
                <tbody>
                    <tr key={props.id}>
                        <td className='w-75'>
                        <div className="ms-3">
                            <p className="fw-bold mb-1">{props.nazwa_uslugi}</p>
                            <p className="text-muted mb-0">{props.opis}</p>
                        </div>
                        </td>
                        <td className='w-25'> 
                            <div className="row">
                                <div className="col-md-6 text-end">
                                    <p className="fw-bold mb-1">{props.cena} zł</p>
                                    <p className="text-muted mb-0">{convertMinsToTime(props.czas)}</p>
                                </div>
                                <div className="col-md-6 mt-2 mt-md-0">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/hairsalon/${salonId}/booking`,{state:{
                                            serviceId: props.id,
                                            nazwa_uslugi: props.nazwa_uslugi,
                                            opis: props.opis,
                                            cena: props.cena,
                                            czas: props.czas
                                        }})}
                                    >
                                        UMÓW
                                    </button>
                                </div>
                            </div>
                        {/* <div className="ms-3">
                            <p className="fw-bold mb-1">{props.cena}</p>
                            <p className="text-muted mb-0">{props.czas}</p>
                        </div> */}
                        </td>
                        {/* <td>
                            <button
                                type="button"
                                className="btn btn-primary me-1"
                                onClick={() => navigate(`/hairsalon/${salonId}/booking/${props.id}/`)}
                            >
                                UMÓW
                            </button>
                        </td> */}
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ListServices;