import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';

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
    const [selectedSalon, setSelectedSalon] = useState();


    useEffect(() => {
        const getReservation = async () => {
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
                } catch (err) {
                    setData(null)
                    console.log(err)
                }
            } else {
                setData(null)
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
                    setSalonData(res.data)
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

        getReservation()
        if (currentUser.role === 'salon_owner') {
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


    const salonDataFiltered = salonData.filter(i => i.owner == currentUser.id)

    let mappedData = ({})
    if (userRole === 'admin') {
        mappedData = data
    }
    else if (userRole === 'salon_owner') {
        mappedData = data.filter(i => i.salonId == selectedSalon)
    }
    else if (userRole === 'employee') {
        mappedData = data.filter(i => i.employeeId == currentUser.id)
    }

    return (
        <div className='container'>
            <div className='row mb-5'>
                <div className='col'>
                    <h2>Rezerwacje</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 text-center mb-3">
                    {currentUser.role === 'salon_owner' &&
                    <select className="form-select" value={selectedSalon} onChange={e => setSelectedSalon(e.target.value)}>
                        <option>---Wybierz salon---</option>
                        {salonDataFiltered.map(salon => (
                            <option key={salon.id} value={salon.id}>
                                {salon.name}
                            </option>
                        ))}
                    </select>
                    }
                </div>
            </div>
            
            {mappedData.length > 0 ?
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Klient</th>
                                <th scope="col">Salon</th>
                                <th scope="col">Usługa</th>
                                <th scope="col">Pracownik</th>
                                <th scope="col">Data</th>
                                <th scope="col">Czas rozpoczęcia</th>
                                <th scope="col">Czas zakończenia</th>
                                <th scope="col">Status</th>
                                <th scope="col">Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mappedData.map((item) => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.customerId}</td>
                                    <td>{item.salonId}</td>
                                    <td>{item.serviceId}</td>
                                    <td>{item.employeeId}</td>
                                    <td>{item.date}</td>
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
                <></>
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
        </div>
    )
};


export default ReservationsManagement;


