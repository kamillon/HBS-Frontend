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
        postal_code: '',
        postal_code_locality: '',
        phone_number: '',
        email: '',
        owner: '',
    });



    const { name, street, house_number, city, postal_code, postal_code_locality, phone_number, email, owner } = formData;

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

            const body = JSON.stringify({ name, street, house_number, city, postal_code, postal_code_locality, phone_number, email, owner });

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
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Nazwa salonu*'
                        name='nazwa'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Ulica*'
                        name='ulica'
                        value={street}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Nr budynku*'
                        name='nr_budynku'
                        value={house_number}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Miejscowosc*'
                        name='miejscowosc'
                        value={city}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Kod pocztowy*'
                        name='kod_pocztowy'
                        value={postal_code}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Poczta*'
                        name='poczta'
                        value={postal_code_locality}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Telefon*'
                        name='telefon'
                        maxLength='9'
                        value={phone_number}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

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

                <div className="mb-3">
                    <label className="FormControlSelect">Właściciel</label>
                    <select className="form-control" name='owner' value={owner} onChange={e => onChange(e)}>
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