import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';
import LoadingSpinner from '../LoadingSpinner';

const ReservationsManagement = () => {

    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()
    const [data, setData] = useState([]);
    const [salonData, setSalonData] = useState([]);
    const [removed, setRemoved] = useState(false);
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [reservationData, setReservationData] = useState({})
    const [selectedSalon, setSelectedSalon] = useState('');
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState('true')
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const getReservation = async () => {
            setIsLoading(true)
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const res = await axios.get(`http://127.0.0.1:8000/reservation/`, config);
                    setData(res.data)
                    console.log(res.data)
                    setIsLoading(false)
                } catch (err) {
                    setData(null)
                    console.log(err)
                    setIsLoading(false)
                }
            } else {
                setData(null)
                console.log("Blad")
                setIsLoading(false)
            }
        };

        const getSalons = async () => {
            setIsLoading(true)
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
                    setSalonData(res.data)
                    console.log(res.data)
                    setIsLoading(false)

                } catch (err) {
                    setSalonData(null)
                    console.log(err)
                    setIsLoading(false)
                }
            } else {
                setSalonData(null)
                console.log("Blad")
                setIsLoading(false)
            }
        };

        getReservation()
        if (currentUser.role === 'salon_owner' || currentUser.role === 'admin') {
            getSalons()
        }
    }, [access])


    const onDelete = async (id) => {
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.delete(`http://127.0.0.1:8000/reservation/${id}/`, config);
                console.log(res.data)
                setRemoved(true)

            } catch (err) {
                console.log(err)
            }
        } else {
            console.log("Blad")
        }
    };

    useEffect(() => {
        if (removed) {
            window.location.reload(false);
        }
    }, [removed])


    let salonDataFiltered;

    if (userRole === 'salon_owner') {
        salonDataFiltered = salonData.filter(i => i.owner === currentUser.id)
    }
    else if (userRole === 'admin') {
        salonDataFiltered = salonData
    }



    // const keys = ["date"]
    // const searchFilteredServices = (data) => {
    //     return data.filter(item => (
    //         keys.some((key) => item[key].includes(search)))
    //     );
    // };

    const searchFilter = (data) => {
        return data.filter(item => (
            search === ''
                ? item
                : item.date.includes(search)
        ))
    }


    function getFilteredList() {
        if (!selectedSalon) {
            if (userRole === 'salon_owner') {
                const filteredReservations = data.filter(reservation => {
                    return salonDataFiltered.find(salon => salon.id === reservation.salonId);
                });
                return searchFilter(filteredReservations)
            }
            else if (userRole === 'admin') {
                return searchFilter(data)
            }
            else if (userRole === 'employee') {
                const result = data.filter(i => i.employeeId === currentUser.id)
                return searchFilter(result)
            }
            else if (userRole === 'customer') {
                const result = data.filter(i => i.customerId === currentUser.id)
                return searchFilter(result)
            }
        }
        const result = data.filter((item) => item.salonId === parseInt(selectedSalon));
        return searchFilter(result)
    }

    const filteredList2 = useMemo(getFilteredList, [selectedSalon, salonDataFiltered, data]);



    function handleTypeChange(event) {
        setSelectedType(event.target.value);
    }


    function getFilteredList2() {
        if (!selectedType) {
            return filteredList2;
        }
        return filteredList2.filter((item) => item.is_active.toString() === selectedType);
    }

    const filteredList = useMemo(getFilteredList2, [selectedType, selectedSalon, salonDataFiltered, data]);



    return (
        <div className='container'>
            {isLoading ?
                <LoadingSpinner text={"Loading..."} />
                :
                <>
                    <div className='row mb-5'>
                        <div className='col'>
                            <h2>Rezerwacje</h2>
                        </div>
                    </div>
                    <div className="row">
                        {(currentUser.role === 'salon_owner' || currentUser.role === 'admin') &&
                            <div className="col-md-4 text-center mb-3">

                                <select
                                    className="form-select"
                                    value={selectedSalon}
                                    onChange={e => setSelectedSalon(e.target.value)}
                                >
                                    <option value={''}>---Wybierz salon---</option>
                                    {salonDataFiltered.map(salon => (
                                        <option key={salon.id} value={salon.id}>
                                            {salon.name} ({salon.city})
                                        </option>
                                    ))}
                                </select>

                            </div>
                        }
                        <div className="col-md-3 text-center mb-3">
                            <select
                                className='form-select'
                                name='typeList'
                                id='typeList'
                                value={selectedType}
                                onChange={handleTypeChange}
                            >
                                <option value=''>Wszystkie</option>
                                <option value='true'>Aktywne</option>
                                <option value='false'>Zakończone</option>
                            </select>
                        </div>
                        <div className="col-md-5 text-center mb-3">
                            <div className='search-bar'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Szukaj"
                                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                />
                            </div>
                        </div>
                    </div>

                    {filteredList.length > 0 ?
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Usługa</th>
                                        <th scope="col">Pracownik</th>
                                        <th scope="col">Klient</th>
                                        <th scope="col">Salon</th>
                                        <th scope="col">Czas rozpoczęcia</th>
                                        <th scope="col">Czas zakończenia</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredList.map((item) => (
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.date}</td>
                                            <td>{item.serviceId}</td>
                                            <td>{item.employeeId}</td>
                                            <td>{item.customerId}</td>
                                            <td>{item.salonId}</td>
                                            <td>{item.start_time}</td>
                                            <td>{item.end_time}</td>
                                            <td>{item.is_active ? "active" : "inactive"}</td>
                                            <td>
                                                {item.is_active ?
                                                    <button
                                                        type="button"
                                                        style={{ width: '80px' }}
                                                        className="btn btn-danger mt-1 mt-md-0"
                                                        onClick={() => {
                                                            handleShow();
                                                            setReservationData({ id: item.id })
                                                        }}
                                                    >
                                                        ANULUJ
                                                    </button>
                                                    :
                                                    <></>
                                                }
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

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Potwierdzenie anulowania rezerwacji</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='text-center'>
                                <img src={wykrzyknik} style={{ width: "15%" }} alt="" />
                                <h4>Jesteś pewny?</h4>
                                <p>Czy na pewno chcesz anulować rezerwację o id: {reservationData.id}?</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                NIE
                            </Button>
                            <Button variant="danger"
                                onClick={() => {
                                    // onDelete(selectedItem);
                                    onDelete(reservationData.id)
                                    setReservationData({})
                                    handleClose()
                                }}>
                                TAK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </div>
    )
};


export default ReservationsManagement;


