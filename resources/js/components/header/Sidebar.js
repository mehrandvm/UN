import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axiosInstance from "../../apis/AxiosConfig";

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
    const [viewDashboard, setViewDashboard] = React.useState(false);
    const [manageUsers, setManageUsers] = React.useState(false);
    const [manageTasks, setManageTasks] = React.useState(false);
    const [manageMyTasks, setManageMyTasks] = React.useState(false);

    const classes = useStyles();

    const fetchPermissions = () => {
        Promise.all([
            axiosInstance.get('http://localhost:8000/api/v1/management/permission/view-dashboard'),
            axiosInstance.get('http://localhost:8000/api/v1/management/permission/manage-users'),
            axiosInstance.get('http://localhost:8000/api/v1/management/permission/manage-tasks'),
        ]).then((values) => {
            if (values[0].data.status_code === 200) {
                setViewDashboard(true)
            }
            if (values[1].data.status_code === 200) {
                setManageUsers(true)
            }
            if (values[2].data.status_code === 200) {
                setManageTasks(true)
            }
            if (values[2].data.status_code !== 200) {
                setManageMyTasks(true)
            }
        }).catch((e) => {
            console.error(e)
        });
    }

    useEffect(() => {
        fetchPermissions()
    }, [])

    const sidebarItems = () => {
        let sidebarOptions = []
        sidebarOptions.push({title: "Home", link: "/", icon: <HomeIcon/>})
        if (viewDashboard) {
            sidebarOptions.push({title: "Dashboard", link: "/dashboard", icon: <DashboardIcon/>})
        }
        if (manageUsers) {
            sidebarOptions.push({title: "Users", link: "/user", icon: <SupervisorAccountIcon/>})
        }
        if (manageTasks) {
            sidebarOptions.push({title: "Tasks", link: "/task", icon: <AssignmentIcon/>})
        }
        if (manageMyTasks) {
            sidebarOptions.push({title: "My tasks", link: "/mytasks", icon: <AssignmentIndIcon/>})
        }
        return sidebarOptions
    }
    const list = () => (
        <div
            onClick={props.closeDrawer}
            onKeyDown={props.closeDrawer}
        >
            <List className={classes.list}>
                {sidebarItems().map((item) => (
                    <Link href={`${item.link}`} key={item.title}><ListItem button className={classes.link}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title}/>
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
