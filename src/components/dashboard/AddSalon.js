import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const AddSalon = () => {

    const navigate = useNavigate()
    const { access, userRole } = useAuth()

    const [salonCreated, setSalonCreated] = useState(false);

    const [data, setData] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        street: '',
        house_number: '',
        city: '',
        post_code: '',
        postal_code_locality: '',
        phone_number: '',
        email: '',
        owner: '',
    });



    const { name, street, house_number, city, post_code, postal_code_locality, phone_number, email, owner } = formData;

    const listOwners = async () => {
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {

                const res = await axios.get(`http://127.0.0.1:8000/salon-owner/`, config);


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

   

    useEffect(() => {
        listOwners()
    }, [access])


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value ?? e.target.checked });

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

            const body = JSON.stringify({ name, street, house_number, city, post_code, postal_code_locality, phone_number, email, owner });

            try {

                const res = await axios.post(`http://127.0.0.1:8000/salon/`, body, config);


                console.log(res.data)
                setSalonCreated(true);
                
            } 
            catch(error) {
                console.log(error)
            }

            
        }
    };



    useEffect(() => {
        if (salonCreated) {
            navigate(`/${userRole}/salons/`)
        }
    },[salonCreated])
    

    console.log(data)

    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
            <h1 className='mb-5'>Utwórz salon</h1>
                <div className='mb-3'>
                    <label 
                        htmlFor='inputName' 
                        className='form-label'>
                            Nazwa salonu
                    </label>
                    <input
                        id='inputName'
                        className='form-control'
                        type='text'
                        placeholder='Nazwa salonu'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label 
                        htmlFor='inputStreet' 
                        className='form-label'>
                            Ulica
                    </label>
                    <input
                        id='inputStreet'
                        className='form-control'
                        type='text'
                        placeholder='Ulica'
                        name='street'
                        value={street}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label 
                        htmlFor='inputHouseNumber' 
                        className='form-label'>
                            Nr budynku
                    </label>
                    <input
                        id='inputHouseNumber'
                        className='form-control'
                        type='text'
                        placeholder='Nr budynku'
                        name='house_number'
                        value={house_number}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label 
                        htmlFor='inputCity' 
                        className='form-label'>
                            Miejscowość
                    </label>
                    <input
                        id='inputCity'
                        className='form-control'
                        type='text'
                        placeholder='Miejscowość'
                        name='city'
                        value={city}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label 
                        htmlFor='inputPostcode' 
                        className='form-label'>
                            Kod pocztowy
                    </label>
                    <input
                        id='inputPostcode'
                        className='form-control'
                        type='text'
                        placeholder='Kod pocztowy'
                        name='post_code'
                        value={post_code}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label 
                        htmlFor='inputPostalCodeLocality' 
                        className='form-label'>
                            Poczta
                    </label>
                    <input
                        id='inputPostalCodeLocality'
                        className='form-control'
                        type='text'
                        placeholder='Poczta'
                        name='postal_code_locality'
                        value={postal_code_locality}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label 
                        htmlFor='inputPhoneNumber' 
                        className='form-label'>
                            Telefon
                    </label>
                    <input
                        id='inputPhoneNumber'
                        className='form-control'
                        type='text'
                        placeholder='Telefon'
                        name='phone_number'
                        maxLength='9'
                        value={phone_number}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label 
                        htmlFor='inputEmail' 
                        className='form-label'>
                            Email
                    </label>
                    <input
                        id='inputEmail'
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className="mb-3">
                     <label 
                        htmlFor='inputOwner' 
                        className='form-label'>
                            Właściciel
                    </label>
                    {/* <label className="FormControlSelect">Właściciel</label> */}
                    <select className="form-control" name='owner' id= 'inputOwner' value={owner} onChange={e => onChange(e)}>
                        <option value=''>
                            --Wybierz właściciela--
                        </option>
                        {data.map(owner => (
                            <option key={owner.user.id} value={owner.user.id}>
                                {owner.user.first_name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <button className='btn btn-primary me-1' type='submit'>Utwórz</button>
                <button className='btn btn-danger' onClick={() => navigate(`/${userRole}/salons/`)}>Anuluj</button>
            </form>
        </div>
    );
};


export default AddSalon;