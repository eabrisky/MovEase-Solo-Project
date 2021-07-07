import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// css
import './LandingPage.css';

// drawer
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

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {

  const [heading, setHeading] = useState('Welcome');
  const dispatch = useDispatch();
  const history = useHistory();

  // drawer consts and local state
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

  const onLogin = (event) => {
    history.push('/login');
  };

  return (

    <div>

      <div className="container">
        {['Menu'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}><MenuIcon fontSize="small" /></Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onMouseLeave={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>

      <div className="container">
        <h2>{heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
              ut ex molestie blandit. Etiam et turpis sit amet risus mollis
              interdum. Suspendisse et justo vitae metus bibendum fringilla sed
              sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
              elementum eget. Praesent efficitur eros vitae nunc interdum, eu
              interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
              Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
              luctus. Duis a sapien metus.
            </p>

            <p>
              Praesent consectetur orci dui, id elementum eros facilisis id. Sed
              id dolor in augue porttitor faucibus eget sit amet ante. Nunc
              consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
              finibus metus facilisis. Nullam eget lectus non urna rhoncus
              accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
              euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
              lobortis augue mi vel felis. Duis ultrices sapien at est convallis
              congue.
            </p>

            <p>
              Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
              Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
              vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
              sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
              non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
              amet nisi.
            </p>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>

  ); // end return

} // end LandingPage fn

export default LandingPage;
