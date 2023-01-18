import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddCustomerModal = ({ show1, handleClose1, formik, errors, isSubmitting }) => {
    return (
        <Modal show={show1} onHide={handleClose1} size="lg" >
            <Modal.Header closeButton>
                <Modal.Title>Dodawanie klienta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container d-flex align-items-center justify-content-center'>
                    <form id="addCustomerForm" className='p-4 p-sm-4 p-3 rounded signup-form' onSubmit={formik.handleSubmit}>
                        <div className='mb-3'>
                            <label
                                htmlFor='inputUsername'
                                className='form-label'>
                                Nazwa użytkownika
                            </label>
                            <input
                                id='inputUsername'
                                className={`form-control ${formik.touched.username && formik.errors.username && 'is-invalid'}`}
                                type='text'
                                placeholder='Nazwa użytkownika'
                                name='username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className='text-start error'>
                                {formik.touched.username && formik.errors.username ? (
                                    <div>{formik.errors.username}</div>
                                ) : null}
                                {errors ? errors.username : <></>}
                            </span>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor='inputFirstName'
                                className='form-label'>
                                Imię
                            </label>
                            <input
                                id='inputFirstName'
                                className={`form-control ${formik.touched.first_name && formik.errors.first_name && 'is-invalid'}`}
                                type='text'
                                placeholder='Imię'
                                name='first_name'
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className='text-start error'>
                                {formik.touched.first_name && formik.errors.first_name ? (
                                    <div>{formik.errors.first_name}</div>
                                ) : null}
                            </span>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor='inputLastName'
                                className='form-label'>
                                Nazwisko
                            </label>
                            <input
                                id='inputLastName'
                                className={`form-control ${formik.touched.last_name && formik.errors.last_name && 'is-invalid'}`}
                                type='text'
                                placeholder='Nazwisko'
                                name='last_name'
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className='text-start error'>
                                {formik.touched.last_name && formik.errors.last_name ? (
                                    <div>{formik.errors.last_name}</div>
                                ) : null}
                            </span>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor='inputEmail'
                                className='form-label'>
                                Email
                            </label>
                            <input
                                className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className='text-start error'>
                                {formik.touched.email && formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                ) : null}
                                {errors ? errors.email : <></>}
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
                                className={`form-control ${formik.touched.phone && formik.errors.phone && 'is-invalid'}`}
                                type='text'
                                placeholder='Telefon'
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className='text-start error'>
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div>{formik.errors.phone}</div>
                                ) : null}
                            </span>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='submit'
                    variant='primary'
                    form='addCustomerForm'
                    className='w-100'
                    disabled={isSubmitting}
                    onClick={(e) => {
                        handleClose1()
                    }}>
                    Utwórz
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default AddCustomerModal;