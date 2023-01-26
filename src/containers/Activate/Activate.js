import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../App';

const Activate = () => {
    const [verified, setVerified] = useState(false);
    const { uid, token } = useParams()

    const verify_account = async e => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ uid, token });

        try {
            const res = await axios.post(`${API}/auth/users/activation/`, body, config);
        }
        catch (error) {
            console.log(error)
        }
        setVerified(true);
    };

    if (verified) {
        return <Navigate to='/' />
    }

    return (
        <div className='min-vh-100 color-overlay d-flex justify-content-center align-items-center'>
            <div className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded login-form text-center'>
                <h1>Dziękujemy za rejestrację</h1>
                <p className='mt-3'>W celu aktywacji konta prosimy kliknąć w poniższy przycisk.</p>
                <button
                    onClick={verify_account}
                    type='button'
                    className='btn btn-primary'
                >
                    Kliknij aby potwierdzić konto
                </button>
                <p className='mt-3'>Loginem do konta jest adres e-mail, na który została dostarczona ta wiadomość.</p>
            </div>
        </div>
    );
};

export default Activate;