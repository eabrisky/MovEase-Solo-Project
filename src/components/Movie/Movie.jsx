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

    return(

        <div>
            <p>movie</p>
            <img src="https://api.time.com/wp-content/uploads/2015/10/aladdin-poster.jpg?w=250&quality=85" alt="aladdin" />
        </div>

    ); // end return

} // end return
export default Movie;