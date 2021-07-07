import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// css
import './Edit.css';

// drawer
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

// inputs
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// drop-down menu from material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    // drop-down menu
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    // drawer
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

function Edit() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movieToEdit = useSelector(store => store.edit);

    // drawer consts and local state
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

    // local state
    const [title, setTitle] = useState(movieToEdit.title);
    const [director, setDirector] = useState(movieToEdit.director);
    const [releaseDate, setReleaseDate] = useState(movieToEdit.release_date?.slice(0, 10));
    const [synopsis, setSynopsis] = useState(movieToEdit.synopsis);
    const [genre, setGenre] = useState(movieToEdit.genre_id);
    const [poster, setPoster] = useState(movieToEdit.image);

    // data object
    const movie = {
        id: movieToEdit.id,
        title: title,
        director: director,
        release_date: releaseDate,
        synopsis: synopsis,
        genre_id: genre,
        image: poster
    } // end movie

    console.log(movieToEdit);

    // const handleEdit = (event, movie) => {
    //     dispatch({
    //         type: 'EDIT_ON_CHANGE',
    //         payload: {property: movie, value: event.target.value}
    //     })
    // } // end handleEdit

    const handleChangeGenre = (event) => {
        setAnchorEl(null);
        setGenre(event.target.value);
    } // end handleChangeGenre

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log('edit view movie to send: ', movie);

        dispatch({
            type: 'UPDATE_MOVIE',
            payload: movie
        });

        // clear inputs
        setTitle('');
        setDirector('');
        setReleaseDate('');
        setSynopsis('');
        setGenre(0);
        setPoster('');

        // navigate to catalog view
        history.push('/catalog');

    } // end handleSubmit

    const handleCancel = () => {

        // clear inputs
        setTitle('');
        setDirector('');
        setReleaseDate('');
        setSynopsis('');
        setGenre(0);
        setPoster('');

        // go back
        history.goBack();
    } // end handleCancel

    // inputs
    const classes = useStyles();

    // DROP-DOWN MENU
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChange = () => {
        setAnchorEl(null);
    };

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

            <div className="edit">

                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">

                    {/* title */}
                    <TextField
                        id="standard-basic"
                        label="Title"
                        defaultValue={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    {/* director */}
                    <TextField
                        id="standard-basic"
                        label="Director"
                        defaultValue={director}
                        onChange={(event) => setDirector(event.target.value)}
                    />

                    {/* release date */}
                    <TextField
                        id="standard-basic"
                        label="Release Date"
                        defaultValue={releaseDate}
                        onChange={(event) => setReleaseDate(event.target.value)}
                    />

                    {/* poster */}
                    <TextField
                        id="standard-basic"
                        label="Poster"
                        defaultValue={poster}
                        onChange={(event) => setPoster(event.target.value)}
                    />

                    {/* synopsis */}
                    <TextField
                        id="standard-multiline-flexible"
                        label="Synopsis"
                        multiline
                        rowsMax={4}
                        defaultValue={synopsis}
                        onChange={(event) => setSynopsis(event.target.value)}
                    />

                    {/* genre selector button*/}
                    <div className="genreButton">

                        <Button
                            variant="contained"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            type="button"
                        >
                            Genre
                        </Button>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleChange}
                        >
                            {/* MenuItem values correspond to genre_ids in movies_genres table in db */}
                            <MenuItem value="1" onClick={handleChangeGenre}>Action</MenuItem>
                            <MenuItem value="2" onClick={handleChangeGenre}>Adventure</MenuItem>
                            <MenuItem value="3" onClick={handleChangeGenre}>Animation</MenuItem>
                            <MenuItem value="4" onClick={handleChangeGenre}>Biography</MenuItem>
                            <MenuItem value="5" onClick={handleChangeGenre}>Comedy</MenuItem>
                            <MenuItem value="6" onClick={handleChangeGenre}>Crime</MenuItem>
                            <MenuItem value="7" onClick={handleChangeGenre}>Documentary</MenuItem>
                            <MenuItem value="8" onClick={handleChangeGenre}>Drama</MenuItem>
                            <MenuItem value="9" onClick={handleChangeGenre}>Family</MenuItem>
                            <MenuItem value="10" onClick={handleChangeGenre}>Fantasy</MenuItem>
                            <MenuItem value="11" onClick={handleChangeGenre}>Film Noir</MenuItem>
                            <MenuItem value="12" onClick={handleChangeGenre}>History</MenuItem>
                            <MenuItem value="13" onClick={handleChangeGenre}>Horror</MenuItem>
                            <MenuItem value="14" onClick={handleChangeGenre}>Music</MenuItem>
                            <MenuItem value="15" onClick={handleChangeGenre}>Musical</MenuItem>
                            <MenuItem value="16" onClick={handleChangeGenre}>Mystery</MenuItem>
                            <MenuItem value="17" onClick={handleChangeGenre}>Romance</MenuItem>
                            <MenuItem value="18" onClick={handleChangeGenre}>Sci-Fi</MenuItem>
                            <MenuItem value="19" onClick={handleChangeGenre}>Short Film</MenuItem>
                            <MenuItem value="20" onClick={handleChangeGenre}>Sport</MenuItem>
                            <MenuItem value="21" onClick={handleChangeGenre}>Superhero</MenuItem>
                            <MenuItem value="22" onClick={handleChangeGenre}>Thriller</MenuItem>
                            <MenuItem value="23" onClick={handleChangeGenre}>War</MenuItem>
                            <MenuItem value="24" onClick={handleChangeGenre}>Western</MenuItem>

                        </Menu>

                    </div>

                    <div>
                        <Button className="save" type="submit" variant="contained">Save</Button>
                        <Button className="cancel" variant="contained" onClick={handleCancel}>Cancel</Button>

                    </div>

                </form>

            </div>

        </div>

    ) // end return

} // end edit fn

export default Edit;

