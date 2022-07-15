// import React, {useState, createContext, useContext, useEffect} from 'react'
// import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';


export const addUser = async (credentials) => {
    if (credentials.password === credentials.re_password) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        // const body = JSON.stringify({ username, first_name, last_name, is_staff, is_superuser, is_employee, 
        //     email, password, re_password, phone, role });
        
        const body = JSON.stringify(credentials);

        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/users/`, body, config);

            console.log(res.data)
            // setAccountCreated(true);
            
        } 
        catch(error) {
            console.log(error)
        }
    }
};


// const UsersService = {
//     addUser,
// };

// export default UsersService