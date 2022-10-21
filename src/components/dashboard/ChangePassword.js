import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';

const ChangePassword = ({dataUser}) => {

    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()

    // const [data, setData] = useState([]);
    const [accountUpdated, setAccountUpdated] = useState(false);

    const { email } = dataUser;

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

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
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form'>
                <h3>Zmień hasło</h3>
                <p>Zmień hasło do swojego konta</p>
                {/* <button className='btn btn-primary me-1' type='submit'>Zmień hasło</button> */}
                <button
                    type="button"
                    className="btn btn-primary me-1"
                    onClick={() => {
                        handleShow();
                    }}
                >
                    Zmień hasło
                </button>
            </form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Zmiana hasła</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        {/* <img src={wykrzyknik} style={{width: "15%"}} alt="" /> */}
                        <h4>Jesteś pewny?</h4>
                        <p>Czy na pewno chesz zmienić hasło?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="danger"
                        onClick={(e) => {
                            onSubmit(e)
                            handleClose()
                        }}>
                        Zmień
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default ChangePassword;