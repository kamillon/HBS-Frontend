import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
                    const res = await axios.get(`http://127.0.0.1:8000/reservation-all/`, config);
                    setData(res.data)
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


    const searchFilter = (data) => {
        return data.filter(item => (
            search === ''
                ? item
                : item.date.includes(search) ||
                item.serviceId.name.toLowerCase().includes(search) ||
                item.salonId.name.toLowerCase().includes(search) ||
                item.employeeId.user.first_name.toLowerCase().includes(search) ||
                item.employeeId.user.last_name.toLowerCase().includes(search) ||
                item.customerId.user.first_name.toLowerCase().includes(search) ||
                item.customerId.user.last_name.toLowerCase().includes(search)
        ))
    }

    function getFilteredListOfSalons() {
        if (!selectedSalon) {
            if (userRole === 'salon_owner') {
                const filteredReservations = data.filter(reservation => {
                    return salonDataFiltered.find(salon => salon.id === reservation.salonId.id);
                });
                return searchFilter(filteredReservations)
            }
            else if (userRole === 'admin') {
                return data
            }
            else if (userRole === 'employee') {
                const result = data.filter(i => i.employeeId.user.id === currentUser.id)
                return result
            }
            else if (userRole === 'customer') {
                const result = data.filter(i => i.customerId.user.id === currentUser.id)
                return result
            }
        }
        else {
            const result = data.filter((item) => item.salonId.id === parseInt(selectedSalon));
            return result
        }
    }

    const filteredListOfSalons = useMemo(getFilteredListOfSalons, [selectedSalon, salonDataFiltered, data]);


    function handleTypeChange(event) {
        setSelectedType(event.target.value);
    }


    function getFilteredListByType() {
        if (!selectedType) {
            return searchFilter(filteredListOfSalons);
        }
        return searchFilter(filteredListOfSalons).filter((item) => item.is_active.toString() === selectedType);
    }

    const filteredList = useMemo(getFilteredListByType, [selectedType, selectedSalon, salonDataFiltered, data, searchFilter(filteredListOfSalons)]);


    return (
        <div className='container'>
            {isLoading ?
                <LoadingSpinner text={"Loading..."} />
                :
                <>
                    <div className='p-3 mb-3 bg-dark text-white'>
                        <div className="row align-items-end">
                            <div className="col-md-6">
                                <h2>Rezerwacje</h2>
                            </div>
                            <div className='col-md-6'>
                                <div className="d-block flex-nowrap justify-content-end d-sm-flex">
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Szukaj"
                                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                        />
                                    </div>
                                    {(currentUser.role === 'salon_owner' || currentUser.role === 'employee') &&
                                        <div className="p-2">
                                            <button
                                                onClick={() => navigate(`/${userRole}/reservations/add/`)}
                                                type='button'
                                                className='btn btn-primary'
                                            >
                                                DODAJ REZERWACJĘ
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div className="row">
                            {(currentUser.role === 'salon_owner' || currentUser.role === 'admin') &&
                                <div className="col-md-6">
                                    <div>
                                        <label
                                            htmlFor="chooseSalon"
                                            className="form-label text-secondary">
                                            Wybierz salon
                                        </label>
                                        <select
                                            id="chooseSalon"
                                            className="form-select"
                                            value={selectedSalon}
                                            onChange={e => setSelectedSalon(e.target.value)}
                                        >
                                            <option value=''>
                                                Wszystkie
                                            </option>
                                            {salonDataFiltered.map(salon => (
                                                <option key={salon.id} value={salon.id}>
                                                    {salon.name} ({salon.city})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            }
                            <div className='col-md-6'>
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

                        </div>
                    </div>

                    {filteredList.length > 0 ?
                        <div className="table-responsive" style={{ maxHeight: '430px' }}>
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
                                            <td>{item.serviceId.name}</td>
                                            <td>{item.employeeId.user.first_name} {item.employeeId.user.last_name}</td>
                                            <td>{item.customerId.user.first_name} {item.customerId.user.last_name}</td>
                                            <td>{item.salonId.name}</td>
                                            <td>{item.start_time}</td>
                                            <td>{item.end_time}</td>
                                            <td>{item.is_active ?
                                                <span className="badge bg-success">Aktywne</span> :
                                                <span className="badge bg-danger">Zakończone</span>}
                                            </td>
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
                                <i className="bi bi-exclamation-circle" style={{ fontSize: "7rem", color: "red" }}></i>
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
