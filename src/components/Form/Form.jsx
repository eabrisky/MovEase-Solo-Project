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
    // drop-down menu
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
    const [tag, setTag] = useState('');

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

    const handleChangePoster = (event) => {
        setPoster(event.target.value);
    } // end handleChangePoster

    const handleChangeSynopsis = (event) => {
        setSynopsis(event.target.value);
    } // end handleChangeSynopsis

    const handleChangeTag = (event) => {
        setAnchorElTag(null);
        setTag(event.target.value);
    } // end handleChangeTag

    const handleChangeGenre = (event) => {
        setAnchorElGenre(null);
        setGenre(event.target.value);
    } // end handleChangeGenre

    // data object
    const movie = {
        title: title,
        director: director,
        release_date: releaseDate,
        synopsis: synopsis,
        genre_id: genre,
        image: poster,
        tag_id: tag
    } // end movie

    // dispatch
    const handleSubmit = (event) => {

        event.preventDefault();

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
        setPoster('');
        setSynopsis('');
        setTag(0);
        setGenre(0);

        // navigate to catalog view
        history.push('/catalog');

    } // end handleSubmit

    // cancel
    const handleCancel = () => {
        history.goBack();
    }

    // inputs
    const classes = useStyles();

    // TAG DROP-DOWN MENU
    const [anchorElTag, setAnchorElTag] = React.useState(null);

     // GENRE DROP-DOWN MENU
     const [anchorElGenre, setAnchorElGenre] = React.useState(null);


    // tag
    const handleClickTag = (event) => {
        setAnchorElTag(event.currentTarget);
    };

    const handleChangeT = () => {
        setAnchorElTag(null);
    };

    //genre
    const handleClickGenre = (event) => {
        setAnchorElGenre(event.currentTarget);
    };

    const handleChangeG = () => {
        setAnchorElGenre(null);
    };

    return (

        <div>

            <h2>ADD MOVIE</h2>

            <div className="form">

                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">

                    {/* title */}
                    <TextField
                        required={true}
                        id="standard-basic"
                        label="Title"
                        onChange={handleChangeTitle}
                        value={title}
                    />

                    {/* director */}
                    <TextField
                        required={true}
                        id="standard-basic"
                        label="Director"
                        onChange={handleChangeDirector}
                        value={director}
                    />

                    {/* release date */}
                    <TextField
                        required={true}
                        id="standard-basic"
                        label="Release Date"
                        onChange={handleChangeReleaseDate}
                        value={releaseDate}
                    />

                    {/* poster */}
                    {/* will later be image upload area */}
                    <TextField
                        required={true}
                        id="standard-basic"
                        label="Poster"
                        onChange={handleChangePoster}
                        value={poster}
                    />

                    {/* synopsis */}
                    <TextField
                        required={true}
                        id="standard-multiline-flexible"
                        label="Synopsis"
                        multiline
                        rowsMax={6}
                        onChange={handleChangeSynopsis}
                        value={synopsis}
                    />

                    {/* tag */}
                    <div>

                        <Button
                            variant="outlined"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClickTag}
                            type="button"
                        >
                            Tag
                        </Button>

                        <Menu
                            id="simple-menu"
                            anchorElTag={anchorElTag}
                            keepMounted
                            open={Boolean(anchorElTag)}
                            onClose={handleChangeT}
                            className="tagMenu"
                        >
                            {/* MenuItem values correspond to genre_ids in movies_genres table in db */}
                            <MenuItem onClick={handleChangeTag} value="1">Film</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="2">Digital</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="3">35mm</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="4">70mm</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="5">B&W</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="6">Animated</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="7">Happy</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="8">Sad</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="9">Hard to Watch</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="10">Cerebral</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="11">Arri</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="12">Panavision</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="13">RED</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="14">Blackmagic</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="15">Canon</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="16">One Shot</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="17">Grunge</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="18">Dogma 95</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="19">French New Wave</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="20">Gritty</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="21">International</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="22">Epic</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="23">Slice of Life</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="24">Period Piece</MenuItem>
                            <MenuItem onClick={handleChangeTag} value="25">Classic</MenuItem>

                        </Menu>

                    </div>

                    {/* genre */}
                    <div>

                        <Button
                            variant="outlined"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClickGenre}
                            type="button"
                        >
                            Genre
                        </Button>

                        <Menu
                            id="simple-menu"
                            anchorElGenre={anchorElGenre}
                            keepMounted
                            open={Boolean(anchorElGenre)}
                            onClose={handleChangeG}
                            className="genreMenu"
                        >
                            {/* MenuItem values correspond to genre_ids in movies_genres table in db */}
                            <MenuItem onClick={handleChangeGenre} value="2">Adventure</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="1">Action</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="3">Animation</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="4">Biography</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="5">Comedy</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="6">Crime</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="7">Documentary</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="8">Drama</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="9">Family</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="10">Fantasy</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="11">Film Noir</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="12">History</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="13">Horror</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="14">Music</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="15">Musical</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="16">Mystery</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="17">Romance</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="18">Sci-Fi</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="19">Short Film</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="20">Sport</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="21">Superhero</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="22">Thriller</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="23">War</MenuItem>
                            <MenuItem onClick={handleChangeGenre} value="24">Western</MenuItem>

                        </Menu>

                    </div>

                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCancel}
                            type="button"
                        >
                            Cancel
                        </Button>
                    </div>

                </form>

            </div>

        </div>

    ); // end return

}; // end Form fn

export default Form;