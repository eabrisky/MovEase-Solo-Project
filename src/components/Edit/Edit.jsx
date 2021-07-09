import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// css
import './Edit.css';

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



function Edit() {

    //useParams
    const params = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const movieToEdit = useSelector(store => store.edit);

    // useEffect
    // useEffect(() => {
    //     console.log('edit view, params.id: ', params.id);
    //     dispatch({
    //         type: 'MOVIE_TO_EDIT',
    //         payload: params.id,
    //     })
    // }, []);

    // local state
    const [title, setTitle] = useState(movieToEdit.title);
    const [director, setDirector] = useState(movieToEdit.director);
    const [releaseDate, setReleaseDate] = useState(movieToEdit.release_date);
    const [synopsis, setSynopsis] = useState(movieToEdit.synopsis);
    const [genre, setGenre] = useState(movieToEdit.genre_id);
    const [poster, setPoster] = useState(movieToEdit.image);
    const [tag, setTag] = useState('');

    // data object
    const movie = {
        id: movieToEdit.id,
        title: title,
        director: director,
        release_date: releaseDate,
        synopsis: synopsis,
        genre_id: genre,
        image: poster,
        tag_id: tag
    } // end movie

    console.log(movieToEdit);

    // inputs
    const classes = useStyles();

    // TAG DROP-DOWN MENU
    const [anchorElTag, setAnchorElTag] = React.useState(null);

    // GENRE DROP-DOWN MENU
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChangeTag = (event) => {
        setAnchorElTag(null);
        setTag(event.target.value);
    } // end handleChangeTag

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
        setTag(0);

        // navigate to catalog view
        history.push('/catalog');

    } // end handleSubmit

    const handleCancel = () => {
        history.goBack();
    } // end handleCancel

    // tag
    const handleClickTag = (event) => {
        setAnchorElTag(event.currentTarget);
    };

    const handleChangeT = () => {
        setAnchorElTag(null);
    };

    // genre
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChange = () => {
        setAnchorEl(null);
    };

    return (

        <div>

            <h2>EDIT</h2>

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
                        defaultValue={releaseDate?.slice(0, 10)}
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

                    {/* tag */}
                    <div>

                        <Button
                            variant="contained"
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
                            <MenuItem onClick={handleChangeTag} value="26">Stop-Motion</MenuItem>

                        </Menu>

                    </div>

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
                        <Button className="save" color="primary" type="submit" variant="contained">Save</Button>
                        <Button className="cancel" color="secondary" variant="contained" onClick={handleCancel}>Cancel</Button>

                    </div>

                </form>

            </div>

        </div>

    ) // end return

} // end edit fn

export default Edit;

