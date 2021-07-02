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

    return (

        <div>

            {movie?.map(movie => {
                return (
                    <div>
                    <div key={movie?.id}>
                        <h1>{movie?.title}</h1>
                        <img src={movie?.image} alt={movie?.title} />
                        <h2>{movie?.director}</h2>
                        <h3>{movie?.release_date.slice(0, 10)}</h3>
                        <h3>{movie?.genre}</h3>
                        <p>{movie?.synopsis}</p>
                    </div>
                    <button onClick={(event) => handleEdit(event, movie)}>
                        Edit
                    </button>
                    <button onClick={() => history.push('/catalog')}>Catalog</button>
                    </div>
                )
            })}

        </div>

    ); // end return

} // end return
export default Movie;