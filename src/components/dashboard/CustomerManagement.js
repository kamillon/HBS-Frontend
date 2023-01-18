import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

const CustomerManagement = () => {
    const navigate = useNavigate()
    const { access, userRole, currentUser } = useAuth()
    const [data, setData] = useState([]);
    const [salonData, setSalonData] = useState([]);
    const [selectedSalon, setSelectedSalon] = useState('');
    const [employeeSalon, setEmployeeSalon] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null);

    const listCustomers = async (salon) => {
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
                const url = `http://127.0.0.1:8000/list-of-salon-customers/${salon}/`
                const res = await axios.get(url, config);
                setData(res.data)
                setIsLoading(false)
                setError(null)

            } catch (err) {
                setData(null)
                console.log(err)
                setIsLoading(false)
                if (err.response.status == 404) {
                    setError('Brak klientów do wyświetlenia');
                }
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

    const getEmployeeSalon = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const url = `http://127.0.0.1:8000/employee/${currentUser.id}/`
            const res = await axios.get(url, config);
            setEmployeeSalon(res.data.salon)

        } catch (err) {
            setEmployeeSalon(null)
            console.log(err)
        }
    };

    useEffect(() => {
        getSalons()
        if (userRole == "employee") {
            getEmployeeSalon()
        }
    }, [access])

    useEffect(() => {
        if (userRole === "salon_owner") {
            if (selectedSalon) {
                listCustomers(selectedSalon)
            }
            else {
                setData([])
            }
        }
        else if (userRole === "employee") {
            if (employeeSalon) {
                listCustomers(employeeSalon)
            }

        }
    }, [selectedSalon, employeeSalon])


    let salonDataFiltered = ''
    if (userRole === "salon_owner") {
        salonDataFiltered = salonData.filter(i => i.owner == currentUser.id)
    }
    else if (userRole === "employee") {
        salonDataFiltered = salonData.filter(i => i.id === employeeSalon)
    }

    const searchFilter = (data) => {
        if (data) {
            return data.filter(item => (
                search === ''
                    ? item
                    : item.customerId.user.first_name.toLowerCase().includes(search) ||
                    item.customerId.user.last_name.toLowerCase().includes(search) ||
                    item.customerId.user.email.toLowerCase().includes(search)
            ))
        }
        else {
            return null
        }
    }

    function getFilteredList() {
        if (!selectedSalon) {
            return searchFilter(data)
        }
        else {
            return searchFilter(data)
        }
    }

    const filteredList = useMemo(getFilteredList, [selectedSalon, salonDataFiltered, data]);
    console.log(filteredList)

    return (
        <div className='container'>
            {isLoading ?
                <LoadingSpinner text={"Loading..."} />
                :
                <>
                    <div className='p-3 mb-3 bg-dark text-white'>
                        <div className="row align-items-end">
                            <div className="col-md-6">
                                <h2>Klienci</h2>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    {userRole === "salon_owner" &&
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
                            <div className='row'>
                                <div className="col-12 mt-3">
                                    {error && error}
                                </div>
                            </div>
                        </div>
                    }
                    {data && filteredList.length > 0 ?
                        <div className="table-responsive" style={{ maxHeight: '430px' }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Imię i nazwisko</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Telefon</th>
                                        <th scope="col">Status konta</th>
                                        <th scope="col">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredList.map((item) => (
                                        <tr key={item.customerId.user.id}>
                                            <th scope="row">{item.customerId.user.id}</th>
                                            <td>{item.customerId.user.first_name} {item.customerId.user.last_name}</td>
                                            <td>{item.customerId.user.email}</td>
                                            <td>{item.customerId.user.phone}</td>
                                            <td>{item.customerId.user.is_active ?
                                                <span className="badge bg-success">Aktywne</span> :
                                                <span className="badge bg-danger">Nieaktywne</span>}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary me-1"
                                                    onClick={() => navigate(`/${userRole}/customers/details/${item.customerId.user.id}`,
                                                        {
                                                            state: {
                                                                salon: userRole === "salon_owner" ? selectedSalon : employeeSalon
                                                            }
                                                        })}
                                                >
                                                    SZCZEGÓŁY
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
                </>
            }
        </div>
    )
};

export default CustomerManagement;