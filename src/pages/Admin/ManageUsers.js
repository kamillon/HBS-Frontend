import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';

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
    },[removed])

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



    return (
        <div className='container'>
            <h1>ManageUsers</h1>
            <button
                onClick={() => navigate('/admin/users/add/')}
                style={{ marginTop: '50px' }}
                type='button'
                className='btn btn-primary'
            >
                Add user
            </button>


            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Is active?</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            {/* <td>{item.is_active.toString()}</td> */}
                            <td>{item.is_active ? "active" : "disabled"}</td>
                            <td>{item.role}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary me-1"
                                    onClick={() => navigate(`/admin/users/edit/${item.id}`)}
                                >
                                    EDIT
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => onDelete(item.id)}
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
};


export default ManageUsers;
