import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddEmployee = () => {

    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()

    const [accountCreated, setAccountCreated] = useState(false);
    const [salonData, setSalonData] = useState([]);
    const [selectedSalon, setSelectedSalon] = useState();

    const [formData, setFormData] = useState({
        salon: '',
        user: {
            username: '',
            first_name: '',
            last_name: '',
            is_staff: true,
            is_superuser: true,
            is_employee: true,
            email: '',
            password: 'zaq1@WSX',
            phone: '',
            role: 'employee',
        },
    });


    useEffect(() => {
        const getSalons = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/salon/`, config);
                    setSalonData(res.data.filter(i => i.owner == currentUser.id))
                    console.log(res.data)

                } catch (err) {
                    setSalonData(null)
                    console.log(err)
                }
            } else {
                setSalonData(null)
                console.log("Blad")
            }
        };

        getSalons()
    }, [access])



    const { salon, user } = formData;
    const onChange = e => setFormData({
        ...formData,
        user: {
            ...formData.user,
            [e.target.name]: e.target.value ?? e.target.checked
        }
    });

    const handleChangeSalon = e => setFormData({
        salon: e.target.value,
        user: {
            ...formData.user,
        }
    });

    const onSubmit = async e => {
        e.preventDefault();

        if (localStorage.getItem('isAuthenticated')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json',
                    }
                };

                let role = ''
                if (userRole === 'admin') {
                    role = 'salon_owner'
                }
                else if (userRole === 'salon_owner') {
                    role = 'employee'
                }

                const body = JSON.stringify({ salon, user });

                try {

                    const url = `http://127.0.0.1:8000/employee/`
                    const res = await axios.post(url, body, config);

                    console.log(res.data)
                    setAccountCreated(true);

                }
                catch (error) {
                    console.log(error)
                }
        }
    };

    useEffect(() => {
        if (accountCreated) {
            navigate(`/${userRole}/employee/`)
        }
    }, [accountCreated])

    console.log(formData)

    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>


            <Form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h1 className='mb-5'>Utwórz konto</h1>
                <Form.Group className="mb-3" controlId="chooseSalon">
                    <Form.Label>Salon</Form.Label>
                    {/* <Form.Select aria-label="Default select example" value={selectedSalon} onChange={e => setSelectedSalon(e.target.value)}> */}
                    <Form.Select aria-label="Default select example" value={formData.salon} onChange={e => handleChangeSalon(e)}>
                        <option>---Wybierz salon---</option>
                        {salonData.map(salon => (
                            <option key={salon.id} value={salon.id}>
                                {salon.name} ({salon.city})
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3" controlId="inputUsername">
                    <Form.Label>Nazwa użytkownika*</Form.Label>
                    <Form.Control
                        className='form-control'
                        type='text'
                        placeholder='Nazwa użytkownika*'
                        name='username'
                        value={formData.user.username}
                        onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputFirstName">
                    <Form.Label>Imię*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Imię*"
                        className='form-control'
                        name='first_name'
                        value={formData.user.first_name}
                        onChange={e => onChange(e)}
                        //isInvalid={!!errors.first_name}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputLastName">
                    <Form.Label>Nazwisko*</Form.Label>
                    <Form.Control
                        className='form-control'
                        // id='inputLastName'
                        type='text'
                        placeholder='Nazwisko*'
                        name='last_name'
                        value={formData.user.last_name}
                        onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputEmail">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                        className='form-control'
                        // id='inputEmail'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={formData.user.email}
                        onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputPhone">
                    <Form.Label>Telefon*</Form.Label>
                    <Form.Control
                        className='form-control'
                        // id='inputPhone'
                        type='text'
                        placeholder='Telefon*'
                        name='phone'
                        maxLength='9'
                        value={formData.user.phone}
                        onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Button variant="primary me-1" type="submit">
                    Submit
                </Button>
                <Button variant="danger" onClick={() => navigate(`/${userRole}/employee/`)}>
                    Anuluj
                </Button>
            </Form>
        </div>
    );
};

export default AddEmployee;