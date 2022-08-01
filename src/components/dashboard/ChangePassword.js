import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const ChangePassword = ({dataUser}) => {

    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()

    // const [data, setData] = useState([]);
    const [accountUpdated, setAccountUpdated] = useState(false);

    const { email } = dataUser;

    // useEffect(() => {
    //     const getUser = async () => {
    //         if (access) {
    //             const config = {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `JWT ${access}`,
    //                     'Accept': 'application/json'
    //                 }
    //             };

    //             try {

    //                 const res = await axios.get(`http://127.0.0.1:8000/auth/users/me/`, config);

    //                 setData(res.data)
    //                 console.log(res.data)

    //             } catch (err) {
    //                 setData(null)
    //                 console.log(err)
    //             }
    //         } else {
    //             setData(null)
    //             console.log("Blad")
    //         }
    //     };

    //     getUser()
    // }, [access, userRole])



    const onSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ email });
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/users/reset_password/', body, config)

            console.log(res.data)
            
        } 
        catch(error) {
            console.log(error)
        }

        setAccountUpdated(true);
    };

    useEffect(() => {
        if (accountUpdated) {
            window.location.reload(false);
        }
    }, [accountUpdated])



    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h3>Zmień hasło</h3>
                <p>Możesz zmienić swoje hasło, my wyślemy</p>
                <button className='btn btn-primary me-1' type='submit'>Zmień hasło</button>
            </form>
        </div>
    );
};


export default ChangePassword;