import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';
import Sidebar from '../../components/Sidebar';
import UserManagement from '../../components/UserManagement';
import './admin.css';

const ManageUsers = () => {

    const navigate = useNavigate()
    const { access } = useAuth()
    const [data, setData] = useState([]);
    const [removed, setRemoved] = useState(false);

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
                    const res = await axios.get('http://127.0.0.1:8000/auth/users/', config);

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


        listUsers()
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

    // if (removed) {
    //     window.location.reload(false);
    // }



    useEffect(() => {
        if (removed) {
            window.location.reload(false);
        }
    }, [removed])

    //     return(
    //         <div className='container'>
    //             <h1>ManageUsers</h1>
    //             {/* <div className="col">
    //                 <h1>Mi Casa</h1>
    //                 {data.map(home => <div>{home.username}</div>)}
    //             </div> */}
    //             <ul>
    //                 {data.map((item) => (
    //                     <div key={item.id}>
    //                         <a>{item.username}</a>
    //                         <a href=''>Edit</a>
    //                         <hr/>
    //                     </div>
    //                 ))}
    //             </ul>
    //         </div>
    // )};



    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    // const [selectedItem, setSelectedItem] = useState()

    const [userData, setUserData] = useState({})



    //     return (
    //         <div className='container'>
    //             <h1>ManageUsers</h1>
    //             <button
    //                 onClick={() => navigate('/admin/users/add/')}
    //                 style={{ marginTop: '50px' }}
    //                 type='button'
    //                 className='btn btn-primary'
    //             >
    //                 DODAJ UŻYTKOWNIKA
    //             </button>


    //             <table className="table table-hover">
    //                 <thead>
    //                     <tr>
    //                         <th scope="col">Username</th>
    //                         <th scope="col">First Name</th>
    //                         <th scope="col">Last Name</th>
    //                         <th scope="col">Is active?</th>
    //                         <th scope="col">Role</th>
    //                         <th scope="col">Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {data.map((item) => (
    //                         <tr key={item.id}>
    //                             <td>{item.username}</td>
    //                             <td>{item.first_name}</td>
    //                             <td>{item.last_name}</td>
    //                             {/* <td>{item.is_active.toString()}</td> */}
    //                             <td>{item.is_active ? "active" : "disabled"}</td>
    //                             <td>{item.role}</td>
    //                             <td>
    //                                 <button
    //                                     type="button"
    //                                     className="btn btn-primary me-1"
    //                                     onClick={() => navigate(`/admin/users/edit/${item.id}`)}
    //                                 >
    //                                     EDYTUJ
    //                                 </button>
    //                                 <button
    //                                     type="button"
    //                                     className="btn btn-danger"
    //                                     // onClick={() => onDelete(item.id)}
    //                                     onClick={() => {
    //                                         handleShow();
    //                                         setUserData({id: item.id, first_name: item.first_name, last_name: item.last_name})}}
    //                                 >
    //                                     USUŃ
    //                                 </button>
    //                             </td>
    //                         </tr>
    //                     ))
    //                     }
    //                 </tbody>
    //             </table>

    //             {/* <Button variant="primary" onClick={handleShow}>
    //                 Launch demo modal
    //             </Button> */}

    //             <Modal show={show} onHide={handleClose}>
    //                 <Modal.Header closeButton>
    //                     <Modal.Title>Potwierdzenie usuwania</Modal.Title>
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     <div className='text-center'>
    //                         <img src={wykrzyknik} style={{width: "15%"}} alt="" />
    //                         <h4>Jesteś pewny?</h4>
    //                         <p>Czy na pewno chcesz usunąć użytkownika {userData.first_name} {userData.last_name}?</p>
    //                     </div>
    //                     </Modal.Body>
    //                 <Modal.Footer>
    //                     <Button variant="secondary" onClick={handleClose}>
    //                         Anuluj
    //                     </Button>
    //                     <Button variant="danger" 
    //                     onClick={() => {
    //                         // onDelete(selectedItem);
    //                         onDelete(userData.id)
    //                         setUserData({})
    //                         handleClose()
    //                         }}>
    //                         Usuń
    //                     </Button>
    //                 </Modal.Footer>
    //             </Modal>
    //         </div>
    //     )
    // };




    return (
        <div className="content-wrap container-fluid" id="main">
            <div className="main-content row row-offcanvas row-offcanvas-left">
                <Sidebar />

                <div className="col main p-5">

                    <div>
                    <p className="lead d-none d-sm-block">
                        Add Employee Details and Records
                    </p>
                    <h2>Witaj, Jan !</h2>
                    </div>

                    <div className="row">
                        {/* <div className="col-sm-6 col-md-12 py-2"> */}
                        <UserManagement />
                  

                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>


















    )
};


export default ManageUsers;
