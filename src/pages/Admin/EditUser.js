import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const EditUser = () => {

    const { access } = useAuth()
    const navigate = useNavigate()
    const { uid } = useParams()

    // const [formData, setFormData] = useState({
    //     username: '',
    //     first_name: '',
    //     last_name: '',
    //     is_staff: '',
    //     is_superuser: '',
    //     is_employee: '',
    //     email: '',
    //     phone: '',
    //     role: '',
    // });


    const initialState = {
        username: '',
        first_name: '',
        last_name: '',
        is_staff: '',
        is_superuser: '',
        is_employee: '',
        email: '',
        phone: '',
        role: '',
    };

    const [data, setData] = useState(initialState);

    useEffect(() => {
        const getUser = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const res = await axios.get(`http://127.0.0.1:8000/auth/users/${uid}/`, config);

                    setData(res.data)
                    console.log(res.data)

                } catch (err) {
                    setData(null)
                    console.log(err)
                }
            } else {
                setData(null)
                console.log("Blad")
            }
        };

        if(uid) {
            getUser()
        }
    }, [uid, access])



    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'admin', text: 'admin'},
        {value: 'user', text: 'klient'},
        {value: 'employee', text: 'pracownik'},
        {value: 'manager', text: 'właściciel salonu'},
    ];


    const [accountUpdated, setAccountUpdated] = useState(false);

    // const [formData, setFormData] = useState({
    //     username: '',
    //     first_name: '',
    //     last_name: '',
    //     is_staff: '',
    //     is_superuser: '',
    //     is_employee: '',
    //     email: '',
    //     phone: '',
    //     role: '',
    // });

    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, phone, role } = data;

    // const onChange = e => setData({ ...data, [e.target.name]: e.target.value ?? e.target.checked });

    // const onChange = e => setData({ ...data, [e.target.name]: e.target.value ?? e.target.checked });

    function onChange(event) {
        const {name, value, type, checked} = event.target
        setData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const onSubmit = async e => {
        e.preventDefault();

        if (localStorage.getItem('isAuthenticated')) {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({
                username, first_name, last_name, is_staff, is_superuser, is_employee,
                email, phone, role
            });

            try {
                const res = await axios.put(`http://127.0.0.1:8000/auth/users/${uid}/`, body, config);

                console.log(res.data)
                setAccountUpdated(true);

            }
            catch (error) {
                console.log(error)
            }


        }
    };

    useEffect(() => {
        if (accountUpdated) {
            navigate('/admin/users/')
        }
    },[accountUpdated])


    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First Name*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last Name*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="is_staff"
                        // value={is_staff}
                        checked={data.is_staff}
                        onChange={e => onChange(e)}

                    />
                    <label
                        className="form-check-label"
                    >is_staff
                    </label>
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="is_superuser"
                        // value={is_superuser}
                        // defaultChecked={data.is_superuser === "true"}
                        checked={data.is_superuser}
                        onChange={e => onChange(e)}

                    />
                    <label
                        className="form-check-label"
                    >is_superuser
                    </label>
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="is_employee"
                        // value={is_employee}
                        checked={data.is_employee}
                        onChange={e => onChange(e)}

                    />
                    <label
                        className="form-check-label"
                    >is_employee
                    </label>
                </div>
                <div className="form-group">
                    <label className="FormControlSelect">Typ użytkownika</label>
                    <select className="form-control" name='role' value={role} onChange={e => onChange(e)}>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>



                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Phone*'
                        name='phone'
                        maxLength='9'
                        value={phone}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Edutuj</button>
                <button className='btn btn-danger' onClick={() => navigate('/admin/users/')}>Anuluj</button>
            </form>
        </div>
    );
};


export default EditUser;