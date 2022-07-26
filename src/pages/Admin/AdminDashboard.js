import React from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './admin.css';


// const AdminDashboard = () => {    
//     return(
//         <div className="d-flex min-vh-100">
//             <div id="sidebar" className="d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
//               <div id="sidebar-wrapper" className="min-vh-100">
//                 <ul className="list-unstyled components">
//                     <li className="navbar-item">
//                       <Link to="/admin/users/" className="nav-link">Uzytkownicy</Link>
//                     </li>
//                     <li className="navbar-item">
//                       <Link to="/about" className="nav-link">About</Link>
//                     </li>
//                     <li className="navbar-item">
//                       <Link to="/term" className="nav-link">Terms</Link>
//                     </li>
//                 </ul>
//               </div>
//             </div>
//         </div>
// )};

// export default AdminDashboard;


const AdminDashboard = () => {
  return (
    <div className="container-fluid h-100" id="main">
      <div className="row row-offcanvas row-offcanvas-left h-100">
        <Sidebar />

        <div className="col main p-5">

          <p className="lead d-none d-sm-block">Add Employee Details and Records</p>
          <h2>Witaj, Jan !</h2>

          <div className="row mb-3">
            <div className="col-sm-6 col-md-12 py-2">
              <p>Strona profilu</p>
              <p>Tu zobaczysz podsumowanie swojego profilu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AdminDashboard;