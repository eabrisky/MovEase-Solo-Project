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
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import LocalMoviesOutlinedIcon from '@material-ui/icons/LocalMoviesOutlined';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import MoreIcon from '@material-ui/icons/More';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



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
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>

                <Divider />

                <ListItem button onClick={() => { history.push('/catalog') }}>
                    <ListItemIcon><LocalMoviesIcon /></ListItemIcon>
                    <ListItemText primary='Catalog' />
                </ListItem>

                <Divider />

                <ListItem button onClick={() => { history.push('/movie/:id') }}>
                    <ListItemIcon><LocalMoviesOutlinedIcon /></ListItemIcon>
                    <ListItemText primary='Featured Movie' />
                </ListItem>

                <Divider />

                <ListItem button onClick={() => { history.push('/edit') }}>
                    <ListItemIcon><EditIcon /></ListItemIcon>
                    <ListItemText primary='Edit Movie' />
                </ListItem>

                <Divider />

                <ListItem button onClick={() => { history.push('/search') }}>
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary='Search' />
                </ListItem>

                <Divider />

                <ListItem button onClick={() => { history.push('/form') }}>
                    <ListItemIcon><LibraryAddIcon /></ListItemIcon>
                    <ListItemText primary='Add Movie' />
                </ListItem>

                <Divider />

                <ListItem button onClick={() => { history.push('/tags') }}>
                    <ListItemIcon><MoreIcon /></ListItemIcon>
                    <ListItemText primary='Tags' />
                </ListItem>

                <Divider />

                <ListItem button onClick={() => { history.push('/about') }}>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary='About' />
                </ListItem>

                <Divider />

                <ListItem button onClick={() => dispatch({ type: 'LOGOUT' })}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary='Log Out' />
                </ListItem>

                <Divider />

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