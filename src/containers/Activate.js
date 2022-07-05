import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Activate = () => {
    const [verified, setVerified] = useState(false);

    const {uid, token} = useParams()

    const verify_account = async e => {
        // const uid = match.params.uid;
        // const token = match.params.token;

        // verify(uid, token);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ uid, token });
    

        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/users/activation/`, body, config);

            console.log(res.data)
            
        } 
        catch(error) {
            console.log(error)
        }


        setVerified(true);
    };

    if (verified) {
        return <Navigate to='/' />
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default Activate;