import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';

const ChangeEmail = ({ dataUser }) => {

    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()


    // const [data, setData] = useState([]);
    const [accountUpdated, setAccountUpdated] = useState(false);

    const { email } = dataUser;


    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)


    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)

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
            const res = await axios.post('http://127.0.0.1:8000/auth/users/reset_email/', body, config)

            console.log(res.data)

        }
        catch (error) {
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
            {/* <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h3>Zmień email</h3>
                <p>Zmień adres e-mail przypisany do swojego konta</p>
                <p>Aktualny adres e-mail: <br/>{dataUser.email}</p>
                <button className='btn btn-primary me-1' type='submit'>Zmień email</button>
            </form> */}

            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form'>
                <h3>Zmień email</h3>
                <p>Zmień adres e-mail przypisany do swojego konta</p>
                <p>Aktualny adres e-mail: <br />{dataUser.email}</p>
                <button
                    type="button"
                    className="btn btn-primary me-1"
                    onClick={() => {
                        handleShow1();
                    }}
                >
                    Zmień email
                </button>
            </form>

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Zmiana adresu e-mail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        {/* <img src={wykrzyknik} style={{width: "15%"}} alt="" /> */}
                        <h4>Jesteś pewny?</h4>
                        <p>Czy na pewno chesz zmienić adres e-mail?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Anuluj
                    </Button>
                    <Button variant="danger"
                        onClick={(e) => {
                            onSubmit(e)
                            handleClose1()
                            handleShow2()
                        }}>
                        Zmień
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Testowy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        {/* <img src={wykrzyknik} style={{width: "15%"}} alt="" /> */}
                        <h4>Sprawdź swoją pocztę</h4>
                        <p>Na twój adres wysłaliśmy link do zmiany adresu e-mail. Postępuj zgodnie z instrukcją zawartą w mailu.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default ChangeEmail;