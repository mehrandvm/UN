import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {LoginContext} from "../../contexts/login-context/LoginContext";

export const withPermission = (Component) => (props) => {
    const {...restProps} = props;
    const {token} = useContext(LoginContext);
    return (
        token
            ? <Component {...restProps} />
            : <Redirect to="/login"/>
    );
};
