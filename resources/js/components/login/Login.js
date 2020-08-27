import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import construction from '../../../images/construction.jpg'
import Header from '../header/Header';
import theme from '../theme/theme';
import axiosInstance from "../../API/AxiosConfig";
import {validateEmail, validatePassword} from "../../utils/validations/Validation";
import FormTextField from "../form-textfield/FormTextField";

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
        height: '100%',
        overflowX: 'hidden',
    },
    imageBox: {
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    paper: {
        margin: theme.spacing(12, 4),
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
    const [language, setLanguage] = useState("en")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleChangeEmail = (e) => {
        const target = e.target;
        setEmail(target.value);
    };

    const handleChangePassword = (e) => {
        const target = e.target;
        setPassword(target.value);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        const signInData = {
            email: email,
            password: password,
        }
        setEmailError(validateEmail(email))
        setPasswordError(validatePassword(password))
        if(!validateEmail(email) && !validatePassword(password)) {
            axiosInstance.post('/user/login', signInData).then((res) => console.log(res));
            axiosInstance.post('/user/profile').then((res) => {
                console.log(res)
            });
        }
    }

    return (
        <React.Fragment>
            <Header setLanguage={setLanguage}/>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.imageBox}>
                    <img src={construction} className={classes.image}/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSignIn}
                            >
                                Sign In
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
            </Grid>
        </React.Fragment>
    );
}

export default Login
