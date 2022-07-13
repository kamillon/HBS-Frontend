import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth = ({allowedRole}) => {
    const location = useLocation()
    const auth = useAuth()

    console.log("TTTTTTTTTTTTTTTTTTTT")
    console.log(auth.isAuthenticated)
    console.log(auth.userRole)
    console.log("TTTTTTTTTTTTTTTTTTTT")

    if (auth.userRole == allowedRole) {
        return <Outlet/>
    }
    else if (auth.isAuthenticated) {
        console.log("aaaaaa")
        console.log(auth.isAuthenticated)
        return <Navigate to='/unauthorized' state={{path: location.pathname}} replace />
    }
    return <Navigate to='/login' state={{path: location.pathname}} replace />
    
}

    // return (
    //     currentUser.is_staff
    //         ? <Outlet/>
    //         : access
    //             ? <Navigate to='/unauthorized' state={{path: location.pathname}} replace />
    //             : <Navigate to='/login' state={{path: location.pathname}} replace />
    // );



    // export const RequireAuth = ({ children }) => {
//     const location = useLocation()
//     const {access} = useAuth()

//     // if (!auth.user) {
//     //     return <Navigate to='/login' state={{path: location.pathname}}/>
//     // }

//     if (!access) {
//         return <Navigate to='/login' state={{path: location.pathname}}/>
//     }
    
//     return children
// }

