import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';

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
    const [selectedSalon, setSelectedSalon] = useState();


    useEffect(() => {
        const listUsers = async () => {
            if (access) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const url = `http://127.0.0.1:8000/employee/`

                    const res = await axios.get(url, config);

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
                const res = await axios.delete(`http://127.0.0.1:8000/auth/users/${id}/`, config);
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

    let mappedData = data.filter(i => i.salon == selectedSalon)
    let mappedSalons = salonData.filter(i => i.owner == currentUser.id)

    return (
        <div className='container'>
            <div className='row mb-5'>
                <div className='col'>
                    <h2>Pracownicy</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 text-center mb-3">
                    <select className="form-select" value={selectedSalon} onChange={e => setSelectedSalon(e.target.value)}>
                        <option>---Wybierz salon---</option>
                        {mappedSalons ?
                            mappedSalons.map(salon => (
                                <option key={salon.id} value={salon.id}>
                                    {salon.name} ({salon.city})
                                </option>
                            ))
                            :
                            <></>
                        }
                    </select>
                </div>

                <div className="col-md-6 text-center mt-3 mt-md-0">
                    <button
                        onClick={() => navigate(`/${userRole}/employee/add/`)}
                        type='button'
                        className='btn btn-primary'
                    >
                        DODAJ PRACOWNIKA
                    </button>
                </div>
            </div>

            {mappedData.length > 0 ?
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Imię</th>
                                <th scope="col">Nazwisko</th>
                                <th scope="col">SalonId</th>
                                <th scope="col">Status konta</th>
                                <th scope="col">Rola</th>
                                <th scope="col">Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mappedData.map((item) => (
                                <tr key={item.user.id}>
                                    <th scope="row">{item.user.id}</th>
                                    <td>{item.user.email}</td>
                                    <td>{item.user.first_name}</td>
                                    <td>{item.user.last_name}</td>
                                    <td>{item.salon}</td>
                                    <td>{item.user.is_active ? "active" : "inactive"}</td>
                                    <td>{item.user.role}</td>
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
                <></>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie usuwania</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <img src={wykrzyknik} style={{ width: "15%" }} alt="wykrzynik" />
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
        </div>
    )
};

export default EmployeesManagement;


