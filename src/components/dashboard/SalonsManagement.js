import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import wykrzyknik from '../../images/wykrzyknik.png';
import Sidebar from '../Sidebar';

const SalonsManagement = () => {

    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()
    const [data, setData] = useState([]);
    const [removed, setRemoved] = useState(false);

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const [salonData, setSalonData] = useState({})


    const listSalons = async () => {
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
                const res = await axios.delete(`http://127.0.0.1:8000/salon/${id}/`, config);
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




    const filteredData = data.filter(element => {
        return element.wlasciciel === currentUser.id;
    });

    
    let dataToBeMapped = ({})
    if(userRole === 'admin'){
        dataToBeMapped = data
    }
    else if(userRole === 'salon_owner'){
        dataToBeMapped = filteredData
    }
      


      return (
        <div className='container'>

            {userRole === 'admin' ? 
                <div>
                    <h2>Zarządzaj salonami</h2>
                    <button
                        onClick={() => navigate(`/${userRole}/salons/add/`)}
                        type='button'
                        className='btn btn-primary mt-5 mb-3'
                    >
                        DODAJ SALON
                    </button>
                </div> : <></>
            }


            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nazwa</th>
                            <th scope="col">Ulica</th>
                            <th scope="col">Nr budynku</th>
                            <th scope="col">Miejscowość</th>
                            <th scope="col">Kod pocztowy</th>
                            <th scope="col">Poczta</th>
                            <th scope="col">Telefon</th>
                            <th scope="col">Email</th>
                            <th scope="col">Właściciel</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToBeMapped.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.nazwa}</td>
                                <td>{item.ulica}</td>
                                <td>{item.nr_budynku}</td>
                                <td>{item.miejscowosc}</td>
                                <td>{item.kod_pocztowy}</td>
                                <td>{item.poczta}</td>
                                <td>{item.telefon}</td>
                                <td>{item.email}</td>
                                <td>{item.wlasciciel}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary me-1"
                                        style={{width: '80px'}}
                                        onClick={() => navigate(`/${userRole}/salons/edit/${item.id}`)}
                                    >
                                        EDYTUJ
                                    </button>
                                    <button
                                        type="button"
                                        style={{width: '80px'}}
                                        className="btn btn-danger mt-1 mt-md-0"
                                        onClick={() => {
                                            handleShow();
                                            setSalonData({id: item.id, nazwa: item.nazwa})
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

            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie usuwania</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <img src={wykrzyknik} style={{width: "15%"}} alt="" />
                        <h4>Jesteś pewny?</h4>
                        <p>Czy na pewno chcesz usunąć salon {salonData.nazwa}?</p>
                    </div>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="danger" 
                    onClick={() => {
                        // onDelete(selectedItem);
                        onDelete(salonData.id)
                        setSalonData({})
                        handleClose()
                        }}>
                        Usuń
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};


export default SalonsManagement;




// ################################################################################################



//     return (
//         <div className='container'>
//             <h2>Zarządzaj salonami</h2>
//             <button
//                 onClick={() => navigate(`/${userRole}/salons/add/`)}
//                 type='button'
//                 className='btn btn-primary mt-5 mb-3'
//             >
//                 DODAJ SALON
//             </button>


//             <div className="table-responsive">
//                 <table className="table table-hover">
//                     <thead>
//                         <tr>
//                             <th scope="col">Id</th>
//                             <th scope="col">Nazwa</th>
//                             <th scope="col">Ulica</th>
//                             <th scope="col">Nr budynku</th>
//                             <th scope="col">Miejscowość</th>
//                             <th scope="col">Kod pocztowy</th>
//                             <th scope="col">Poczta</th>
//                             <th scope="col">Telefon</th>
//                             <th scope="col">Email</th>
//                             <th scope="col">Właściciel</th>
//                             <th scope="col">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((item) => (
//                             <tr key={item.id}>
//                                 <th scope="row">{item.id}</th>
//                                 <td>{item.nazwa}</td>
//                                 <td>{item.ulica}</td>
//                                 <td>{item.nr_budynku}</td>
//                                 <td>{item.miejscowosc}</td>
//                                 <td>{item.kod_pocztowy}</td>
//                                 <td>{item.poczta}</td>
//                                 <td>{item.telefon}</td>
//                                 <td>{item.email}</td>
//                                 <td>{item.wlasciciel}</td>
//                                 <td>
//                                     <button
//                                         type="button"
//                                         className="btn btn-primary me-1"
//                                         style={{width: '80px'}}
//                                         onClick={() => navigate(`/${userRole}/salons/edit/${item.id}`)}
//                                     >
//                                         EDYTUJ
//                                     </button>
//                                     <button
//                                         type="button"
//                                         style={{width: '80px'}}
//                                         className="btn btn-danger mt-1 mt-md-0"
//                                         onClick={() => {
//                                             handleShow();
//                                             setSalonData({id: item.id, nazwa: item.nazwa})
//                                         }}
//                                     >
//                                         USUŃ
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                         }
//                     </tbody>
//                 </table>
//             </div>

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
//                         <p>Czy na pewno chcesz usunąć salon {salonData.nazwa}?</p>
//                     </div>
//                     </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Anuluj
//                     </Button>
//                     <Button variant="danger" 
//                     onClick={() => {
//                         // onDelete(selectedItem);
//                         onDelete(salonData.id)
//                         setSalonData({})
//                         handleClose()
//                         }}>
//                         Usuń
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// };


// export default SalonsManagement;
