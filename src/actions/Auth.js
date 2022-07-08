import React from "react";
import axios from 'axios';



export const checkAuthenticated = async () => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/jwt/verify/', body, config)

            if (res.data.code !== 'token_not_valid') {
                console.log(res.data)
            } else {
                console.log(res.data)
            }
        } catch (err) {
            console.log(err)
        }

    } else {
        console.log("blad")
    }
};

export const loadUser = async () => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get('http://127.0.0.1:8000/auth/users/me/', config);
    
            localStorage.setItem('user', JSON.stringify(res.data));
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    } else {
        console.log("Blad")
    }
};
