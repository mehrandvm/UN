import React, {useCallback} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import User from "./components/user/User";
import Role from "./components/role/Role";
import Panel from "./components/panel/Panel";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import {ThemeProvider} from "@material-ui/core";
import theme from "./components/theme/theme";
import UserForm from "./components/user-form/UserForm";
import Dashboard from "./components/dashboard/Dashboard";
import {removeAxiosHeader, setAxiosHeader, tokenTitle} from "./apis/AxiosConfig";
import {checkAuth, loginAPI} from "./apis/auth/authCheck";
import {LoginContext} from "./contexts/login-context/LoginContext";
import {SnackbarProvider} from 'notistack';

const Index = () => {
    const [token, setToken] = React.useState(localStorage.getItem(tokenTitle) || null);

    setAxiosHeader('Content-Type', `application/json`);

    const setLoginToken = useCallback((newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem(tokenTitle, newToken);
            setAxiosHeader('Authorization', `Bearer ${newToken}`);
        } else {
            localStorage.removeItem(tokenTitle);
            removeAxiosHeader('Authorization');
        }
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            const res = await loginAPI(email, password);
            setLoginToken(res.data.data.token);
        } catch (e) {
            if (e.response) {
                throw new Error(e.response.data.message);
            } else {
                throw new Error('network-error');
                // TODO: add snackbar
            }
        }
    }, [setLoginToken]);

    React.useEffect(() => {
        (async () => {
            if (!(await checkAuth())) {
                setLoginToken(null);
            }
        })();
    }, [setLoginToken]);

    return (
        <ThemeProvider theme={theme}>
            <LoginContext.Provider value={{token, setToken: setLoginToken, login}}>
                <SnackbarProvider maxSnack={3}>
                    <Router>
                        <Switch>
                            <Route exact path="/user/details/:id">
                                <UserForm mode={"details"}/>
                            </Route>
                            <Route exact path="/user/edit/:id">
                                <UserForm mode={"edit"}/>
                            </Route>
                            <Route exact path="/user/new">
                                <UserForm mode={"create"}/>
                            </Route>
                            <Route exact path="/user">
                                <User/>
                            </Route>
                            <Route exact path="/role">
                                <Role/>
                            </Route>
                            <Route exact path="/dashboard">
                                <Dashboard/>
                            </Route>
                            {/*<Route exact path="/panel">*/}
                            {/*    <Panel/>*/}
                            {/*</Route>*/}
                            <Route exact path="/login">
                                <Login/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </Router>
                </SnackbarProvider>
            </LoginContext.Provider>
        </ThemeProvider>
    );
}

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}
