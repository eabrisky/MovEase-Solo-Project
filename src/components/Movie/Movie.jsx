import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './Movie.css';

function Movie() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movie = useSelector(store => store.featuredMovie);

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


    if (movie) {

        return (

            <div className="movieContainer">

                {movie?.map(movie => {
                    return (
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
                    )
                })}

            </div>

        ); // end return

    } else if (!movie) {
        return (
            <div className="noMovie">
                <h2>Nothing showing!</h2>
                <p>Please go back and select a movie from your catalog to view it here :D</p>
            </div>
        ) // end else if return
    } else {
        return(
            <div className="default">
                <h2>Woah, how did we get here? ...How do we get BACK!?</h2>
            </div>
        )
    }

} // end return
export default Movie;