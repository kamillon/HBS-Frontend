import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CardComponent = (props) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="card shadow-sm my-5 mx-2">
                <img
                    src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png"
                    className="card-img-top card-img"
                    alt="..."
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