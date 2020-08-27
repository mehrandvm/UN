import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/Warning';
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(2),
    },
    list: {
        marginTop: '-4px',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRadius: 4,
    },
    collapse: {
    },
}));

const HazardSelector = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        props.setMapHazards({ ...props.mapHazards, [event.target.name]: event.target.checked });
    };

    return (
        <List className={classes.root}>
            <ListItem button onClick={handleClick} className={classes.list}>
                <ListItemIcon>
                    <WarningIcon/>
                </ListItemIcon>
                <ListItemText primary="Hazards"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapse}>
                <List component="div" disablePadding dense={true}>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Switch
                                checked={props.mapHazards.HazardOne}
                                onChange={handleChange}
                                name="hazardOne"
                            />
                        </ListItemIcon>
                        <ListItemText primary="Hazard One"/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Switch
                                checked={props.mapHazards.HazardTwo}
                                onChange={handleChange}
                                name="hazardTwo"
                            />
                        </ListItemIcon>
                        <ListItemText primary="Hazard Two"/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Switch
                                checked={props.mapHazards.HazardThree}
                                onChange={handleChange}
                                name="hazardThree"
                            />
                        </ListItemIcon>
                        <ListItemText primary="Hazard Three"/>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}

export default HazardSelector
