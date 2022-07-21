import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HairdressingSalonList.css'

const HairdressingSalonList = (props) => {
    const navigate = useNavigate()
    
    return (
        <div className='ps-5 pe-5'>
            <div className='col-12 col-md-6 col-lg-12 d-flex justify-content-center listItem'>
                <img
                    src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png"
                    className="siImg"
                    alt="..."
                />
                <div className='siDesc'>
                    <h1 className='siTitle'>{props.title}</h1>
                    <span className='siDistance'>ul. {props.ulica} {props.nr_budynku}, {props.miejscowosc}</span>
                    <span className='siTaxiOp'>Free airport taxi</span>
                    <span className='siSubtitle'>
                        Studio Apartment with air
                    </span>
                    <span className='siFeatures'>
                        Entrie studio - 1 bathroom - 21
                    </span>
                    <span className='siCancelOp'>Free cancellation</span>
                    <span className='siCancelOpSubtitle'>you can cancel later</span>
                </div>
                <div className='siDetails'>
                    <div className='siRating'>
                        <span>Excellent</span>
                        <button>8.9</button>
                    </div>
                    <div className='siDetailTexts'>
                        <span className='siPrice'>$123</span>
                        <span className='siTaxOp'>includes taxes and fees</span>
                        <button 
                            type='button' 
                            className='siCheckButton'
                            onClick={() => navigate(`/hairdresser/${props.id}`)}
                            >
                                See availability
                            </button>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default HairdressingSalonList;