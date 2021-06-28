import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './Movie.css';

function Movie(){

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    console.log(movies);

    useEffect(() => {
        dispatch({ type: 'GET_MOVIES' });
    }, []);

    return(

        <div>
            <p>movie</p>
        </div>

    ); // end return

} // end return
export default Movie;