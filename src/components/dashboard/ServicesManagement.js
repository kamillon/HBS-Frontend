import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';
import LoadingSpinner from '../LoadingSpinner';

const ServiceManagement = () => {

    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()
    const [data, setData] = useState([]);
    const [salonData, setSalonData] = useState([]);
    const [removed, setRemoved] = useState(false);
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [servicesData, setServicesData] = useState({})
    const [selectedSalon, setSelectedSalon] = useState('');
    const [ownerSalons, setOwnerSalons] = useState([]);
    const [isLoading, setIsLoading] = useState(true)



    const convertMinsToTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        let minutesResult = minutes < 10 ? '0' + minutes : minutes;
        return `${hours ? `${hours}g ` : ''} ${minutes ? `${minutesResult}min ` : ''}`
    }

    useEffect(() => {
        const getServices = async () => {
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
                    const res = await axios.get(`http://127.0.0.1:8000/service/`, config);
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

        // const listOfSalonsOwners = async () => {
        //     if (access) {
        //         const config = {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `JWT ${access}`,
        //                 'Accept': 'application/json'
        //             }
        //         };

        //         try {
        //             const res = await axios.get(`http://127.0.0.1:8000/list-of-owners-salons/${currentUser.id}/`, config);
        //             setOwnerSalons(res.data)
        //             console.log(res.data)
        //         } catch (err) {
        //             setOwnerSalons(null)
        //             console.log(err)
        //         }
        //     } else {
        //         setOwnerSalons(null)
        //         console.log("Blad")
        //     }
        // };

        getServices()
        getSalons()
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
                const res = await axios.delete(`http://127.0.0.1:8000/service/${id}/`, config);
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
        salonDataFiltered = salonData.filter(i => i.owner == currentUser.id)
    }
    else if (userRole === 'admin') {
        salonDataFiltered = salonData
    }

    function getFilteredList() {
        if (!selectedSalon) {
            if (userRole === 'salon_owner') {
                const filteredServices = data.filter(services => {
                    return salonDataFiltered.find(salon => salon.id === services.salonID);
                });
                return filteredServices
            }
            else if (userRole === 'admin') {
                return data
            }
        }
        return data.filter(i => i.salonID == selectedSalon)
    }

    const filteredList = useMemo(getFilteredList, [selectedSalon, salonDataFiltered, data]);

    return (
        <div className='container'>
            {isLoading ?
                <LoadingSpinner text={"Loading..."} />
                :
                <>
                    <div className='row mb-5'>
                        <div className='col'>
                            <h2>Usługi</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 text-start mb-3">
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
                        <div className="col-12 col-md-6 text-center text-md-end mt-3 mt-md-0">
                            {salonDataFiltered.length > 0 ?
                                <button
                                    onClick={() => navigate(`/${userRole}/services/add/`)}
                                    type='button'
                                    className='btn btn-primary'
                                >
                                    DODAJ USŁUGĘ
                                </button>
                                :
                                <button
                                    type='button'
                                    disabled
                                    className='btn btn-primary'
                                >
                                    DODAJ USŁUGĘ
                                </button>
                            }
                        </div>
                    </div>

                    {filteredList.length > 0 ?
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nazwa usługi</th>
                                        <th scope="col">Typ</th>
                                        {/* <th scope="col">Opis</th> */}
                                        <th scope="col">Czas trwania</th>
                                        <th scope="col">Cena</th>
                                        <th scope="col">SalonID</th>
                                        <th scope="col">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredList.map((item) => (
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.service_type === "men's" ? "męskie" : "damskie"}</td>
                                            {/* <td>{item.describe.substring(0, 20)} ...</td> */}
                                            <td>{convertMinsToTime(item.time)}</td>
                                            <td>{item.price} zł</td>
                                            <td>{item.salonID}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary me-1"
                                                    style={{ width: '80px' }}
                                                    onClick={() => navigate(`/${userRole}/services/edit/${item.id}`)}
                                                >
                                                    EDYTUJ
                                                </button>
                                                <button
                                                    type="button"
                                                    style={{ width: '80px' }}
                                                    className="btn btn-danger mt-1 mt-md-0"
                                                    onClick={() => {
                                                        handleShow();
                                                        setServicesData({ id: item.id, name: item.name })
                                                    }}
                                                >
                                                    USUŃ
                                                </button>
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
                            <Modal.Title>Potwierdzenie usuwania</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='text-center'>
                                <img src={wykrzyknik} style={{ width: "15%" }} alt="wykrzyknik" />
                                <h4>Jesteś pewny?</h4>
                                <p>Czy na pewno chcesz usunąć usługę {servicesData.name}?</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Anuluj
                            </Button>
                            <Button variant="danger"
                                onClick={() => {
                                    onDelete(servicesData.id)
                                    setSalonData({})
                                    handleClose()
                                }}>
                                Usuń
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </div>
    )
};

export default ServiceManagement;


