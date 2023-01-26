import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from '../LoadingSpinner';
import { API } from '../../App';

const EmployeesManagement = () => {
    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()
    const [data, setData] = useState([]);
    const [salonData, setSalonData] = useState([]);
    const [removed, setRemoved] = useState(false);
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [userData, setUserData] = useState({})
    const [selectedSalon, setSelectedSalon] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')

    const listUsers = async () => {
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
                const url = `${API}/employee/`
                const res = await axios.get(url, config);
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
                const res = await axios.get(`${API}/salon/`, config);
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

    useEffect(() => {
        listUsers()
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
                const res = await axios.delete(`${API}/auth/users/${id}/`, config);
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

    const searchFilter = (data) => {
        return data.filter(item => (
            search === ''
                ? item
                : item.user.first_name.toLowerCase().includes(search) ||
                item.user.last_name.toLowerCase().includes(search) ||
                item.user.email.toLowerCase().includes(search)
        ))
    }

    function getFilteredList() {
        if (!selectedSalon) {
            const filteredEmployee = data.filter(employee => {
                return salonDataFiltered.find(salon => salon.id === employee.salon);
            });
            return searchFilter(filteredEmployee)
        }
        else {
            const result = data.filter(i => i.salon == selectedSalon)
            return searchFilter(result)
        }
    }

    const filteredList = useMemo(getFilteredList, [selectedSalon, salonDataFiltered, data]);

    return (
        <div className='container'>
            {isLoading ?
                <LoadingSpinner text={"Loading..."} />
                :
                <>
                    <div className='p-3 mb-3 bg-dark text-white'>
                        <div className="row align-items-end">
                            <div className="col-md-6">
                                <h2>Pracownicy</h2>
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
                                    <div className="p-2">
                                        {salonDataFiltered.length > 0 ?
                                            <button
                                                onClick={() => navigate(`/${userRole}/employee/add/`)}
                                                type='button'
                                                className='btn btn-primary'
                                            >
                                                DODAJ PRACOWNIKA
                                            </button>
                                            :
                                            <button
                                                type='button'
                                                disabled
                                                className='btn btn-primary'
                                            >
                                                DODAJ PRACOWNIKA
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div className="row">
                            <div className="col-12">
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
                                        {salonDataFiltered ?
                                            salonDataFiltered.map(salon => (
                                                <option key={salon.id} value={salon.id}>
                                                    {salon.name} ({salon.city})
                                                </option>
                                            ))
                                            :
                                            <></>
                                        }
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
                                        <th scope="col">Imię i nazwisko</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Telefon</th>
                                        <th scope="col">Status konta</th>
                                        <th scope="col">SalonId</th>
                                        <th scope="col">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredList.map((item) => (
                                        <tr key={item.user.id}>
                                            <th scope="row">{item.user.id}</th>
                                            <td>{item.user.first_name} {item.user.last_name}</td>
                                            <td>{item.user.email}</td>
                                            <td>{item.user.phone}</td>
                                            <td>{item.user.is_active ?
                                                <span className="badge bg-success">Aktywne</span> :
                                                <span className="badge bg-danger">Nieaktywne</span>}
                                            </td>
                                            <td>{item.salon}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary me-1"
                                                    style={{ width: '80px' }}
                                                    onClick={() => navigate(`/${userRole}/employee/edit/${item.user.id}`)}
                                                >
                                                    EDYTUJ
                                                </button>
                                                <button
                                                    type="button"
                                                    style={{ width: '80px' }}
                                                    className="btn btn-danger mt-1 mt-md-0"
                                                    onClick={() => {
                                                        handleShow();
                                                        setUserData({
                                                            id: item.user.id,
                                                            first_name: item.user.first_name,
                                                            last_name: item.user.last_name
                                                        })
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
                        <p>Brak pracowników do wyświetlenia</p>
                    }

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Potwierdzenie usuwania</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='text-center'>
                                <i className="bi bi-exclamation-circle" style={{ fontSize: "7rem", color: "red" }}></i>
                                <h4>Jesteś pewny?</h4>
                                <p>Czy na pewno chcesz usunąć użytkownika {userData.first_name} {userData.last_name}?</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Anuluj
                            </Button>
                            <Button variant="danger"
                                onClick={() => {
                                    onDelete(userData.id)
                                    setUserData({})
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

export default EmployeesManagement;


