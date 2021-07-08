import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './Search.css';

function Search() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allMovies = useSelector(store => store.allMovies);

    const getAllMovies = () => {
        dispatch({
            type: 'GET_ALL_MOVIES',
        });
    } // end getAllMovies

    useEffect(() => {
        getAllMovies();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    console.log('allMovies: ', allMovies);
    // console.log('movies from store after search query: ', movies);

    const handleChange = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    } // end handleChange

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchQuery);
        dispatch({
            type: 'SEND_QUERY',
            payload: { search: searchQuery }
        })
        setSearchQuery('');
        // getAllMovies();
    } // end handleSubmit

    const handleSave = (event, movie) => {
        event.preventDefault();
        console.log(movie);
    } // end handleSave

    return (

        <div className="search">
            <form onSubmit={handleSubmit}>
                <input onChange={() => handleChange(event)} value={searchQuery} />
                <button type="submit">Search</button>
            </form>

            <table className="allMovies">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Tags</th>
                        <th>Save</th>
                    </tr>
                </thead>
                <tbody>
                    {allMovies?.map(movie => (
                        <tr key={movie?.id}>
                            <td><Link to='/movie' onClick={() => handleFeature(movie?.id)}>{movie?.title}</Link></td>
                            <td>{movie?.director}</td>
                            <td>{movie?.release_date.slice(0, 10)}</td>
                            <td>{movie?.genre}</td>
                            <td>{movie?.tags}</td>
                            <td><button onClick={(event) => handleSave(event, movie)}>Save</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    ) // end return
} // end Search fn

export default Search;