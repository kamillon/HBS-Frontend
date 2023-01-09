import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"

const Sidebar = (props) => {
    const { userRole, currentUser } = useAuth()

    const functionWithSwitch = () => {
        switch (props.role) {
            case "admin":
                return (
                    <div>
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/`} className="nav-link text-secondary">
                                <i className="bi bi-house-door-fill"></i>
                                <span className="ms-3">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/users/`} className="nav-link text-secondary">
                                <i className="bi bi-people-fill"></i>
                                <span className="ms-3">
                                    Użytkownicy
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/salons/`} className="nav-link text-secondary">
                                <i className="bi bi-building"></i>
                                <span className="ms-3">
                                    Salony
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/services/`} className="nav-link text-secondary">
                                <i className="bi bi-scissors"></i>
                                <span className="ms-3">
                                    Usługi
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/reservations/`} className="nav-link text-secondary">
                                <i className="bi bi-calendar-check-fill"></i>
                                <span className="ms-3">
                                    Rezerwacje
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/statistics/`} className="nav-link text-secondary">
                                <i className="bi bi-graph-up"></i>
                                <span className="ms-3">
                                    Statystyki
                                </span>
                            </Link>
                        </li>
                        <hr />
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/account-settings/`} className="nav-link text-secondary">
                                <i className="bi bi-gear-fill"></i>
                                <span className="ms-3">
                                    Ustawienia konta
                                </span>
                            </Link>
                        </li>
                    </div>
                )
            case "salon_owner":
                return (
                    <div>
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/`} className="nav-link text-secondary">
                                <i className="bi bi-house-door-fill"></i>
                                <span className="ms-3">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/employee/`} className="nav-link text-secondary">
                                <i className="bi bi-people-fill"></i>
                                <span className="ms-3">
                                    Pracownicy
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/salons/`} className="nav-link text-secondary">
                                <i className="bi bi-building"></i>
                                <span className="ms-3">
                                    Salony
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/services/`} className="nav-link text-secondary">
                                <i className="bi bi-scissors"></i>
                                <span className="ms-3">
                                    Usługi
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/reservations/`} className="nav-link text-secondary">
                                <i className="bi bi-calendar-check-fill"></i>
                                <span className="ms-3">
                                    Rezerwacje
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/statistics/`} className="nav-link text-secondary">
                                <i className="bi bi-graph-up"></i>
                                <span className="ms-3">
                                    Statystyki
                                </span>
                            </Link>
                        </li>

                        <hr />

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/account-settings/`} className="nav-link text-secondary">
                                <i className="bi bi-gear-fill"></i>
                                <span className="ms-3">
                                    Ustawienia konta
                                </span>
                            </Link>
                        </li>
                    </div>
                )
            case "employee":
                return (
                    <div>
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/`} className="nav-link text-secondary">
                                <i className="bi bi-house-door-fill"></i>
                                <span className="ms-3">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/reservations/`} className="nav-link text-secondary">
                                <i className="bi bi-calendar-check-fill"></i>
                                <span className="ms-3">
                                    Rezerwacje
                                </span>
                            </Link>
                        </li>
                        <hr />

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/account-settings/`} className="nav-link text-secondary">
                                <i className="bi bi-gear-fill"></i>
                                <span className="ms-3">
                                    Ustawienia konta
                                </span>
                            </Link>
                        </li>
                    </div>
                )
            case "customer":
                return (
                    <div>
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/`} className="nav-link text-secondary">
                                <i className="bi bi-house-door-fill"></i>
                                <span className="ms-3">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/reservations/`} className="nav-link text-secondary">
                                <i className="bi bi-calendar-check-fill"></i>
                                <span className="ms-3">
                                    Rezerwacje
                                </span>
                            </Link>
                        </li>

                        <hr />

                        <li className="nav-item mb-2">
                            <Link to={`/${userRole}/account-settings/`} className="nav-link text-secondary">
                                <i className="bi bi-gear-fill"></i>
                                <span className="ms-3">
                                    Ustawienia konta
                                </span>
                            </Link>
                        </li>
                    </div>
                )
            default:
                return <></>
        }
    }

    return (
        <div className="col-md-3 col-lg-2 sidebar-offcanvas ps-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
            <ul className="nav flex-column sticky-top ps-0p-3">
                <li className="nav-item mb-2 text-center">
                    <i className="bi bi-person-circle" style={{ fontSize: "7rem" }}></i>
                    <h5 className='text-center mt-2'>
                        {currentUser?.first_name} {currentUser?.last_name}
                    </h5>
                </li>
                <hr />

                {functionWithSwitch()}

                {/* <li className="nav-item mb-2">
                    <Link to={`/${userRole}/`} className="nav-link text-secondary">
                        <i className="bi bi-house-door-fill"></i>
                        <span className="ms-3">
                            Dashboard
                        </span>
                    </Link>
                </li>


                <li className="nav-item mb-2">
                    <Link to={`/${userRole}/users/`} className="nav-link text-secondary">
                        <i className="bi bi-people-fill"></i>
                        <span className="ms-3">
                            Użytkownicy
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to={`/${userRole}/salons/`} className="nav-link text-secondary">
                        <i className="bi bi-building"></i>
                        <span className="ms-3">
                            Salony
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to={`/${userRole}/services/`} className="nav-link text-secondary">
                        <i className="bi bi-scissors"></i>
                        <span className="ms-3">
                            Usługi
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to={`/${userRole}/reservations/`} className="nav-link text-secondary">
                        <i className="bi bi-calendar-check-fill"></i>
                        <span className="ms-3">
                            Rezerwacje
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to={`/${userRole}/statistics/`} className="nav-link text-secondary">
                        <i className="bi bi-graph-up"></i>
                        <span className="ms-3">
                            Statystyki
                        </span>
                    </Link>
                </li> */}






                {/* <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="bi bi-building"></i><span className="ms-3">Salony</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="bi bi-scissors"></i><span className="ms-3">Usługi</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="bi bi-calendar-check-fill"></i> <span className="ms-3">Rezerwacje</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="bi bi-graph-up"></i> <span className="ms-3">Statystyki</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#">Wyloguj</a></li> */}
            </ul>
        </div>
    )
}

export default Sidebar