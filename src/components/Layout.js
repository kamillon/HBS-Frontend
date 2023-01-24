import React from "react";

export const Layout = (props) => {

    return (
        <div id="layout" className="d-flex flex-column min-vh-100">
            {props.children}
        </div>
    )
};