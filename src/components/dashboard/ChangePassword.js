import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../context/AuthContext"
import { API } from '../../App';

const ChangePassword = ({ dataUser }) => {
    const { access } = useAuth()
    const { email } = dataUser;
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [show2, setShow2] = useState(false)
    const handleShow2 = () => setShow2(true)
    const handleClose2 = () => setShow2(false)

    const onSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ email });

        try {
            const res = await axios.post(`${API}/auth/users/reset_password/`, body, config)
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-3 bg-white rounded signup-form'>
                <h3>Zmień hasło</h3>
                <p>Zmień hasło do swojego konta</p>
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
                            handleShow2()
                        }}>
                        Zmień
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Zmiana hasła</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <h4>Sprawdź swoją pocztę</h4>
                        <p>Na adres: <b>{dataUser.email}</b> wysłaliśmy link do zmiany hasła. Postępuj zgodnie z instrukcją zawartą w mailu.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose2}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ChangePassword;