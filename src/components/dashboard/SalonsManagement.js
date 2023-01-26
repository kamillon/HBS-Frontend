import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from '../LoadingSpinner';
import SearchBar from '../SearchBar';
import { API } from '../../App';

const SalonsManagement = () => {
    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()
    const [data, setData] = useState([]);
    const [removed, setRemoved] = useState(false);

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const [salonData, setSalonData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')


    const listSalons = async () => {
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
                setData(res.data)
                setSearch(res.data)
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

    useEffect(() => {
        listSalons()
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
                const res = await axios.delete(`${API}/salon/${id}/`, config);
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


    const filteredData = data.filter(element => {
        return element.owner === parseInt(currentUser.id);
    });


    let dataToBeMapped = ({})
    if (userRole === 'admin') {
        dataToBeMapped = data
    }
    else if (userRole === 'salon_owner') {
        dataToBeMapped = filteredData
    }


    useEffect(() => {
        setSearch(dataToBeMapped)
    }, [data])


    return (
        <div className='container'>
            {isLoading ?
                <LoadingSpinner text={"Loading..."} />
                :
                <>
                    <div className='p-3 mb-3 bg-dark text-white'>
                        <div className="row align-items-end">
                            <div className="col-md-6">
                                <h2>Salony</h2>
                            </div>
                            <div className='col-md-6'>
                                <div className="d-block flex-nowrap justify-content-end d-sm-flex">
                                    <div className="p-2">
                                        <SearchBar
                                            keys={['name', 'city', 'street', 'phone_number', 'email']}
                                            data={dataToBeMapped}
                                            placeholder={"Szukaj"}
                                            setSearch={setSearch}
                                        />
                                    </div>
                                    {userRole === 'admin' ?
                                        <div className="p-2">
                                            <button
                                                onClick={() => navigate(`/${userRole}/salons/add/`)}
                                                type='button'
                                                className='btn btn-primary'
                                            >
                                                DODAJ SALON
                                            </button>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {search.length > 0 ?
                        <div className="table-responsive" style={{ maxHeight: '430px' }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nazwa</th>
                                        <th scope="col">Adres</th>
                                        <th scope="col">Telefon</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Id właściciela</th>
                                        <th scope="col">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {search.map((item) => (
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.city}, ul. {item.street} {item.house_number}</td>
                                            <td>{item.phone_number}</td>
                                            <td>{item.email}</td>
                                            <td>{item.owner}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary me-1"
                                                    style={{ width: '80px' }}
                                                    onClick={() => navigate(`/${userRole}/salons/edit/${item.id}`)}
                                                >
                                                    EDYTUJ
                                                </button>
                                                <button
                                                    type="button"
                                                    style={{ width: '80px' }}
                                                    className="btn btn-danger mt-1 mt-md-0"
                                                    onClick={() => {
                                                        handleShow();
                                                        setSalonData({ id: item.id, name: item.name })
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
                        <p>Brak salonów fryzjerskich do wyświetlenia</p>
                    }
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Potwierdzenie usuwania</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='text-center'>
                                <i className="bi bi-exclamation-circle" style={{ fontSize: "7rem", color: "red" }}></i>
                                <h4>Jesteś pewny?</h4>
                                <p>Czy na pewno chcesz usunąć salon {salonData.name}?</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Anuluj
                            </Button>
                            <Button variant="danger"
                                onClick={() => {
                                    onDelete(salonData.id)
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


export default SalonsManagement;