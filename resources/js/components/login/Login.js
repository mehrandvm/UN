import React, {useContext, useState} from 'react';
import {Avatar, Box, Button, CssBaseline, Grid, Link, Paper, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import construction from '../../../images/construction.jpg'
import Header from '../header/Header';
import theme from '../theme/theme';
import {validateEmail, validatePassword} from "../../utils/validations/Validation";
import FormTextField from "../form-textfield/FormTextField";
import {LoginContext} from "../../contexts/login-context/LoginContext";
import {useHistory} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Lorem Ipsum
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
        overflowX: 'hidden',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${construction})`,
    },
    login: {
        backgroundColor: 'rgb(255,255,255,0.85)',
        height: '500px',
        marginTop: theme.spacing(12),
        borderRadius: '48px',
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            top: 0,
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        }
    },
    paper: {
        margin: theme.spacing(6, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const loginContext = useContext(LoginContext);
    const history = useHistory()
    const [language, setLanguage] = useState("en")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const handleChangeEmail = (e) => {
        const target = e.target;
        setEmail(target.value);
    };

    const handleChangePassword = (e) => {
        const target = e.target;
        setPassword(target.value);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setEmailError(validateEmail(email))
        setPasswordError(validatePassword(password))
        if (!validateEmail(email) && !validatePassword(password)) {
            setIsAuthenticating(true);
            try {
                await loginContext.login(email, password);
                setIsAuthenticating(false);
                history.push('/panel')
            } catch (e) {
                console.error(e);
                setIsAuthenticating(false);
            }
        }
    }

    return (
        <React.Fragment>
            <Header setLanguage={setLanguage} isDark={true}/>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12} sm={4} md={6}/>
                <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square className={classes.login}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <FormTextField
                                value={email}
                                onChange={handleChangeEmail}
                                error={!!emailError}
                                errorMessage={emailError}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <FormTextField
                                value={password}
                                onChange={handleChangePassword}
                                error={!!passwordError}
                                errorMessage={passwordError}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/*<FormControlLabel*/}
                            {/*  control={<Checkbox value="remember" color="primary" />}*/}
                            {/*  label="Remember me"*/}
                            {/*/>*/}
                            <Button
                                disabled={isAuthenticating}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSignIn}
                            >
                                {isAuthenticating ? <CircularProgress/> : 'Sign In'}
                            </Button>
                            {/*<Grid container>*/}
                            {/*  <Grid item xs>*/}
                            {/*    <Link href="#" variant="body2">*/}
                            {/*      Forgot password?*/}
                            {/*</Link>*/}
                            {/*  </Grid>*/}
                            {/*  <Grid item>*/}
                            {/*    <Link href="#" variant="body2">*/}
                            {/*      {"Don't have an account? Sign Up"}*/}
                            {/*    </Link>*/}
                            {/*  </Grid>*/}
                            {/*</Grid>*/}
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={false} sm={1} md={1}/>
            </Grid>
        </React.Fragment>
    );
}

export default Login
