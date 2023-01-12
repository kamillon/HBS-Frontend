import React from 'react';
import 'moment/locale/pl';
import { Modal, Button } from 'react-bootstrap';


const ErrorModal = (props) => {

    return (
        <Modal show={props.show3} onHide={props.handleClose3}>
            <Modal.Body>
                <div className='text-center'>
                    <h5 className='mt-3'>Oops! Coś poszło nie tak</h5>
                    <i className="bi bi-x-circle" style={{ fontSize: "7rem", color: "red" }}></i>
                    <div className='text-center mt-2'>
                        Prawdopodonie wybrany termin został już zarezerwowany.
                        Prosimy spróbować jeszcze raz
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    onClick={(e) => {
                        props.handleClose3()
                        window.location.reload(false);
                    }}
                    className='w-100'>
                    Powrót
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ErrorModal;