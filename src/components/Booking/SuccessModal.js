import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pl';
import { format } from 'date-fns'
import pl from "date-fns/locale/pl";
import { Modal, Button } from 'react-bootstrap';


const SuccessModal = (props) => {
    const navigate = useNavigate()

    return (
        <Modal show={props.show2} onHide={props.handleClose2}>
            <Modal.Body>
                <div className='text-center'>
                    <i className="bi bi-check2-circle" style={{ fontSize: "7rem", color: "green" }}></i>
                    <h5 className='mt-3'>Wizyta potwierdzona</h5>
                    <h5 className='text-center'>
                        {props.selectedDate &&
                            format(new Date(props.selectedDate), 'EEEE, dd MMMM yyyy', {
                                locale: pl,
                            })}
                    </h5>
                    <div className='text-center'>
                        {moment(props.chooseStartTime, 'HH:mm:ss').format('HH:mm') + " - " +
                        moment(props.chooseEndTime, 'HH:mm:ss').format('HH:mm')}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success"
                    onClick={(e) => {
                        props.handleClose2()
                        navigate(`/`)
                    }}
                    className='w-100'>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default SuccessModal;