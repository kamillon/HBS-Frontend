import React, {useEffect} from "react";
import { Container } from 'react-bootstrap';
import { checkAuthenticated, loadUser } from '../actions/Auth';

export const Layout = (props) => {
    // useEffect(() => {
    //     checkAuthenticated();
    //     loadUser();
    //     console.log("wyrenderowano")
    // });

return (
    <div>
        {props.children}
    </div>
)};