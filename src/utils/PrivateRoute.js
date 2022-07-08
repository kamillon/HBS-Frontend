import { Route, Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../context/AuthContext"

// const PrivateRoute = ({children, ...rest}) => {
//     // console.log('Private route works!')
//     const authenticated = false
//     return(
//         <Route {...rest}>{!authenticated ? <Navigate replace to='/login' /> : children}</Route>
//     )
// }

// export default PrivateRoute;



const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute