import React, { useState, createContext, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [access, setAccess] = useState(() => localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : null)
    const [refresh, setRefresh] = useState(() => localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : null)
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userRole, setUserRole] = useState(null)
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/'
    const props = location.state

    const loginUser = async (credentials) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(credentials);
        try {
            const res = await axios.post(`${API}/auth/jwt/create/`, body, config)
            if (res.status === 200) {
                setAccess(res.data.access)
                setRefresh(res.data.refresh)
                localStorage.setItem('access', JSON.stringify(res.data.access))
                localStorage.setItem('refresh', JSON.stringify(res.data.refresh))
                navigate(redirectPath, { state: { ...props } }, { replace: true })
            }
        }
        catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                setError('Nieprawidłowy login lub hasło');
            }
            navigate('/login')
        }
    };

    const logoutUser = () => {
        setAccess(null)
        setRefresh(null)
        setCurrentUser(null)
        setLoading(true)
        setIsAuthenticated(false)
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('currentUser')
        localStorage.clear();
        navigate('/', { replace: true })

    };

    const updateToken = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ 'refresh': refresh });
        try {
            const res = await axios.post(`${API}/auth/jwt/refresh/`, body, config)
            if (res.status === 200) {
                setAccess(res.data.access)
                localStorage.setItem('access', JSON.stringify(res.data.access))
            }
            else {
                logoutUser()
            }
        }
        catch (error) {
            console.log(error)
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }
    };

    const checkAuthenticated = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: access });

        try {
            const res = await axios.post(`${API}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                setIsAuthenticated(true)
            } else {
                logoutUser()
            }
        } catch (err) {
            console.log(err)
            logoutUser()
        }
    };

    const loadUser = async () => {
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`${API}/auth/users/me/`, config);
                setCurrentUser(res.data)
                setUserRole(res.data.role)
            } catch (err) {
                setCurrentUser(null)
                setUserRole(null)
            }
        } else {
            setCurrentUser(null)
            setUserRole(null)
        }
    };

    const contextData = {
        access: access,
        refresh: refresh,
        loginUser: loginUser,
        logoutUser: logoutUser,
        currentUser: currentUser,
        isAuthenticated: isAuthenticated,
        userRole: userRole,
        error: error,
    }

    useEffect(() => {
        if (loading && access) {
            updateToken()
        }
        const fourMinutes = 1000 * 60 * 14
        const interval = setInterval(() => {
            if (access) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [access, loading])

    useEffect(() => {
        if (access) {
            checkAuthenticated()
        }
    }, [access]);

    useEffect(() => {
        if (isAuthenticated) {
            loadUser()
        }
    }, [isAuthenticated]);

    if (access && currentUser) {
        return (
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
        )
    }
    else if (!access) {
        return (
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export const useAuth = () => {
    return useContext(AuthContext)
}