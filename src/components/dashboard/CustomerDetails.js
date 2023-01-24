import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { Tab, Tabs } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner';

const CustomerDetails = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const salon = state && state.salon
    const { access, userRole } = useAuth()
    const { uid } = useParams()
    const [key, setKey] = useState('general');
    const [customerData, setCustomerData] = useState([]);
    const [salonData, setSalonData] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState('true')

    const getCustomer = async () => {
        setIsLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const url = `http://127.0.0.1:8000/customer/${uid}/`
            const res = await axios.get(url, config);
            setCustomerData(res.data.user)
            setIsLoading(false)
        } catch (err) {
            setCustomerData(null)
            console.log(err)
            setIsLoading(false)
        }
    };

    const getReservation = async (salon) => {
        setIsLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`http://127.0.0.1:8000/list-of-salon-reservations/${salon}/`, config);
            setReservations(res.data.filter(i => i.customerId.user.id === parseInt(uid)))
            setIsLoading(false)
        } catch (err) {
            setReservations(null)
            console.log(err)
            setIsLoading(false)
        }
    };


    useEffect(() => {
        if (!salon) {
            navigate(-1)
        }
        if (uid) {
            getCustomer()
            if (salon) {
                getReservation(salon)
            }
        }
    }, [uid, access, userRole, salon])

    const searchFilter = (data) => {
        return data.filter(item => (
            search === ''
                ? item
                : item.date.includes(search) ||
                item.serviceId.name.toLowerCase().includes(search) ||
                item.salonId.name.toLowerCase().includes(search) ||
                item.employeeId.user.first_name.toLowerCase().includes(search) ||
                item.employeeId.user.last_name.toLowerCase().includes(search) ||
                item.customerId.user.last_name.toLowerCase().includes(search)
        ))
    }

    function handleTypeChange(event) {
        setSelectedType(event.target.value);
    }

    function getFilteredListByType() {
        if (!selectedType) {
            return searchFilter(reservations);
        }
        return searchFilter(reservations).filter((item) => item.is_active.toString() === selectedType);
    }

    const filteredList = useMemo(getFilteredListByType, [selectedType, reservations, search]);

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-12 mb-4'>
                    <button
                        className='btn btn-secondary me-1'
                        onClick={() => navigate(`/${userRole}/customers/`)}>
                        Powrót
                    </button>
                </div>
            </div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="general" title="Informacje o kliencie">
                    <div className="row">
                        {isLoading ?
                            <LoadingSpinner text={"Loading..."} />
                            :
                            <>
                                {customerData &&
                                    <div className='col-6 mt-3'>
                                        <div className="card">
                                            <div className="card-header">
                                                <h4>Informacje podstawowe</h4>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item p-3">
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            Nazwa użytkownika
                                                        </div>
                                                        <div className='col-6'>
                                                            {customerData.username}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item p-3">
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            Imię
                                                        </div>
                                                        <div className='col-6'>
                                                            {customerData.first_name}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item p-3">
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            Nazwisko
                                                        </div>
                                                        <div className='col-6'>
                                                            {customerData.last_name}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item p-3">
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            Adres e-mail
                                                        </div>
                                                        <div className='col-6'>
                                                            {customerData.email}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item p-3">
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            Telefon
                                                        </div>
                                                        <div className='col-6'>
                                                            {customerData.phone}
                                                        </div>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </Tab>
                <Tab eventKey="reservations" title="Rezerwacje">
                    <div className="row">
                        {isLoading ?
                            <LoadingSpinner text={"Loading..."} />
                            :
                            <>
                                <div className='col-12 mt-2'>
                                    <div className="row align-items-end">
                                        <div className="col-12 col-md-6">
                                            <div>
                                                <label
                                                    htmlFor="chooseType"
                                                    className="form-label text-secondary">
                                                    Status rezerwacji
                                                </label>
                                                <select
                                                    className='form-select'
                                                    name='typeList'
                                                    id='chooseType'
                                                    value={selectedType}
                                                    onChange={handleTypeChange}
                                                >
                                                    <option value=''>Wszystkie</option>
                                                    <option value='true'>Aktywne</option>
                                                    <option value='false'>Zakończone</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mt-2 mt-md-0'>
                                            <div className="d-block flex-nowrap justify-content-end d-sm-flex">
                                                <div className="">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Szukaj"
                                                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 mt-2'>
                                    {filteredList.length > 0 ?
                                        <div className="table-responsive" style={{ maxHeight: '380px' }}>
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Id</th>
                                                        <th scope="col">Data</th>
                                                        <th scope="col">Usługa</th>
                                                        <th scope="col">Pracownik</th>
                                                        <th scope="col">Salon</th>
                                                        <th scope="col">Czas rozpoczęcia</th>
                                                        <th scope="col">Czas zakończenia</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredList.map((item) => (
                                                        <tr key={item.id}>
                                                            <th scope="row">{item.id}</th>
                                                            <td>{item.date}</td>
                                                            <td>{item.serviceId.name}</td>
                                                            <td>{item.employeeId.user.first_name} {item.employeeId.user.last_name}</td>
                                                            <td>{item.salonId.name}</td>
                                                            <td>{item.start_time}</td>
                                                            <td>{item.end_time}</td>
                                                            <td>{item.is_active ?
                                                                <span className="badge bg-success">Aktywne</span> :
                                                                <span className="badge bg-danger">Zakończone</span>}
                                                            </td>
                                                            <td>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        :
                                        <p>Brak rezerwacji do wyświetlenia</p>
                                    }
                                </div>
                            </>
                        }
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default CustomerDetails;