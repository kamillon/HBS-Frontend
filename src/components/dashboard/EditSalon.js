import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const EditSalon = () => {

    const { access, userRole } = useAuth()
    const navigate = useNavigate()
    const { uid } = useParams()
    // console.log(uid)
    const [dataOwners, setDataOwners] = useState([]);

    const initialState = {
        nazwa: '',
        ulica: '',
        nr_budynku: '',
        miejscowosc: '',
        kod_pocztowy: '',
        poczta: '',
        telefon: '',
        email: '',
        wlasciciel: '',
    };

    const [data, setData] = useState(initialState);
    const [salonUpdated, setSalonUpdated] = useState(false);
    const { nazwa, ulica, nr_budynku, miejscowosc, kod_pocztowy, poczta, telefon, email, wlasciciel } = data;
    

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

                const res = await axios.get(`http://127.0.0.1:8000/wlasciciel/`, config);


                setDataOwners(res.data)
                console.log(res.data)

            } catch (err) {
                setDataOwners(null)
                console.log(err)
            }
        } else {
            setDataOwners(null)
            console.log("Blad")
        }
    };


    useEffect(() => {
        const getSalon = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {

                    const res = await axios.get(`http://127.0.0.1:8000/salon/${uid}/`, config);

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
            getSalon()
            listOwners()
        }
    }, [uid, access, userRole])


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

            const body = JSON.stringify({nazwa, ulica, nr_budynku, miejscowosc, kod_pocztowy, poczta, telefon, email, wlasciciel});

            try {

                const res = await axios.put(`http://127.0.0.1:8000/salon/${uid}/`, body, config);

                console.log(res.data)
                setSalonUpdated(true);

            }
            catch (error) {
                console.log(error)
            }


        }
    };

    useEffect(() => {
        if (salonUpdated) {
            navigate(`/${userRole}/salons/`)
        }
    }, [salonUpdated])



    return (
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
            <form className='p-4 p-sm-4 shadow p-3 mb-5 bg-white rounded signup-form' onSubmit={e => onSubmit(e)}>
                <h1>Edytuj dane</h1>
                
                
                <div className='mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Nazwa salonu*'
                        name='nazwa'
                        value={nazwa}
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
                        value={ulica}
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
                        value={nr_budynku}
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
                        value={miejscowosc}
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
                        value={kod_pocztowy}
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
                        value={poczta}
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
                        value={telefon}
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
                    <label className="FormControlSelect">Typ użytkownika</label>
                    <select className="form-control" name='wlasciciel' value={wlasciciel} onChange={e => onChange(e)}>
                        {dataOwners.map(owner => (
                            <option key={owner.id} value={owner.id}>
                                {owner.first_name}
                            </option>
                        ))}
                    </select>
                </div>

                

                <button className='btn btn-primary me-1' type='submit'>Edytuj</button>
                <button className='btn btn-danger' onClick={() => navigate(`/${userRole}/salons/`)}>Anuluj</button>
            </form>
        </div>
    );
};


export default EditSalon;