import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Navbar from './components/Navbar';



function App() {
  const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    // isAuthenticated: null,
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    user: null
  };

  return (
  <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login initialState={initialState}/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/reset-password' element={<ResetPassword/>} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
          <Route exact path='/activate/:uid/:token' element={<Activate/>} />
      </Routes>
  </BrowserRouter>
  )
};

export default App;