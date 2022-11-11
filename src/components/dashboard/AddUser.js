import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddUser = () => {

    const navigate = useNavigate()
    const { access, userRole } = useAuth()

    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        username: 'manager1231112',
        first_name: '',
        last_name: '',
        is_staff: true,
        is_superuser: true,
        is_employee: false,
        email: '',
        password: 'zaq1@WSX',
        re_password: 'zaq1@WSX',
        phone: '',
        // role: 'manager',
    });


    //const [errors, setErrors] = useState({})


    const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, password, re_password, phone } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value ?? e.target.checked });
   
    // const onChange = e =>{
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value ?? e.target.checked

    //     })
        
    //     if(!!errors[e.target.name]){
    //         setErrors({
    //             ...errors,
    //             [e.target.name]: null
    //         })
    //     }
    // }


    // const validateForm = () => {
    //     const { username, first_name, last_name, is_staff, is_superuser, is_employee, email, password, re_password, phone } = formData
    //     const newErrors = {}
        
    //     if(!first_name || first_name === '') newErrors.first_name = 'Nieprawidłowa nazwa'

    //     return newErrors
    // }

    const onSubmit = async e => {
        e.preventDefault();
        // const formErrors = validateForm()
        // if(Object.keys(formErrors).length > 0){
        //     setErrors(formErrors)
        // }
        // else{
        //     console.log('form submitted')
        // }

        if (localStorage.getItem('isAuthenticated')) {
            if (password === re_password) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json',
                    }
                };

                let role = ''
                if(userRole === 'admin'){
                    role = 'manager'
                }
                else if(userRole === 'manager'){
                    role = 'employee'
                }
            
                const body = JSON.stringify({ username, first_name, last_name, is_staff, is_superuser, is_employee, 
                    email, password, re_password, phone, role });

                try {

                    const url = `http://127.0.0.1:8000/auth/users/`
                    const res = await axios.post(url, body, config);
        
                    console.log(res.data)
                    setAccountCreated(true);
                    
                } 
                catch(error) {
                    console.log(error)
                }

            }
        }
    };


    // if (localStorage.getItem('isAuthenticated')) {
    //     return <Navigate to='/' />
    // }
    // if (accountCreated) {
    //     // return <Navigate to='/admin/users/' />
    //     navigate('/admin/users/')
    // }

    useEffect(() => {
        if (accountCreated) {
            navigate(`/${userRole}/users/`)
        }
    },[accountCreated])

    return(
        <div className='container mt-5 d-flex align-items-center justify-content-center'>


            <Form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h1 className='mb-5'>Utwórz konto</h1>
                <Form.Group className="mb-3" controlId="inputFirstName">
                    <Form.Label>Imię*</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Imię*"
                    className='form-control'
                    name='first_name'
                    value={formData.first_name}
                    onChange={e => onChange(e)}
                    //isInvalid={!!errors.first_name}
                    required
                    />
                    {/* <Form.Control.Feedback type='invalid'>
                        {errors.first_name}
                    </Form.Control.Feedback> */}
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Imię*</Form.Label>
                    <Form.Control 
                  
                    />
                </Form.Group> */}


                <Form.Group className="mb-3" controlId="inputLastName">
                    <Form.Label>Nazwisko*</Form.Label>
                    <Form.Control 
                    className='form-control'
                    // id='inputLastName'
                    type='text'
                    placeholder='Nazwisko*'
                    name='last_name'
                    value={formData.last_name}
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
                    value={formData.email}
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
                    value={formData.phone}
                    onChange={e => onChange(e)}
                  
                    />
                </Form.Group>
           

                <Button variant="primary me-1" type="submit">
                    Submit
                </Button>
                <Button variant="danger" onClick={() => navigate(`/${userRole}/users/`)}>
                    Anuluj
                </Button>
                



            </Form>
        </div>

    );
};


export default AddUser;