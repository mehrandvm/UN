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
import DivisionSelectors from "../map/DivisionSelectors";
import ProvinceSelector from "./ProvinceSelector";
import CountySelector from "./CountySelector";
import VillageSelector from "./VillageSelector";
import UserSelector from "./UserSelector";
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

const TaskForm = (props) => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    const [formMode, setFormMode] = useState("")
    const [divisionLevel, setDivisionLevel] = useState("national") // national, province, county, village
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [selectedVillage, setSelectedVillage] = useState(null);
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
        axiosInstance.get('/management/permission/manage-tasks').then((res) => {
            if (res.data.status_code !== 200) history.push('/')
        }).catch((e)=>{
            console.error(e)
        })
    }

    useEffect(() => {
        checkPermission()
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
        const task = {
            agent_id: selectedUser.id,
            country_subdivision_id: selectedVillage.id
        }
        console.log(task)
        axiosInstance.post(`/management/tasks/subdivision`, task).then((res) => {
            console.log(res)
            if (res.data.status_code === 200) {
                history.push('/task')
            } else {
                enqueueSnackbar(res.data.status_message, {variant: "error"})
            }
        }).catch((e) => {
            console.error(e)
            enqueueSnackbar('An error occurred', {variant: "error"})
        })
    }

    const clearProvince = () => {
        setDivisionLevel("national")
        setSelectedCounty(null)
        setSelectedVillage(null)
    }

    const clearCounty = () => {
        setDivisionLevel("province")
        setSelectedVillage(null)
    }

    const clearVillage = () => {
        setDivisionLevel("county")
    }

    const vocabs = getTranslator(useContext(LanguageContext).language);

    return (
        <div>
            <Header setLanguage={setLanguage} role={'admin'}/>
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
                        <Link to={'/task'}><IconButton><ArrowBackIcon/></IconButton></Link>
                    </Grid>
                    <Grid item className={classes.tableTitle}>
                        <Typography variant={'h5'}>{vocabs('tasks-form')}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>

                    </Grid>
                    <Grid item xs={12}>
                        <UserSelector
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ProvinceSelector
                            selectedProvince={selectedProvince}
                            setSelectedProvince={setSelectedProvince}
                            divisionLevel={divisionLevel}
                            setDivisionLevel={setDivisionLevel}
                            clearProvince={clearProvince}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CountySelector
                            selectedProvince={selectedProvince}
                            selectedCounty={selectedCounty}
                            setSelectedCounty={setSelectedCounty}
                            divisionLevel={divisionLevel}
                            setDivisionLevel={setDivisionLevel}
                            clearCounty={clearCounty}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <VillageSelector
                            selectedVillage={selectedVillage}
                            setSelectedVillage={setSelectedVillage}
                            divisionLevel={divisionLevel}
                            setDivisionLevel={setDivisionLevel}
                            clearVillage={clearVillage}
                            selectedCounty={selectedCounty}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} className={classes.paper}>
                        <Link to={'/task'} className={classes.link}>
                            <Button
                                variant="outlined"
                                // onClick={handleSubmit}
                                color={"inherit"}
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

export default withPermission(TaskForm);
