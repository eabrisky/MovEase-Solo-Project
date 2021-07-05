import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './Movie.css';

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

function Movie() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movie = useSelector(store => store.featuredMovie);

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