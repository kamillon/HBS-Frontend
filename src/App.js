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
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import { RequireAuth } from './components/RequireAuth';
import PrivateRoute from './utils/PrivateRoute'


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
              <Route exact path='/admin/dashboard' element={<RequireAuth><AdminDashboard/></RequireAuth>} />
              {/* <Route exact path='/admin/dashboard' element={<PrivateRoute><AdminDashboard/></PrivateRoute>} /> */}

              <Route path='*' element={<ErrorPage/>} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  </Layout>
  )
};

export default App;