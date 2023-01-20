import React from 'react';
import 'moment/locale/pl';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ children, ...props }) => {

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Body>
                <div className='text-center'>
                    <h5 className='mt-3'>{props.title}</h5>
                    <i className="bi bi-x-circle" style={{ fontSize: "7rem", color: "red" }}></i>
                    {children}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    onClick={props.onClick}
                    className='w-100'>
                    Powrót
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ErrorModal;