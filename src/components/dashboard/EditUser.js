import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const EditUser = () => {

    const { access, userRole } = useAuth()
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


                    // let url = ''
                    // if(userRole === 'admin'){
                    //     url = `http://127.0.0.1:8000/auth/users/${uid}/`
                    // }
                    // else if(userRole === 'salon_owner'){
                    //     url = `http://127.0.0.1:8000/pracownik/${uid}/`
                    // }

                    const url = `http://127.0.0.1:8000/auth/users/${uid}/`

                    const res = await axios.get(url, config);


                    // let res = ''
                    // if(userRole == 'admin'){
                    //     res = await axios.get(`http://127.0.0.1:8000/auth/users/${uid}/`, config);
                    // }
                    // else if(userRole == 'salon_owner'){
                    //     res = await axios.get(`http://127.0.0.1:8000/pracownik/${uid}/`, config);
                    // }

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

        if (uid) {
            getUser()
        }
    }, [uid, access, userRole])



    const options = [
        { value: '', text: '--Choose an option--' },
        { value: 'admin', text: 'admin' },
        { value: 'customer', text: 'klient' },
        { value: 'employee', text: 'pracownik' },
        { value: 'salon_owner', text: 'właściciel salonu' },
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
        const { name, value, type, checked } = event.target
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
                // let url = ''
                // if(userRole === 'admin'){
                //     url = `http://127.0.0.1:8000/auth/users/${uid}/`
                // }
                // else if(userRole === 'salon_owner'){
                //     url = `http://127.0.0.1:8000/pracownik/${uid}/`
                // }

                const url = `http://127.0.0.1:8000/auth/users/${uid}/`

                const res = await axios.put(url, body, config);

                // let res = ''
                // if(userRole == 'admin'){
                //     res = await axios.put(`http://127.0.0.1:8000/auth/users/${uid}/`, body, config);
                // }
                // else if(userRole == 'salon_owner'){
                //     res = await axios.put(`http://127.0.0.1:8000/pracownik/${uid}/`, body, config);
                // }

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
            navigate(`/${userRole}/users/`)
        }
    }, [accountUpdated])


    // const optionsDependingOnUserRole = () => {
    //     if(userRole == 'admin'){
    //         return()
    //     }

    // }

    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h1>Sign Up</h1>
                <p>Create your Account</p>
                <div className='mb-3'>
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
                <div className='mb-3'>
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
                <div className='mb-3'>
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


                {userRole === 'admin' ? 
                    <div>
                        <div className="mb-3 form-check">
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
                        <div className="mb-3 form-check">
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
                        <div className="mb-3 form-check">
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
                        <div className="mb-3">
                            <label className="FormControlSelect">Typ użytkownika</label>
                            <select className="form-control" name='role' value={role} onChange={e => onChange(e)}>
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div> : <></>
                }


                <div className='mb-3'>
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
                <div className='mb-3'>
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
                <button className='btn btn-primary me-1' type='submit'>Edytuj</button>
                <button className='btn btn-danger' onClick={() => navigate(`/${userRole}/users/`)}>Anuluj</button>
            </form>
        </div>
    );
};


export default EditUser;