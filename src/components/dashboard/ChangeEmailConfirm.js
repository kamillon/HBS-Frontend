import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext"

const ChangeEmailConfirm = () => {
    const { uid, token } = useParams()
    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()
    const [requestSent, setRequestSent] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            new_email: '',
        },
        validationSchema: Yup.object({
            new_email: Yup.string()
                .email('Wprowadź poprawny adres e-mail')
                .required('Pole jest wymagane'),
        }),
        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
        },
    });

    const { new_email } = formik.values;

    const onSubmit = async e => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ uid, token, new_email });

        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/users/reset_email_confirm/', body, config)
            setRequestSent(true)
            console.log(res)
        }
        catch (error) {
            if( error.response.data.new_email[0] === "user with this email already exists."){
                setError("Użytkownik z tym adresem e-mail już istnieje")
            }
        }
    };

    useEffect(() => {
        if (requestSent) {
            navigate(`/${userRole}/account-settings/`)
        }
    }, [requestSent])

    return (
        <div className='min-vh-100 color-overlay d-flex justify-content-center align-items-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded login-form text-center' onSubmit={formik.handleSubmit}>
                <h1>Podaj nowy e-mail</h1>
                <p>Podaj nowy adres e-mail, za pomocą którego będziesz logować się na swoje konto.</p>
                <div className='form-group mb-3'>
                    <input
                        className={`form-control ${formik.touched.new_email && formik.errors.new_email && 'is-invalid'}`}
                        type='email'
                        placeholder='Adres e-mail'
                        name='new_email'
                        value={formik.values.new_email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='text-start error'>
                        {formik.touched.new_email && formik.errors.new_email ? (
                            <div>{formik.errors.new_email}</div>
                        ) : null}
                    </span>
                </div>
                <div className='error'>
                    {error ? error : <></>}
                </div>
                <div className='text-center mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>Potwierdź</button>
                </div>
            </form>
        </div>
    );
};

export default ChangeEmailConfirm;