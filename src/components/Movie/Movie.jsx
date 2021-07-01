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

    return (

        <div>

            {movie?.map(movie => {
                return (
                    <div key={movie?.id}>
                        <h1>{movie?.title}</h1>
                        <img src={movie?.image} alt={movie?.title} />
                        <h2>{movie?.director}</h2>
                        <h3>{movie?.release_date}</h3>
                        <h3>{movie?.genre}</h3>
                        <p>{movie?.synopsis}</p>
                    </div>
                )
            })}

        </div>

    ); // end return

} // end return
export default Movie;