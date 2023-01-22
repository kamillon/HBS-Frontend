import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const UsersTable = (props) => {

    const navigate = useNavigate()
    const { access, userRole } = useAuth()
    const [removed, setRemoved] = useState(false);
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [userData, setUserData] = useState({})
    const data = props.data
    const search = props.search

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


    return (
        <>
            {data && search.length > 0
                ?
                <div className="table-responsive" style={{maxHeight: '430px'}}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Imię i nazwisko</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Status konta</th>
                                <th scope="col">Rola</th>
                                <th scope="col">Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {search.map((item) => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.first_name} {item.last_name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.is_active ?
                                        <span className="badge bg-success">Aktywne</span> :
                                        <span className="badge bg-danger">Nieaktywne</span>}
                                    </td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary me-1"
                                            style={{ width: '80px' }}
                                            onClick={() => navigate(`/${userRole}/users/edit/${item.id}`)}
                                        >
                                            EDYTUJ
                                        </button>
                                        <button
                                            type="button"
                                            style={{ width: '80px' }}
                                            className="btn btn-danger mt-1 mt-md-0"
                                            onClick={() => {
                                                handleShow();
                                                setUserData({ id: item.id, first_name: item.first_name, last_name: item.last_name })
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
                <p>Brak wyników</p>
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
    )
};

export default UsersTable;