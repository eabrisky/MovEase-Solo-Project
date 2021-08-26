import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './Search.css';

// sweetalert2
import Swal from 'sweetalert2';

// button
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    // drop-down menu
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

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

    const handleFeature = (movieId) => {
        console.log(`movie id: ${movieId}`);
        dispatch({
            type: 'FEATURE_MOVIE',
            payload: movieId
        })
        history.push(`/movie/${movieId}`);
    } // end handleFeature

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(searchQuery);

        if (searchQuery === '') {

            getAllMovies();

        } else {

            dispatch({
                type: 'SEND_QUERY',
                payload: { search: searchQuery }
            })

            setSearchQuery('');

        } // end if else

    } // end handleSubmit

    const handleSave = (event, movie) => {

        event.preventDefault();




        Swal.fire({
            title: `Save ${movie.title} to your catalog?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'I simply must have it for my collection!',
            cancelButtonText: 'No, no... perhaps not today...'
        }).then((result) => {
            if (result.isConfirmed) {

                console.log(movie);

                // dispatch
                dispatch({
                    type: 'ADD_TO_CATALOG',
                    payload: movie
                })

                Swal.fire(
                    'Saved!',
                    `${movie.title} has been added to your catalog.`,
                    'success'
                )
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Maybe you meant to save a different movie...?',
                    'error'
                )
            }
        })

    } // end handleSave

    return (

        <div className="searchPage">

            <h2 className="componentTitle">SEARCH</h2>

            <div className="search">
                <form onSubmit={handleSubmit}>
                    <input onChange={() => handleChange(event)} value={searchQuery} />
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Search
                    </Button>
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
                                <td className="title" onClick={() => handleFeature(movie?.id)}>{movie?.title}</td>
                                <td>{movie?.director}</td>
                                <td>{movie?.release_date.slice(0, 10)}</td>
                                <td>{movie?.genre}</td>
                                <td className="center">{movie?.tags}</td>
                                <td><Button
                                 onClick={(event) => handleSave(event, movie)}
                                 >
                                     Save
                                 </Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>

    ) // end return
} // end Search fn

export default Search;