import React, {useEffect} from "react";
import { Container } from 'react-bootstrap';

export const Layout = (props) => {

return (
    <div id="layout" className="d-flex flex-column min-vh-100">
        {props.children}
    </div>
)};