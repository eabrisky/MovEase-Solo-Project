import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    Menu: false,
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

        <ListItem button onClick={() => { history.push('/form') }}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary='Form' />
        </ListItem>

        {/* <ListItem button onClick={() => { history.push('/search') }}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary='Search' />
        </ListItem>

        <ListItem button onClick={() => { history.push('/dashboard') }}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>

        <ListItem button onClick={() => { history.push('/imageupload') }}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary='Image Upload' />
        </ListItem> */}

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

    <div>

      <div className="container">
        {['Menu'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}><MenuIcon fontSize="small"/></Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onMouseLeave={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>

      <p>Info Page</p>

    </div>

  ); // end return

} // end InfoPage fn

export default InfoPage;
