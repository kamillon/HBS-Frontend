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
    const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

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
        // localStorage.clear();
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
                    console.log(res.data)
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
        
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                setCurrentUser(res.data)
                console.log(res.data)
            } catch (err) {
                localStorage.removeItem('currentUser')
                setCurrentUser(null)
                // console.log(err)
            }
        } else {
            localStorage.removeItem('currentUser')
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
    }


    useEffect(() => {
        if(access){
            console.log("CHECK CHECK CHECK")
            checkAuthenticated();
            loadUser();
        }
    },[access]);

    // useEffect(() => {
    //     if(access){
    //         checkAuthenticated();
    //         loadUser();
    //     }
    // },[access]);

    useEffect(() => {
        if(loading && access){
            updateToken()
        }
        const fourMinutes = 1000 * 600 * 14
        const interval = setInterval(() => {
            if(access){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    },[access, loading])



    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}