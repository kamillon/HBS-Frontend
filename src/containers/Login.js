import React, {useState, useContext, useEffect } from 'react';
import { Link, Navigate , useNavigate, useLocation} from 'react-router-dom';
import { AuthContext, useAuth } from "../context/AuthContext"
import axios from 'axios';



// const loginUser = async (credentials) => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     const body = JSON.stringify(credentials);
//     try{
//         return await axios.post('http://127.0.0.1:8000/auth/jwt/create/', body, config)
        
//     } 
//     catch(error) {
//         console.log(error)
//    }

// };




const Login = () => {

    // const context = useContext(ThingsContext);
    // const { contextState, setContextState } = useContext(AuthContext);
    const {loginUser} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/'

    // const [list, setList] = useState(initialState);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        loginUser({email, password})
        // const res = await loginUser({email, password})
        // localStorage.setItem('access', res.data.access);
        // localStorage.setItem('refresh', res.data.refresh);
        // localStorage.setItem('isAuthenticated', true)
        // // setContextState({...contextState, isAuthenticated: true})
        // // setList({...list, 'isAuthenticated': true})
        // // auth.login2(res.data.access)
        // console.log(res.data)


        // checkAuthenticated();
        // load_user();
        // console.log("wyrenderowano")
        // navigate('redirectPath', {replace:true})


    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };
    
    //     const body = JSON.stringify({ email, password });


    //     try {
    //         const res = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', body, config)

            
    //         localStorage.setItem('access', res.data.access);
    //         localStorage.setItem('refresh', res.data.refresh);
    //         localStorage.setItem('isAuthenticated', true)
    //         // setContextState({...contextState, isAuthenticated: true})
    //         // setList({...list, 'isAuthenticated': true})
    //         console.log(res.data)
    //         auth.setUser({access: res.data.access})
    //         // navigate(redirectPath, {replace:true})
            
    //     } 
    //     catch(error) {
    //         console.log(error)
    //    }

    };

    // console.log(JSON.parse(localStorage.getItem('user')).is_employee)



    // if (localStorage.getItem('isAuthenticated')) {
    //     return <Navigate to='/' />
    // }

    // if (contextState.isAuthenticated) {
    //     return <Navigate to='/' />
    // }

    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            </p>
        </div>
    );
};


export default Login;