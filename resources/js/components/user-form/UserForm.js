import React, {useEffect, useState} from 'react';
import {
    Button, Grid, Typography,
} from '@material-ui/core';
import {Link, useParams, useHistory} from 'react-router-dom';
import {createStyles, makeStyles} from '@material-ui/core';
import FormTextField from "../form-textfield/FormTextField";
import Header from "../header/Header";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {withPermission} from "../../utils/with-premission/withPermission";
import axiosInstance from "../../apis/AxiosConfig";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useSnackbar} from "notistack";
import {
    validateConfirmPassword,
    validateEmail,
    validateFirstName,
    validateLastName, validatePassword, validatePhoneNumber,
    validateRole,
    validateUserName
} from "../../utils/validations/Validation";
import FormHelperText from "@material-ui/core/FormHelperText";

export const useStyles = makeStyles((theme) => createStyles({
    container: {
        width: '80%',
        margin: 'auto',
        marginTop: 64,
        maxWidth: 500,
    },
    paper: {
        // textAlign: 'center',
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        width: '100%',
        minHeight: 48,
        [theme.breakpoints.down('xs')]: {
            minWidth: 200,
            paddingLeft: 30,
            paddingRight: 30,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
        marginLeft: "-2px",
    },
    tableTitle: {
        marginTop: 8,
    },
    link: {
        textDecoration: 'none',
    },
}));

const UserForm = (props) => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    const [formMode, setFormMode] = useState("")
    const [user, setUser] = useState({
        f_name: "",
        l_name: "",
        username: "",
        password: "",
        c_password: "",
        roles: "",
        email: "",
        phone_number: "",
    })
    const [userError, setUserError] = useState({
        f_name: "",
        l_name: "",
        username: "",
        password: "",
        c_password: "",
        roles: "",
        email: "",
        phone_number: "",
    })
    const params = useParams()
    const history = useHistory()
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        if (params.id) {
            setFormMode("edit")
            axiosInstance.get(`/management/users/${params.id}`).then((res) => {
                console.log(res)
                setUser({...res.data.data, password: "", c_password: ""})
            })
        } else {
            setFormMode("create")
        }
    }, [])

    const handleChange = (e) => {
        const target = e.target;
        setUser({...user, [target.name]: target.value});
        setUserError({...userError, [target.name]: ""})
    };

    const validateInputs = () => {
        setUserError(
            {
                f_name: validateFirstName(user.f_name),
                l_name: validateLastName(user.l_name),
                username: validateUserName(user.username),
                email: validateEmail(user.email),
                phone_number: validatePhoneNumber(user.phone_number),
                roles: validateRole(user.roles),
                password: validatePassword(user.password),
                c_password: validateConfirmPassword(user.password, user.c_password),
            },
        )
        return !(validateFirstName(user.f_name) || validateLastName(user.l_name) || validateUserName(user.username) || validateEmail(user.email) ||
            validateRole(user.roles) || validatePhoneNumber(user.phone_number) || validatePassword(user.password) || validateConfirmPassword(user.password, user.c_password));

    }

    const handleSubmit = () => {
        console.log(user)
        if (!validateInputs()) {
            return
        }
        if (formMode === 'create') {
            user['role-slug'] = user.roles
            // delete user.roles
            axiosInstance.post(`/management/users`, user).then((res) => {
                console.log(res)
                if (res.data.status_code === 200) {
                    history.push('/user')
                } else {
                    enqueueSnackbar(res.data.status_message, {variant: "error"})
                }
            }).catch((e) => {
                console.error(e)
                enqueueSnackbar('An error occurred', {variant: "error"})
            })
        } else if (formMode === "edit") {
            user['role-slug'] = user.roles
            // delete user.roles
            axiosInstance.post(`/management/users/${params.id}`, user).then((res) => {
                console.log(res)
                if (res.data.status_code === 200) {
                    history.push('/user')
                } else {
                    enqueueSnackbar(res.data.status_message, {variant: "error"})
                }
            }).catch((e) => {
                console.error(e)
            })
        }
    }

    const returnRoleValue = () => {
        if (user.roles.length === 0) {
            return ""
        } else if (user.roles.length === 1) {
            return user.roles[0].name
        } else {
            return user.roles
        }
    }

    return (
        <div>
            <Header setLanguage={setLanguage}/>
            <form>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={1}
                    className={classes.container}
                >
                    <Grid item className={classes.tableTitle}>
                        <Link to={'/user'}><IconButton><ArrowBackIcon/></IconButton></Link>
                    </Grid>
                    <Grid item className={classes.tableTitle}>
                        <Typography variant={'h5'}>Users Form</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChange}
                            name={'f_name'}
                            label={'First Name'}
                            placeholder={'Enter your first name...'}
                            value={user.f_name}
                            errorMessage={userError.f_name}
                            error={!!userError.f_name}
                            type=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            fullWidth
                            onChange={handleChange}
                            name={'l_name'}
                            label={'Last Name'}
                            placeholder={'Enter your last name...'}
                            value={user.l_name}
                            errorMessage={userError.l_name}
                            error={!!userError.l_name}
                            type=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChange}
                            name={'username'}
                            label={'User Name'}
                            placeholder={'Enter your user name'}
                            value={user.username}
                            errorMessage={userError.username}
                            error={!!userError.username}
                            type=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChange}
                            name={'email'}
                            label={'Email'}
                            placeholder={'Enter your email'}
                            value={user.email}
                            errorMessage={userError.email}
                            error={!!userError.email}
                            type=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChange}
                            name={'phone_number'}
                            label={'Phone Number'}
                            placeholder={'Enter your phone number'}
                            value={user.phone_number}
                            errorMessage={userError.phone_number}
                            error={!!userError.phone_number}
                            type=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChange}
                            name={'password'}
                            label={'Password'}
                            placeholder={'Enter Your Password'}
                            value={user.password}
                            errorMessage={userError.password}
                            error={!!userError.password}
                            type="password"
                            required={false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChange}
                            name={'c_password'}
                            label={'Confirm Password'}
                            placeholder={'Confirm your password'}
                            value={user.c_password}
                            errorMessage={userError.c_password}
                            error={!!userError.c_password}
                            type="password"
                            required={false}
                        />
                    </Grid>
                    <Grid item xs={9} sm={9} className={classes.paper}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>User Role</InputLabel>
                            <Select
                                value={returnRoleValue()}
                                onChange={handleChange}
                                name={'roles'}
                                label="User Role"
                                error={!!userError.roles}
                            >
                                <MenuItem value={""}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Admin'}>Admin</MenuItem>
                                <MenuItem value={'Agent'}>Agent</MenuItem>
                                {/*<MenuItem value={1}>State Reconstruction Headquarter</MenuItem>*/}
                                {/*<MenuItem value={2}>County</MenuItem>*/}
                                {/*<MenuItem value={3}>Experienced Damage Assessor</MenuItem>*/}
                                {/*<MenuItem value={4}>Damage Assessor</MenuItem>*/}
                            </Select>
                            <FormHelperText>{userError.roles}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} className={classes.paper}>
                        <Link to={'/'} className={classes.link}><Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                            }}
                            className={classes.button}
                            disabled
                        >
                            {'Add Role'}
                        </Button></Link>
                    </Grid>
                    <Grid item xs={6} sm={6} className={classes.paper}>
                        <Link to={'/user'} className={classes.link}>
                            <Button
                                variant="outlined"
                                // onClick={handleSubmit}
                                className={classes.button}
                            >
                                {'Cancel'}
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={6} className={classes.paper}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            className={classes.button}
                        >
                            {'Save'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default withPermission(UserForm);
