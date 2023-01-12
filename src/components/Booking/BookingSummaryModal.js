import React from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import { format } from 'date-fns'
import pl from "date-fns/locale/pl";
import { Modal, Button, Col, Row, Container } from 'react-bootstrap';


const BookingSummaryModal = (props) => {
    return (
        <Modal show={props.show1} onHide={props.handleClose1} size="lg" >
            <Modal.Header closeButton>
                <Modal.Title>Potwierdzenie rezerwacji</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                <div className='text-center text-muted'>
                    {props.salonData[0]?.name}
                </div>

                <h6>Wybrane usługi</h6>
                <Container className='p-4 shadow-sm bg-light rounded'>
                    <Row>
                        <Col xs={12} md={4}>
                            <div>
                                {props.selectedEmployee[0]?.user.first_name + " " +
                                    props.selectedEmployee[0]?.user.last_name}
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div>{props.name}</div>
                            <div className='text-muted'><small>{props.convertMinsToTime(props.time)}</small></div>
                        </Col>
                        <Col xs={12} md={4} className='text-end'>
                            <div>{props.price} zł</div>
                        </Col>
                    </Row>
                </Container>
                <hr />
                <h6>Metody płatności</h6>
                <Container className='p-4 shadow-sm bg-light rounded'>
                    <Row>
                        <Col>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioPaymentMethod"
                                    id="paymentMethod"
                                    defaultChecked />
                                <label
                                    className="form-check-label"
                                    htmlFor="paymentMethod">
                                    Płatność w salonie
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <hr />
                <h6>Dane</h6>
                <Container>
                    <Row>
                        <Col>
                            <div className='mb-3'>
                                <label
                                    htmlFor='inputEmail'
                                    className='form-label'>
                                    Email
                                </label>
                                <input
                                    className={`form-control ${props.formik.touched.email && props.formik.errors.email && 'is-invalid'}`}
                                    type='email'
                                    placeholder='Email'
                                    name='email'
                                    value={props.formik.values.email}
                                    onChange={props.formik.handleChange}
                                    onBlur={props.formik.handleBlur}
                                />
                                <span className='text-start error'>
                                    {props.formik.touched.email && props.formik.errors.email ? (
                                        <div>{props.formik.errors.email}</div>
                                    ) : null}
                                </span>
                            </div>
                            <div className='mb-3'>
                                <label
                                    htmlFor='inputPhone'
                                    className='form-label'>
                                    Telefon
                                </label>
                                <input
                                    id='inputPhone'
                                    className={`form-control ${props.formik.touched.phone && props.formik.errors.phone && 'is-invalid'}`}
                                    type='text'
                                    placeholder='Telefon'
                                    name='phone'
                                    value={props.formik.values.phone}
                                    onChange={props.formik.handleChange}
                                    onBlur={props.formik.handleBlur}
                                />
                                <span className='text-start error'>
                                    {props.formik.touched.phone && props.formik.errors.phone ? (
                                        <div>{props.formik.errors.phone}</div>
                                    ) : null}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Container className='p-2 text-end'>
                    <Row>
                        <Col>
                            Łącznie do zapłaty:
                            <h5>{props.price} zł</h5>
                        </Col>
                    </Row>
                </Container>
                <Button
                    type='submit'
                    variant='primary'
                    form='bookingForm'
                    className='w-100'
                    onClick={(e) => {
                        props.handleClose1()
                    }}>
                    Potwierdź i umów
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default BookingSummaryModal;