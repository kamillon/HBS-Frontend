import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditEmployee = () => {

    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()
    const { uid } = useParams()

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
            re_password: 'zaq1@WSX',
            phone: '',
            role: 'employee',
          },
    });

    useEffect(() => {
        const getEmployee = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const url = `http://127.0.0.1:8000/employee/${uid}/`

                    const res = await axios.get(url, config);
                    setFormData(res.data)
                    console.log(res.data)

                } catch (err) {
                    setFormData(null)
                    console.log(err)
                }
            } else {
                setFormData(null)
                console.log("Blad")
            }
        };

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


        if (uid) {
            getEmployee()
            getSalons()
        }
    }, [uid, access, userRole])

    
    const [accountUpdated, setAccountUpdated] = useState(false);
    const [salonUpdated, setSalonUpdated] = useState(false);


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
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({
                username: user.username,
                first_name: user.first_name, 
                last_name: user.last_name, 
                email: user.email, 
                phone: user.phone, 
                role: user.role,
            });

            try {
                const url = `http://127.0.0.1:8000/auth/users/${uid}/`

                const res = await axios.put(url, body, config);
                console.log(res.data)
                setAccountUpdated(true);
            }
            catch (error) {
                console.log(error)
            }
        }
    };

    const onSubmit2 = async e => {
        e.preventDefault();

        if (localStorage.getItem('isAuthenticated')) {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({ salon });

            try {
                const url = `http://127.0.0.1:8000/employee/${uid}/`

                const res = await axios.patch(url, body, config);
                console.log(res.data)
                setSalonUpdated(true);
            }
            catch (error) {
                console.log(error)
            }
        }
    };

    useEffect(() => {
        if (accountUpdated || salonUpdated) {
            navigate(`/${userRole}/employee/`)
        }
    }, [accountUpdated, salonUpdated])

    console.log(formData.salon)

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-lg-7">
                    <Form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded' onSubmit={e => onSubmit(e)}>
                        <h1 className='mb-3'>Edytuj dane</h1>

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
                                required
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="inputLastName">
                            <Form.Label>Nazwisko*</Form.Label>
                            <Form.Control
                                className='form-control'
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
                                type='text'
                                placeholder='Telefon*'
                                name='phone'
                                maxLength='9'
                                value={formData.user.phone}
                                onChange={e => onChange(e)}

                            />
                        </Form.Group>

                        <Button variant="primary me-1" type="submit">
                            Zapisz
                        </Button>
                        <Button variant="danger" onClick={() => navigate(`/${userRole}/employee/`)}>
                            Anuluj
                        </Button>
                    </Form>

                </div>
                <div className="col-lg-5 mt-5 mt-md-0 ">
                    <Form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded' onSubmit={e => onSubmit2(e)}>
                        <h1 className='mb-3'>Salon</h1>
                        <Form.Group className="mb-3" controlId="chooseSalon">
                            <Form.Label>Salon</Form.Label>

                            <Form.Select aria-label="Default select example" name='salon' value={formData.salon} onChange={e => handleChangeSalon(e)}>
                                {/* <Form.Select aria-label="Default select example" value={selectedSalon} onChange={e => setSelectedSalon(e.target.value)}> */}
                                <option>---Wybierz salon---</option>
                                {salonData.map(salon => (
                                    <option key={salon.id} value={salon.id}>
                                        {salon.name} ({salon.city})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary me-1" type="submit">
                            Zapisz
                        </Button>
                        <Button variant="danger" onClick={() => navigate(`/${userRole}/employee/`)}>
                            Anuluj
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;