import React, {useState, createContext, useContext, useEffect} from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    // const [user, setUser] = useState(null)

    
    // const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [access, setAccess] = useState(() => localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : null)
    const [refresh, setRefresh] = useState(() => localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : null)
    // const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    // const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null)
    const [currentUser, setCurrentUser] = useState(null)
    const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') ? JSON.parse(localStorage.getItem('userRole')) : null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') ? JSON.parse(localStorage.getItem('isAuthenticated')) : false)

    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/'




    const loginUser = async (credentials) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(credentials);
        try{
            const res = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', body, config)
            if(res.status === 200){
                setAccess(res.data.access)
                setRefresh(res.data.refresh)
                localStorage.setItem('access', JSON.stringify(res.data.access))
                localStorage.setItem('refresh', JSON.stringify(res.data.refresh))
                navigate(redirectPath, {replace:true})
                
            }
        } 
        catch(error) {
            console.log(error)
            navigate('/login')
        }
    };


    const logoutUser = () => {
        setAccess(null)
        setRefresh(null)
        setCurrentUser(null)
        setLoading(true)
        setIsAuthenticated(false)
        setUserRole(null)
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        localStorage.clear();
        navigate('/', {replace:true})
        
    };

    const updateToken = async () => {
        console.log("Upadte token")
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({'refresh': refresh});
        try{
            const res = await axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', body, config)
            if(res.status === 200){
                setAccess(res.data.access)
                localStorage.setItem('access', JSON.stringify(res.data.access))
            }
            else{
                logoutUser()
            }
        } 
        catch(error) {
            console.log(error)
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    };

    
    const checkAuthenticated = async () => {
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }; 
    
            const body = JSON.stringify({ token: access });
    
            try {
                const res = await axios.post('http://127.0.0.1:8000/auth/jwt/verify/', body, config)
    
                if (res.data.code !== 'token_not_valid') {
                    setIsAuthenticated(true)
                    localStorage.setItem('isAuthenticated', true)
                } else {
                    console.log(res.data)
                    logoutUser()
                }
            } catch (err) {
                console.log(err)
                logoutUser()
            }
    
        } else {
            console.log("blad")
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
                const res = await axios.get('http://127.0.0.1:8000/auth/users/me/', config);
        
                // localStorage.setItem('currentUser', JSON.stringify(res.data));
                localStorage.setItem('userRole', JSON.stringify(res.data.role));
                setUserRole(res.data.role)
                setCurrentUser(res.data)
                // console.log(res.data)
            } catch (err) {
                // localStorage.removeItem('currentUser')
                localStorage.removeItem('userRole')
                setUserRole(null)
                setCurrentUser(null)
                // console.log(err)
            }
        } else {
            // localStorage.removeItem('currentUser')
            localStorage.removeItem('userRole')
            setUserRole(null)
            setCurrentUser(null)
            // console.log("Blad")
        }
    };
    






    const contextData = {
        access: access,
        refresh: refresh,
        loginUser: loginUser,
        logoutUser: logoutUser,
        currentUser: currentUser,
        isAuthenticated: isAuthenticated,
        userRole, userRole,
    }

    // ##############

    // useEffect(() => {
    //     if (access) {
    //         console.log("CHECK CHECK CHECK")
    //         checkAuthenticated()
    //         loadUser()
    //     }
    // },[access]);




    useEffect(() => {
        if(loading && access){
            updateToken()
        }
        const fourMinutes = 1000 * 60 * 14
        const interval = setInterval(() => {
            if(access){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    },[access, loading])



    useEffect(() => {
        checkAuthenticated()
        console.log("CHECK CHECK CHECK")
    },[access]);

    useEffect(() => {
        if(isAuthenticated) {
            console.log("LOAD USER LOAD USER")
            loadUser()
        }
    },[isAuthenticated]);

    // ###############
    
    return (
        <AuthContext.Provider value={contextData}>
            {/* {(loading && access) ? null : children} */}
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}