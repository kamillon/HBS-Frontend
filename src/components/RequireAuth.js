import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth = ({allowedRole}) => {
    const location = useLocation()
    const auth = useAuth()

    if (auth.userRole == allowedRole) {
        return <Outlet/>
    }
    else if (auth.isAuthenticated) {
        return <Navigate to='/unauthorized' state={{path: location.pathname}} replace />
    }
    return <Navigate to='/login' state={{path: location.pathname}} replace />
    
}