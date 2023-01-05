import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../context/AuthContext"

const ChangeEmail = ({ dataUser }) => {
    const { access } = useAuth()
    const { email } = dataUser;
    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)
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
            const res = await axios.post('http://127.0.0.1:8000/auth/users/reset_email/', body, config)
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
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
                    <Modal.Title>Zmiana adresu e-mail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <h4>Sprawdź swoją pocztę</h4>
                        <p>Na adres: <b>{dataUser.email}</b> wysłaliśmy link do zmiany adresu e-mail. Postępuj zgodnie z instrukcją zawartą w mailu.</p>
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

export default ChangeEmail;