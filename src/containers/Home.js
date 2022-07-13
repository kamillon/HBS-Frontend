import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from "../context/AuthContext"


const Home = () => {
    // const { contextState, setContextState } = React.useContext(ThingsContext);
    // const isAuthenticated = contextState.isAuthenticated


    // useEffect(()=> {
    //     checkAuthenticated();
    //     loadUser();
    //     console.log("wyrenderowano")
    // })


    const {currentUser, isAuthenticated} = useAuth()
    console.log(currentUser)
    console.log(isAuthenticated)
 
    return(
        <div className='container'>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>Welcome to Auth System!</h1>
                <p className='lead'>This is an incredible authentication system with production level features!</p>
                <hr className='my-4' />
                <p>Click the Log In button</p>
                <Link className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
            </div>
        </div>
)};

export default Home;