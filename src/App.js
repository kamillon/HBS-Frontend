import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage';
import {AuthProvider} from './context/AuthContext';
import { Layout } from './components/Layout'
import AdminDashboard from './pages/Admin/AdminDashboard';
import { RequireAuth } from './components/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import UserDashboard from './pages/User/UserDashboard';
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import AddUser from './components/dashboard/AddUser';
import EditUser from './components/dashboard/EditUser';
import HairSalon from './pages/HairSalon';
import Barber from './pages/Barber';
import HairSalonDetail from './pages/HairSalonDetail';
import ManageEmployee from './pages/Manager/ManageEmployee';
import Salons from './components/dashboard/Salons';
import AddSalon from './components/dashboard/AddSalon';
import EditSalon from './components/dashboard/EditSalon';
import AccountSettings from './components/dashboard/AccountSettings';
import ChangeEmailConfirm from './components/dashboard/ChangeEmailConfirm';
import Booking from './pages/Booking';

const ROLES = {
  "user": "user",
  "admin": "admin",
  "employee": "employee",
  "manager": "manager"
}


function App() {
  return (
  <Layout>
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
          <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/login' element={<Login/>} />
              <Route exact path='/signup' element={<SignUp/>} />
              <Route exact path='/reset-password' element={<ResetPassword/>} />
              <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
              <Route exact path='/activate/:uid/:token' element={<Activate/>} />
              <Route exact path='/home' element={<HomePage/>} />
              <Route exact path='/hairsalon' element={<HairSalon/>} />
              <Route path='hairsalon/:salonId' element={<HairSalonDetail/>} />
              <Route path='hairsalon/:salonId/booking' element={<Booking/>} />
              <Route exact path='/barber' element={<Barber/>} />
              <Route exact path='/unauthorized' element={<Unauthorized/>} />
              <Route exact path='/email/reset/confirm/:uid/:token' element={<ChangeEmailConfirm/>} />
              {/* <Route exact path='/admin/dashboard' element={<RequireAuth><AdminDashboard/></RequireAuth>} /> */}

              <Route element={<RequireAuth allowedRole={ROLES.user}/>}>
                <Route exact path='/user/' element={<UserDashboard/>} />
                <Route path='/user/account-settings/' element={<AccountSettings/>} />
              </Route>

              <Route element={<RequireAuth allowedRole={ROLES.admin}/>}>
                <Route exact path='/admin/' element={<AdminDashboard/>} />
                <Route path='/admin/users/' element={<ManageUsers/>} />
                <Route path='/admin/users/add/' element={<AddUser/>} />
                <Route path='/admin/users/edit/:uid' element={<EditUser/>} />
                <Route path='/admin/salons/' element={<Salons/>} />
                <Route path='/admin/salons/add/' element={<AddSalon/>} />
                <Route path='/admin/salons/edit/:uid' element={<EditSalon/>} />
                <Route path='/admin/account-settings/' element={<AccountSettings/>} />

              </Route>

              <Route element={<RequireAuth allowedRole={ROLES.employee}/>}>
                <Route exact path='/employee/' element={<EmployeeDashboard/>} />
                <Route path='/employee/account-settings/' element={<AccountSettings/>} />
              </Route>

              <Route element={<RequireAuth allowedRole={ROLES.manager}/>}>
                <Route exact path='/manager/' element={<ManagerDashboard/>} />
                <Route path='/manager/users/' element={<ManageEmployee/>} />
                <Route path='/manager/users/add/' element={<AddUser/>} />
                <Route path='/manager/users/edit/:uid' element={<EditUser/>} />
                <Route path='/manager/salons/' element={<Salons/>} />
                {/* <Route path='/manager/salons/add/' element={<AddSalon/>} /> */}
                <Route path='/manager/salons/edit/:uid' element={<EditSalon/>} />
                <Route path='/manager/account-settings/' element={<AccountSettings/>} />
              </Route>

              {/* <Route element={<RequireAuth/>}>
                <Route exact path='/admin/dashboard' element={<AdminDashboard/>} />
              </Route> */}
              <Route path='*' element={<ErrorPage/>} />
          </Routes>
          <Footer/>
        </AuthProvider>
    </BrowserRouter>
  </Layout>
  )
};

export default App;