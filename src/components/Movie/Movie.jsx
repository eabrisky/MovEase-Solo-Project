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
    const [hidden, setHidden] = useState(false);
    const [dog, setDog] = useState('dragons');

    const inputHandler = () => {

        if (hidden === false) {
            return (
                <p className="test" onClick={() => setHidden(!hidden)}>{dog}</p>
            )
        } else {
            return (
                <form onSubmit={() => handleSubmit(movie)}>
                    <input value={dog} onChange={(event) => {setDog(event.target.value)}} />
                    <button type="submit">Save</button>
                    <button onClick={() => {setHidden(!hidden)}}>Cancel</button>
                </form>
            )
        }

    } // end inputHandler

    const handleSubmit = (event, movie) => {
        // console.log(movie);
        setHidden(!hidden);
    }

    console.log(movie);

    const handleEdit = (event, movie) => {

        console.log('movie view movie to edit: ', movie);

        event.preventDefault();

        dispatch({
            type: 'MOVIE_TO_EDIT',
            payload: movie
        })

        // navigate user to edit page
        history.push('/edit');

    } // end handleEdit

    return (

        <div className="movieContainer">

            <div>
                {movie?.map(movie => {
                    return (
                        <div>
                            <div>
                                <div key={movie?.id}>
                                    <h1 className="textArea title">{movie?.title}</h1>
                                    <img src={movie?.image} alt={movie?.title} className="poster" />
                                    <h2 className="textArea director">{movie?.director}</h2>
                                    <h3 className="textArea releaseDate">Released {movie?.release_date.slice(0, 10)}</h3>
                                    <h3 className="textArea genre">{movie?.genre}</h3>
                                    <p className="textArea synopsis">{movie?.synopsis}</p>
                                </div>
                                <button onClick={(event) => handleEdit(event, movie)} className="button">
                                    Edit
                                </button>
                                <button onClick={() => history.push('/catalog')} className="button">Catalog</button>
                            </div>

                            <div>
                                {inputHandler(movie?.id)}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>

    ); // end return

} // end return
export default Movie;