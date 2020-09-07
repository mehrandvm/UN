import React, {useState} from 'react';
import {Button, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import construction from '../../../images/construction.jpg'
import MapIcon from '@material-ui/icons/Map';
import Header from '../header/Header';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    showcase: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${construction})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        textShadow: '2px 2px 10px #000',
        overflowX: 'hidden',
    },
    text: {
        color: '#F2F2F2',
    },
    title: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    container: {
        padding: '0 100px',
    },
    button: {
        marginTop: 25,
        marginRight: 25,
        width: '150px',
        height: '50px',
        textDecoration: 'none',
        textShadow: 'none',
    },
    footer: {
        background: '#333',
        color: '#f4f4f4',
        padding: '2.2rem',
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
    },
    aboutUs: {
        padding: 50,
    },
    aboutUsItem: {
        textAlign: "center",
    },
    aboutUsIcon: {
        fontSize: 200,
    },
    backdrop: {
        backgroundColor: "black",
        zIndex: 3,
    }
}));

const Home = () => {
    const classes = useStyles();
    const [language, setLanguage] = useState("en")
    return (
        <div>
            <Header setLanguage={setLanguage} isDark={true} hideSidebar={true}/>
            <Grid container className={classes.showcase} alignItems="center">
                <Grid item xs={12} className={classes.container}>
                    <Grid item xs={12} className={classes.text}>
                        <Typography variant='h2' className={classes.title}>Lorem Ipsum</Typography>
                        <Typography variant='h4' className={classes.title}>Lorem Ipsum is simply dummy text</Typography>
                        <Typography variant='h4' className={classes.title}>of the printing and typesetting industry</Typography>
                        <Typography variant='h6' className={classes.title}>UN Habitat</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to={'/login'} className={classes.link}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Login
                            </Button>
                        </Link>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            About Us
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {/*<Grid container id="aboutus" className={classes.aboutUs} justify="center">*/}
            {/*    <Grid item xs={12} sm={6} className={classes.aboutUsItem}>*/}
            {/*        <MapIcon className={classes.aboutUsIcon}/>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={12} sm={6}>*/}
            {/*        <h3>About Us</h3>*/}
            {/*        <p>*/}
            {/*            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non eos aperiam labore consectetur*/}
            {/*            maiores ea magni exercitationem*/}
            {/*            similique laborum sed, unde, autem vel iure doloribus aliquid. Aspernatur explicabo consectetur*/}
            {/*            consequatur non*/}
            {/*            nesciunt debitis quos alias soluta, ratione, ipsa officia reiciendis.*/}
            {/*            consequatur non nesciunt debitis quos alias soluta, ratione, ipsa officia reiciendis*/}
            {/*        </p>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            {/*<footer className={classes.footer}>*/}
            {/*    <p>Lorem Ipsum &copy; 2020</p>*/}
            {/*</footer>*/}
        </div>
    );
}

export default Home
