import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const ManageUsers = () => {

    const { access } = useAuth()
    const [data, setData] = useState([]);

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
    }, [])




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
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">1</th>
                                <td>{item.username}</td>
                                <td>{item.first_name}</td>
                                <td>{item.role}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};


export default ManageUsers;
