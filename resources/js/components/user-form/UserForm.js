import React, {useContext, useState} from 'react';
import {
    Button, Grid, Switch, Typography,
} from '@material-ui/core';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import {createStyles, makeStyles} from '@material-ui/core';
import {grey, red, blueGrey} from '@material-ui/core/colors';
import FormTextField from "../form-textfield/FormTextField";
import Header from "../header/Header";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {withPermission} from "../../utils/with-premission/withPermission";

const colors = {
    mainGrey: blueGrey[900],
    error: red[300],
};

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
}));

const UserForm = (props) => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        passwordConfirm: "",
        userRole: "",
    })

    const handleChangeFirstName = (e) => {
        const target = e.target;
        setUser({ ...user, firstName: target.value });
    };

    const handleChangeLastName = (e) => {
        const target = e.target;
        setUser({ ...user, lastName: target.value });
    };

    const handleChangeUserName = (e) => {
        const target = e.target;
        setUser({ ...user, userName: target.value });
    };

    const handleChangePassword = (e) => {
        const target = e.target;
        setUser({ ...user, password: target.value });
    };

    const handleChangeConfirmPassword = (e) => {
        const target = e.target;
        setUser({ ...user, passwordConfirm: target.value });
    };

    const handleChangeUserRole = (e) => {
        const target = e.target;
        setUser({ ...user, userRole: target.value });
    };

    return (
        <div>
            <Header setLanguage={setLanguage}/>
            <form>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                    className={classes.container}
                >
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChangeFirstName}
                            label={'First Name'}
                            placeholder={'Enter your first name...'}
                            value={user.firstName}
                            errorMessage={""}
                            error={false}
                            type=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            fullWidth
                            onChange={handleChangeLastName}
                            label={'Last Name'}
                            placeholder={'Enter your last name...'}
                            value={user.lastName}
                            errorMessage={""}
                            error={false}
                            type=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChangeUserName}
                            label={'User Name'}
                            placeholder={'Enter your user name'}
                            value={user.userName}
                            errorMessage={""}
                            error={false}
                            type=""
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChangePassword}
                            label={'Password'}
                            placeholder={'Enter Your Password'}
                            value={user.password}
                            errorMessage={""}
                            error={false}
                            type="password"
                            required={false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <FormTextField
                            onChange={handleChangeConfirmPassword}
                            label={'Confirm Password'}
                            placeholder={'Confirm your password'}
                            value={user.passwordConfirm}
                            errorMessage={""}
                            error={false}
                            type="password"
                            required={false}
                        />
                    </Grid>
                    <Grid item xs={9} sm={9} className={classes.paper}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>User Role</InputLabel>
                            <Select
                                value={user.userRole}
                                onChange={handleChangeUserRole}
                                label="User Role"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>National Admin</MenuItem>
                                <MenuItem value={1}>State Reconstruction Headquarter</MenuItem>
                                <MenuItem value={2}>County</MenuItem>
                                <MenuItem value={3}>Experienced Damage Assessor</MenuItem>
                                <MenuItem value={4}>Damage Assessor</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sm={3} className={classes.paper}>
                        <Link to={'/'}><Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                            }}
                            className={classes.button}
                        >
                            {'Add Role'}
                        </Button></Link>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                            }}
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
