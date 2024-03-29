import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import Activate from './containers/Activate/Activate';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPassword/ResetPasswordConfirm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout'
import AdminDashboard from './pages/Admin/AdminDashboard';
import { RequireAuth } from './components/RequireAuth';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import CustomerDashboard from './pages/Customer/CustomerDashboard';
import SalonOwnerDashboard from './pages/SalonOwner/SalonOwnerDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import AddUser from './components/dashboard/User/AddUser';
import EditUser from './components/dashboard/User/EditUser';
import HairSalon from './pages/HairSalon/HairSalon';
import HairSalonDetail from './pages/HairSalonDetail/HairSalonDetail';
import ManageEmployee from './pages/SalonOwner/ManageEmployee';
import Salons from './components/dashboard/Salon/Salons';
import AddSalon from './components/dashboard/Salon/AddSalon';
import EditSalon from './components/dashboard/Salon/EditSalon';
import AccountSettings from './components/dashboard/Account/AccountSettings';
import ChangeEmailConfirm from './components/dashboard/Account/ChangeEmailConfirm';
import Booking from './pages/Booking/Booking';
import Reservations from './components/dashboard/Reservation/Reservations';
import Services from './components/dashboard/Service/Services';
import AddService from './components/dashboard/Service/AddService';
import EditService from './components/dashboard/Service/EditService';
import WorkHours from './components/dashboard/WorkHours/WorkHours';
import AddEmployee from './components/dashboard/Employee/AddEmployee';
import EditEmployee from './components/dashboard/Employee/EditEmployee';
import Customers from './components/dashboard/Customer/Customers';
import CustomerDetails from './components/dashboard/Customer/CustomerDetails';
import AddReservation from './components/dashboard/Reservation/AddReservation';

const ROLES = {
  "customer": "customer",
  "admin": "admin",
  "employee": "employee",
  "salon_owner": "salon_owner"
}

export const API = `http://127.0.0.1:8000`;

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/reset-password' element={<ResetPassword />} />
            <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
            <Route exact path='/activate/:uid/:token' element={<Activate />} />
            <Route exact path='/hairsalon' element={<HairSalon />} />
            <Route path='hairsalon/:salonId' element={<HairSalonDetail />} />
            <Route path='hairsalon/:salonId/booking' element={<Booking />} />
            <Route exact path='/unauthorized' element={<Unauthorized />} />
            <Route exact path='/email/reset/confirm/:uid/:token' element={<ChangeEmailConfirm />} />

            <Route element={<RequireAuth allowedRole={ROLES.customer} />}>
              <Route exact path='/customer/' element={<CustomerDashboard />} />
              <Route path='/customer/account-settings/' element={<AccountSettings />} />
              <Route path='/customer/reservations/' element={<Reservations />} />
            </Route>

            <Route element={<RequireAuth allowedRole={ROLES.admin} />}>
              <Route exact path='/admin/' element={<AdminDashboard />} />
              <Route path='/admin/users/' element={<ManageUsers />} />
              <Route path='/admin/users/add/' element={<AddUser />} />
              <Route path='/admin/users/edit/:uid' element={<EditUser />} />
              <Route path='/admin/salons/' element={<Salons />} />
              <Route path='/admin/salons/add/' element={<AddSalon />} />
              <Route path='/admin/salons/edit/:uid' element={<EditSalon />} />
              <Route path='/admin/reservations/' element={<Reservations />} />
              <Route path='/admin/services/' element={<Services />} />
              <Route path='/admin/services/add/' element={<AddService />} />
              <Route path='/admin/services/edit/:uid' element={<EditService />} />
              <Route path='/admin/account-settings/' element={<AccountSettings />} />
            </Route>

            <Route element={<RequireAuth allowedRole={ROLES.employee} />}>
              <Route exact path='/employee/' element={<EmployeeDashboard />} />
              <Route path='/employee/customers/' element={<Customers />} />
              <Route path='/employee/customers/details/:uid' element={<CustomerDetails />} />
              <Route path='/employee/reservations/' element={<Reservations />} />
              <Route path='/employee/reservations/add/' element={<AddReservation />} />
              <Route path='/employee/account-settings/' element={<AccountSettings />} />
            </Route>

            <Route element={<RequireAuth allowedRole={ROLES.salon_owner} />}>
              <Route exact path='/salon_owner/' element={<SalonOwnerDashboard />} />
              <Route path='/salon_owner/employee/' element={<ManageEmployee />} />
              <Route path='/salon_owner/employee/add/' element={<AddEmployee />} />
              <Route path='/salon_owner/employee/edit/:uid' element={<EditEmployee />} />
              <Route path='/salon_owner/customers/' element={<Customers />} />
              <Route path='/salon_owner/customers/details/:uid' element={<CustomerDetails />} />
              <Route path='/salon_owner/salons/' element={<Salons />} />
              <Route path='/salon_owner/salons/edit/:uid' element={<EditSalon />} />
              <Route path='/salon_owner/reservations/' element={<Reservations />} />
              <Route path='/salon_owner/reservations/add/' element={<AddReservation />} />
              <Route path='/salon_owner/services/' element={<Services />} />
              <Route path='/salon_owner/services/add/' element={<AddService />} />
              <Route path='/salon_owner/services/edit/:uid' element={<EditService />} />
              <Route path='/salon_owner/account-settings/' element={<AccountSettings />} />
            </Route>

            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </Layout>
  )
};

export default App;