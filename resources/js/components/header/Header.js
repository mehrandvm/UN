import React, {useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import habitatLogo from '../../../images/habitatLogo.png'
import Sidebar from "./Sidebar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import axiosInstance, {parseJwt, tokenTitle} from "../../apis/AxiosConfig";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {InputBase} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import LanguageIcon from '@material-ui/icons/Language';
import {getTranslator} from "../../vocabs";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from "@material-ui/core/Menu";

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        position: 'relative',
        // backgroundColor: theme.palette.background.paper,
        // border: '1px solid #ced4da',
        color: "#FFF",
        border: 'none',
        padding: '10px 26px 10px 12px',
        fontSize: '0.875rem',
        minWidth: 64,
        boxSizing: 'border-box',
        fontWeight: 500,
        lineHeight: 1.75,
        borderRadius: 4,
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',

        '&:focus': {
            // borderRadius: 4,
            // borderColor: '#80bdff',
            // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        zIndex: 5,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
    menuButton: {
        fontSize: '2rem',
    },
    title: {
        flexGrow: 1,
        paddingTop: 10,
    },
    logo: {
        maxHeight: 40,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    light: {},
    dark: {
        backgroundColor: 'rgb(0,0,0,0.6)',
    },
    select: {
        color: "#FFF",
    }
}));

const Header = (props) => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const classes = useStyles();
    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(!drawerOpen);
    };
    const {enqueueSnackbar} = useSnackbar()
    const history = useHistory()
    const openDrawer = () => setDrawerOpen(true)
    const closeDrawer = () => setDrawerOpen(false)
    const handleLogout = () => {
        localStorage.removeItem(tokenTitle)
        history.push('/login')
        enqueueSnackbar("You logged out", {variant: 'info'})
    }
    const language = useContext(LanguageContext).language
    const vocabs = getTranslator(useContext(LanguageContext).language);
    const setLanguage = useContext(LanguageContext).changeLanguage
    const handleChangeLanguage = (e) => {
        localStorage.setItem('language', e.target.value)
        setLanguage(e.target.value);
    }
    const endSession = () => {
        const token = localStorage.getItem(tokenTitle)
        if (token) {
            const sessionTime = ((Date.now() / 1000) - parseJwt(token).iat) / 60
            if (sessionTime > 60 * 4) {
                localStorage.removeItem(tokenTitle)
                history.push('/login')
                enqueueSnackbar('Session Expired!', {variant: 'info'})
            }
        }
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const fetchUserInfo = async () => {
        const token = localStorage.getItem(tokenTitle)
        const language = localStorage.getItem('language')
        if (token) {
            await axiosInstance.get('/user/profile').then((res) => {
                if (language === 'en') {
                    setUserInfo(res.data.data.f_name + " " + res.data.data.l_name)
                } else {
                    setUserInfo(res.data.data.f_name + " " + res.data.data.l_name)
                }
            }).catch((e) => {
                console.log(e)
            })
        } else {
            setUserInfo(null)
        }
    }
    const returnLogoLink = () => {
        if (props.role === 'admin') {
            return '/dashboard'
        }
        if (props.role === 'agent') {
            return '/mydashboard'
        }
        if (props.role === 'none') {
            return '/'
        }
        return '/'
    }
    useEffect(() => {
        endSession()
        fetchUserInfo()
    }, [])
    return (
        <div className={classes.root}>
            <Sidebar open={drawerOpen}
                     toggleDrawer={toggleDrawer}
                     openDrawer={openDrawer}
                     closeDrawer={closeDrawer}
                     isDark={props.isDark}
                     name={props.name}
                     logout={handleLogout}
                     userInfo={userInfo}
            />
            <AppBar position="static" className={props.isDark ? classes.dark : classes.light}>
                <Toolbar>
                    {props.hideSidebar ? null :
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                            <MenuIcon className={classes.menuButton}/>
                        </IconButton>}
                    <Typography variant="h6" className={classes.title}>
                        <a href={returnLogoLink()}><img src={habitatLogo} className={classes.logo}/></a>
                    </Typography>
                    <Select
                        value={language}
                        onChange={handleChangeLanguage}
                        input={<BootstrapInput startAdornment={<LanguageIcon/>}/>}
                        className={classes.select}
                    >
                        <MenuItem value={'en'}>{vocabs('english')}</MenuItem>
                        <MenuItem value={'fa'}>{vocabs('persian')}</MenuItem>
                    </Select>
                    {/*<Button onClick={() => props.setLanguage("en")} color="inherit">EN</Button>*/}
                    {/*<Button onClick={() => props.setLanguage("fa")} color="inherit">FA</Button>*/}
                    {/*<form action="/logout" method="post">*/}
                    {/*    <input*/}
                    {/*        type="hidden"*/}
                    {/*        name="_token"*/}
                    {/*        value={props.csrf_token}*/}
                    {/*    />*/}

                    {/*<Button type="submit" color="inherit" onClick={handleLogout}>{vocabs('logout')}</Button>*/}

                    {userInfo ?
                        <Button type="submit" color="inherit" onClick={handleClick}>
                            {userInfo}
                            {/*{vocabs('profile')}*/}
                        </Button>
                        :
                        null
                    }
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>{vocabs('logout')}</MenuItem>
                    </Menu>
                    {/*</form>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header
