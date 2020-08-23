import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import User from "./components/user/User";
import Role from "./components/role/Role";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import {ThemeProvider} from "@material-ui/core";
import theme from "./components/theme/theme";

const Index = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/dashboard/user">
                        <User/>
                    </Route>
                    <Route path="/dashboard/role">
                        <Role/>
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

if (document.getElementById("index")) {
    var csrf_token = document.getElementById("index").getAttribute("csrf_token");
    var message = document.getElementById("index").getAttribute("index");
    ReactDOM.render(<Index csrf_token={csrf_token} message={message}/>, document.getElementById("index"));
}
