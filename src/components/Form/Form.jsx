import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// css
import './Form.css';

// inputs
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// drop-down menu from material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Form() {

    const dispatch = useDispatch();
    const history = useHistory();

    // local state variables
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [genre, setGenre] = useState(0);
    const [poster, setPoster] = useState('');

    // handle change fns

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    } // end handleChangeTitle

    const handleChangeDirector = (event) => {
        setDirector(event.target.value);
    } // end handleChangeDirector

    const handleChangeReleaseDate = (event) => {
        setReleaseDate(event.target.value);
    } // end handleChangeReleaseDate

    const handleChangeSynopsis = (event) => {
        setSynopsis(event.target.value);
    } // end handleChangeSynopsis

    const handleChangeGenre = (event) => {
        setGenre(event.target.value);
    } // end handleChangeGenre

    const handleChangePoster = (event) => {
        setPoster(event.target.value);
    } // end handleChangePoster

    // data object
    const movie = {
        title: title,
        director: director,
        release_date: releaseDate,
        synopsis: synopsis,
        genre: genre,
        image: poster
    } // end movie

    // dispatch
    const handleSubmit = () => {

        console.log(movie);
        // dispatch to movie.saga.js
        dispatch({
            type: 'CREATE_MOVIE',
            payload: movie
        });

        // clear inputs
        setTitle('');
        setDirector('');
        setReleaseDate('');
        setSynopsis('');
        setGenre(0);
        setPoster('');

        // navigate to movie view
        // view new movie
        history.push('/movie');

    } // end handleSubmit

    // cancel
    const handleCancel = () => {
        history.goBack();
    }

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

        <div className="form">

            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">

                {/* title */}
                <TextField
                    required={true}
                    id="standard-basic"
                    label="title"
                    onChange={handleChangeTitle}
                    value={title}
                />

                {/* director */}
                <TextField
                    required={true}
                    id="standard-basic"
                    label="director"
                    onChange={handleChangeDirector}
                    value={director}
                />

                {/* release date */}
                <TextField
                    required={true}
                    id="standard-basic"
                    label="release"
                    onChange={handleChangeReleaseDate}
                    value={releaseDate}
                />

                {/* poster */}
                {/* will later be image upload area */}
                <TextField
                    required={true}
                    id="standard-basic"
                    label="poster"
                    onChange={handleChangePoster}
                    value={poster}
                />

                {/* synopsis */}
                <TextField
                    required={true}
                    id="standard-multiline-flexible"
                    label="synopsis"
                    multiline
                    rowsMax={4}
                    onChange={handleChangeSynopsis}
                    value={synopsis}
                />

                {/* genre */}
                <div>

                    <Button
                        variant="outlined"
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
                        <MenuItem onClick={handleChangeGenre} value="1">Adventure</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="2">Animated</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="3">Biographical</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="4">Comedy</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="5">Disaster</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="6">Drama</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="7">Epic</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="8">Fantasy</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="9">Musical</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="10">Romantic</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="11">Science Fiction</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="12">Space-Opera</MenuItem>
                        <MenuItem onClick={handleChangeGenre} value="13">Superhero</MenuItem>
                    </Menu>

                </div>

                <div>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                        type="button"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                </div>

            </form>

        </div>

    ); // end return

}; // end Form fn

export default Form;