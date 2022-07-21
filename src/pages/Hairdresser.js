import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HairdressingSalonList from '../components/HairdressingSalonList';

const Hairdresser = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([]);

    useEffect(() => {
        const listUsers = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('http://127.0.0.1:8000/salon/', config);

                setData(res.data)
                console.log(res.data)

            } catch (err) {
                setData(null)
                console.log(err)
            }
        };


        listUsers()
    }, [])




    
    return(
      <div>
            <section className="p-5 bg-light">
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md'>
                        <a href='#'>
                            <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5282.png" className="img-fluid" alt="..." />
                        </a>
                    </div>
                    <div className='col-md'>
                        <h2>Learn The basic</h2>
                        <p>Contrart to populat belief, Lorem Ipsumasdsd
                            asdsadsadsadsadasdsadasdasdsadsadsad
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td> */}
                            {/* <td>{item.is_active.toString()}</td> */}
                            {/* <td>{item.is_active ? "active" : "disabled"}</td>
                            <td>{item.role}</td> */}
        
        {data.map((item) => (
            <HairdressingSalonList 
            key={item.id} 
            id={item.id}
            title={item.nazwa} 
            ulica={item.ulica}
            nr_budynku={item.nr_budynku}
            miejscowosc={item.miejscowosc}
            />
        ))}

      </div>
    )};

export default Hairdresser;