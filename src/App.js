import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Navbar from './components/Navbar';
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
              <Route exact index path='/' element={<Home/>} />
              <Route exact path='/login' element={<Login/>} />
              <Route exact path='/signup' element={<SignUp/>} />
              <Route exact path='/reset-password' element={<ResetPassword/>} />
              <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
              <Route exact path='/activate/:uid/:token' element={<Activate/>} />
              <Route exact path='/home' element={<HomePage/>} />
              <Route exact path='/unauthorized' element={<Unauthorized/>} />
              {/* <Route exact path='/admin/dashboard' element={<RequireAuth><AdminDashboard/></RequireAuth>} /> */}

              <Route element={<RequireAuth allowedRole={ROLES.user}/>}>
                <Route exact path='/user/' element={<UserDashboard/>} />
              </Route>

              <Route element={<RequireAuth allowedRole={ROLES.admin}/>}>
                <Route exact path='/admin/' element={<AdminDashboard/>} />
                <Route path='/admin/users/' element={<ManageUsers/>} />

              </Route>

              <Route element={<RequireAuth allowedRole={ROLES.employee}/>}>
                <Route exact path='/employee/' element={<EmployeeDashboard/>} />
              </Route>

              <Route element={<RequireAuth allowedRole={ROLES.manager}/>}>
                <Route exact path='/manager/' element={<ManagerDashboard/>} />
              </Route>

              {/* <Route element={<RequireAuth/>}>
                <Route exact path='/admin/dashboard' element={<AdminDashboard/>} />
              </Route> */}
              <Route path='*' element={<ErrorPage/>} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  </Layout>
  )
};

export default App;