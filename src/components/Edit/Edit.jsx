import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

function Edit() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movieToEdit = useSelector(store => store.edit);

    movieToEdit

    // local state
    const [title, setTitle] = useState(movieToEdit.title);
    const [director, setDirector] = useState(movieToEdit.director);
    const [releaseDate, setReleaseDate] = useState(movieToEdit.release_date.slice(0, 10));
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
                    rowsMax={6}
                    defaultValue={synopsis}
                    onChange={(event) => setSynopsis(event.target.value)}
                />

                {/* genre */}
                {/* <TextField
                    id="standard-basic"
                    label="Genre"
                    value={genre}
                /> */}
                
                {/* genre selector button*/}
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
                
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    ) // end return

} // end edit fn

export default Edit;

