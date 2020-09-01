import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import habitatLogo from '../../../images/habitatLogo.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        zIndex: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },
    menuButton: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        paddingTop: 10,
    },
    logo:{
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
    const openDrawer = () => setDrawerOpen(true)
    const closeDrawer = () => setDrawerOpen(false)
    return (
        <div className={classes.root}>
            {/* <Sidebar open={drawerOpen}
                toggleDrawer={toggleDrawer}
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
            /> */}
            <AppBar position="static" className={props.isDark ? classes.dark : classes.light}>
                <Toolbar>
                    {/* <IconButton edge="start" color="inherit" className={classes.menuButton} onClick={toggleDrawer}> */}
                    {/* <MenuIcon /> */}
                    {/* </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        <a href="/"><img src={habitatLogo} className={classes.logo} /></a>
                    </Typography>
                    <Button onClick={() => props.setLanguage("en")} color="inherit" >EN</Button>
                    <Button onClick={() => props.setLanguage("fa")} color="inherit" >FA</Button>
                    <form action="/logout" method="post">
                        <input
                            type="hidden"
                            name="_token"
                            value={props.csrf_token}
                        />
                        <Button type="submit" color="inherit" >Logout</Button>
                    </form>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header
