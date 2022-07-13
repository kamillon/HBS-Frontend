import React from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import './admin.css'; 


const AdminDashboard = () => {    
    return(
        <div className="d-flex min-vh-100">
            <div id="sidebar" className="d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
              <div id="sidebar-wrapper" className="min-vh-100">
                <ul className="list-unstyled components">
                    <li className="navbar-item">
                      <Link to="/admin/users/" className="nav-link">Uzytkownicy</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/term" className="nav-link">Terms</Link>
                    </li>
                </ul>
              </div>
            </div>
        </div>
)};

export default AdminDashboard;