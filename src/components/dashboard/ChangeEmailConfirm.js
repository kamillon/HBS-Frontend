import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const ChangeEmailConfirm = () => {
    const { access, userRole, currentUser } = useAuth()
    const navigate = useNavigate()

    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_email: '',
    });

    const { new_email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const {uid, token} = useParams()

    const onSubmit = async e => {
        e.preventDefault();


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ uid, token, new_email });
    
        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/users/reset_email_confirm/', body, config)

            console.log(res.data)
            setRequestSent(true)
            
        } 
        catch(error) {
            console.log(error)
        }



    };

    // if (requestSent) {
    //     navigate(`/${userRole}/account-settings/`)
    // }

    useEffect(() => {
        if (requestSent) {
            navigate(`/${userRole}/account-settings/`)
        }
    }, [requestSent])

    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='New Email'
                        name='new_email'
                        value={new_email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                
                <button className='btn btn-primary' type='submit'>Change Email</button>
            </form>
        </div>
    );
};

export default ChangeEmailConfirm;