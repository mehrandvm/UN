import React, {useContext, useEffect, useState} from 'react';
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
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";

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
    const [formMode, setFormMode] = useState("")
    const [roles, setRoles] = useState(null)
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

    const checkPermission = () => {
        axiosInstance.get('/management/permission/manage-users').then((res) => {
            if (res.data.status_code !== 200) history.push('/')
        }).catch((e)=>{
            console.error(e)
        })
    }

    const fetchRoles = () => {
        axiosInstance.get('/management/roles').then((res) => {
            setRoles(res.data.data)
        }).catch((e)=>{
            console.error(e)
        })
    }

    useEffect(() => {
        checkPermission()
        fetchRoles()
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
                password: formMode==="create" ? validatePassword(user.password) : "",
                c_password: formMode==="create" ? validateConfirmPassword(user.password, user.c_password) : "",
            },
        )
        if (formMode==="create") {
            return !(validateFirstName(user.f_name) || validateLastName(user.l_name) || validateUserName(user.username) || validateEmail(user.email) ||
                validateRole(user.roles) || validatePhoneNumber(user.phone_number) || validatePassword(user.password) || validateConfirmPassword(user.password, user.c_password));
        } else {
            return !(validateFirstName(user.f_name) || validateLastName(user.l_name) || validateUserName(user.username) || validateEmail(user.email) ||
                validateRole(user.roles) || validatePhoneNumber(user.phone_number));
        }
    }

    const handleSubmit = () => {
        console.log(user)
        if (!validateInputs()) {
            return
        }
        if (formMode === 'create') {
            user.role_slug = user.roles
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
            user.role_slug = user.roles
            delete user.password
            delete user.c_password
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
    const vocabs = getTranslator(useContext(LanguageContext).language);
    return (
        <div>
            <Header role={'admin'}/>
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
                        <Typography variant={'h5'}>{vocabs('users-form')}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChange}
                            name={'f_name'}
                            label={vocabs('first-name')}
                            // placeholder={'Enter your first name...'}
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
                            label={vocabs('last-name')}
                            // placeholder={'Enter your last name...'}
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
                            label={vocabs('user-name')}
                            // placeholder={'Enter your user name'}
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
                            label={vocabs('email')}
                            // placeholder={'Enter your email'}
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
                            label={vocabs('phone-number')}
                            // placeholder={'Enter your phone number'}
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
                            label={vocabs('password')}
                            // placeholder={'Enter Your Password'}
                            value={user.password}
                            errorMessage={userError.password}
                            error={!!userError.password}
                            type="password"
                            required={formMode!=="edit"}
                            disabled={formMode==="edit"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChange}
                            name={'c_password'}
                            label={vocabs('confirm-password')}
                            // placeholder={'Confirm your password'}
                            value={user.c_password}
                            errorMessage={userError.c_password}
                            error={!!userError.c_password}
                            type="password"
                            required={formMode!=="edit"}
                            disabled={formMode==="edit"}
                        />
                    </Grid>
                    <Grid item xs={9} sm={9} className={classes.paper}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>{vocabs('user-role')}</InputLabel>
                            <Select
                                value={returnRoleValue()}
                                onChange={handleChange}
                                name={'roles'}
                                label={vocabs('user-role')}
                                error={!!userError.roles}
                            >
                                <MenuItem value={""}><em>None</em></MenuItem>
                                {roles ? roles.map((role)=>{
                                    return <MenuItem key={role.slug} value={role.slug}>{vocabs(role.name)}</MenuItem>
                                }): null}
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
                                {vocabs('cancel')}
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
                            {vocabs('save')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default withPermission(UserForm);
