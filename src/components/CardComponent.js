import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import hair_salon from '../images/hair_salon.png';


const CardComponent = (props) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="card shadow-sm my-5 mx-2" onClick={() => navigate(`/hairsalon/${props.id}`)} style={{ cursor: "pointer" }}>
                <img
                    src={hair_salon}
                    className="card-img-top card-img"
                    alt="hair_salon_picture"
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">ul. {props.ulica} {props.nr_budynku}<br />{props.miejscowosc}</p>
                    <div className="btn-div mt-auto">
                        <button
                            type='button'
                            className="btn btn-primary"
                            onClick={() => navigate(`/hairsalon/${props.id}`)}
                        >
                            Wybierz
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

};

export default CardComponent;