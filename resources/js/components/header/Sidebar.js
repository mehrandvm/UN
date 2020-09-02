import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    link: {
        textDecoration: 'none',
        color: '#000',
    },
});

const Sidebar = (props) => {
    const classes = useStyles();
    const sidebarItems = [
        { title: "Home", link: "/", icon: <MapIcon /> },
        { title: "Login", link: "/login", icon: <LocationOnIcon /> },
    ]
    const list = () => (
        <div
            onClick={props.closeDrawer}
            onKeyDown={props.closeDrawer}
        >
            <List className={classes.list}>
                {sidebarItems.map((item) => (
                    <Link href={`${item.link}`} key={item.title}><ListItem button className={classes.link}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem></Link>
                ))}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <SwipeableDrawer
                anchor={'left'}
                open={props.open}
                onClose={props.closeDrawer}
                onOpen={props.openDrawer}
            >
                {list()}
            </SwipeableDrawer>
        </React.Fragment>
    );
}

export default Sidebar