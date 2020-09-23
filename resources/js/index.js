import React, {useCallback} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import User from "./components/user/User";
import Role from "./components/role/Role";
import Panel from "./components/panel/Panel";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import {ThemeProvider} from "@material-ui/core";
import theme, {themeRTL} from "./components/theme/theme";
import UserForm from "./components/user-form/UserForm";
import Dashboard from "./components/dashboard/Dashboard";
import {removeAxiosHeader, setAxiosHeader, tokenTitle} from "./apis/AxiosConfig";
import {checkAuth, loginAPI} from "./apis/auth/authCheck";
import {LoginContext} from "./contexts/login-context/LoginContext";
import {LanguageContext} from "./contexts/language-context/LanguageContext";
import {SnackbarProvider} from 'notistack';
import Task from "./components/task/Task";
import TaskForm from "./components/task-form/TaskForm";
import MyTasks from "./components/my-tasks/MyTasks";
import {create} from 'jss';
import rtl from 'jss-rtl';
import {StylesProvider, jssPreset} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {getTranslator} from "./vocabs";
import MyDashboard from "./components/my-dashboard/MyDashboard";
import Objections from "./components/objections/Objections";
import Preliminary from "./components/preliminary/Preliminary";

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const Index = () => {
    const [token, setToken] = React.useState(localStorage.getItem(tokenTitle) || null);
    const [language, setLanguage] = React.useState(localStorage.getItem('language') ||'en');

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
        <ThemeProvider theme={language === "en" ? theme : themeRTL}>
            <StylesProvider jss={jss}>
                <CssBaseline/>
                <LanguageContext.Provider value={{
                    language,
                    changeLanguage: setLanguage,
                    translator: getTranslator(language),
                }}
                >
                    <LoginContext.Provider value={{token, setToken: setLoginToken, login}}>
                        <SnackbarProvider maxSnack={3}>
                            <div dir={language==='en'? 'ltr' : 'rtl'}>
                                <Router>
                                    <Switch>
                                        <Route exact path="/preliminary">
                                            <Preliminary/>
                                        </Route>
                                        <Route exact path="/user/edit/:id">
                                            <UserForm/>
                                        </Route>
                                        <Route exact path="/user/new">
                                            <UserForm/>
                                        </Route>
                                        <Route exact path="/user">
                                            <User/>
                                        </Route>
                                        <Route exact path="/mydashboard">
                                            <MyDashboard/>
                                        </Route>
                                        <Route exact path="/objections/:id">
                                            <Objections/>
                                        </Route>
                                        <Route exact path="/mytasks/:filter">
                                            <MyTasks/>
                                        </Route>
                                        <Route exact path="/mytasks">
                                            <MyTasks/>
                                        </Route>
                                        <Route exact path="/task/new">
                                            <TaskForm/>
                                        </Route>
                                        <Route exact path="/task">
                                            <Task/>
                                        </Route>
                                        {/*<Route exact path="/role">*/}
                                        {/*    <Role/>*/}
                                        {/*</Route>*/}
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
                            </div>
                        </SnackbarProvider>
                    </LoginContext.Provider>
                </LanguageContext.Provider>
            </StylesProvider>
        </ThemeProvider>
    );
}

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}
