import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="col-md-3 col-lg-2 sidebar-offcanvas ps-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
            <ul className="nav flex-column sticky-top ps-0 pt-5 p-3">
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><h5>Jacob Nejam</h5></a></li>
                <hr />

                <li className="nav-item mb-2">
                    <Link to="/admin/" className="nav-link text-secondary">
                        <i className="bi bi-house-door-fill"></i>
                        <span className="ms-3">
                            Dashboard
                        </span>
                    </Link>
                </li>


                <li className="nav-item mb-2">
                    <Link to="/admin/users/" className="nav-link text-secondary">
                        <i className="bi bi-people-fill"></i>
                        <span className="ms-3">
                            Użytkownicy
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to="/admin/salons/" className="nav-link text-secondary">
                        <i className="bi bi-building"></i>
                        <span className="ms-3">
                            Salony
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to="/admin/services/" className="nav-link text-secondary">
                        <i className="bi bi-scissors"></i>
                        <span className="ms-3">
                            Usługi
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to="/admin/reservations/" className="nav-link text-secondary">
                        <i className="bi bi-calendar-check-fill"></i>
                        <span className="ms-3">
                            Rezerwacje
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to="/admin/statistics/" className="nav-link text-secondary">
                        <i className="bi bi-graph-up"></i>
                        <span className="ms-3">
                            Statystyki
                        </span>
                    </Link>
                </li>






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