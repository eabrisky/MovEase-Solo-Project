import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// css
import './Menu.css';

// drawer
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function Menu() {

    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Divider />
            <List>

                <ListItem button onClick={() => { history.push('/user') }}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>

                <ListItem button onClick={() => { history.push('/catalog') }}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Catalog' />
                </ListItem>

                <ListItem button onClick={() => { history.push('/movie') }}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Movie' />
                </ListItem>

                <ListItem button onClick={() => { history.push('/edit') }}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Edit' />
                </ListItem>

                <ListItem button onClick={() => { history.push('/search') }}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Search' />
                </ListItem>

                <ListItem button onClick={() => { history.push('/form') }}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Form' />
                </ListItem>

                <ListItem button onClick={() => { history.push('/about') }}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='About' />
                </ListItem>

                <ListItem button onClick={() => dispatch({ type: 'LOGOUT' })}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Log Out' />
                </ListItem>

            </List>
        </div>
    );

    return (

        <div className="menu">
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><MenuIcon fontSize="small" /></Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onMouseLeave={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>

    ); // end return

} // end Menu fn

export default Menu;