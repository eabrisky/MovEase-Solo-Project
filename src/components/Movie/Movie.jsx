import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './Movie.css';

// inputs
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

function Movie() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movie = useSelector(store => store.featuredMovie);

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
    const [title, setTitle] = useState(movie?.title);
    const [director, setDirector] = useState(movie.director);
    const [releaseDate, setReleaseDate] = useState(movie.release_date?.slice(0, 10));
    const [synopsis, setSynopsis] = useState(movie.synopsis);
    const [genre, setGenre] = useState(movie.genre_id);
    const [poster, setPoster] = useState(movie.image);
    const [hidden, setHidden] = useState(false);

    // data object
    const updatedMovie = {
        id: movie.id,
        title: title,
        director: director,
        release_date: releaseDate,
        synopsis: synopsis,
        genre_id: genre,
        image: poster
    } // end movie

    const titleHandler = (movie) => {

        if (hidden === false) {
            return (
                <h1 onClick={() => setHidden(!hidden)}>movie title here pls</h1>
            )
        } else {
            return (
                <form onSubmit={() => handleSubmit(movie)}>
                    <input value={title} onChange={(event) => { setTitle(event.target.value) }} />
                    <button type="submit">Save</button>
                    <button onClick={() => { setHidden(!hidden) }}>Cancel</button>
                </form>
            )
        }

    } // end inputHandler

    const handleSubmit = (event, movie) => {
        event.preventDefault();
        console.log(movie);
        setHidden(!hidden);
        dispatch({
            type: 'MOVIE_TO_EDIT',
            payload: updatedMovie
        })
    }

    // const handleEdit = (event, movie) => {
    //     event.preventDefault();
    //     console.log('movie view movie to edit: ', movie);
    //     dispatch({
    //         type: 'MOVIE_TO_EDIT',
    //         payload: movie
    //     })
    //     // navigate user to edit page
    //     history.push('/edit');
    // } // end handleEdit

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

        <div className="movieContainer">

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

            <div>
                {titleHandler(movie)}
            </div>


            <div>
                {movie.map(movie => {
                    return (
                        <div>
                            <div key={movie?.id}>
                                <h1 className="textArea">{movie?.title}</h1>
                                <img src={movie?.image} alt={movie?.title} className="poster" />
                                <h2 className="textArea director">{movie?.director}</h2>
                                <h3 className="textArea releaseDate">Released {movie?.release_date?.slice(0, 10)}</h3>
                                <h3 className="textArea genre">{movie?.genre}</h3>
                                <p className="textArea synopsis">{movie?.synopsis}</p>
                            </div>
                            <button onClick={(event) => handleEdit(event, movie)} className="button">
                                Edit
                            </button>
                            <button onClick={() => history.push('/catalog')} className="button">Catalog</button>
                        </div>
                    )
                })}
            </div>
        </div>

    ); // end return

} // end return
export default Movie;