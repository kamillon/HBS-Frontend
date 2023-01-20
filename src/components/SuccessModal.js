import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ children, details, ...props }) => {

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Body>
                <div className='text-center'>
                    <i className="bi bi-check2-circle" style={{ fontSize: "7rem", color: "green" }}></i>
                    <h5 className='mt-3'>{props.title}</h5>
                    {children}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success"
                    onClick={props.onClick}
                    className='w-100'>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default SuccessModal;