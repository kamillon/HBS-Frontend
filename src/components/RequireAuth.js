import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth = ({ children }) => {
    const location = useLocation()
    const {access} = useAuth()

    // if (!auth.user) {
    //     return <Navigate to='/login' state={{path: location.pathname}}/>
    // }

    if (!access) {
        return <Navigate to='/login' state={{path: location.pathname}}/>
    }
    
    return children
}