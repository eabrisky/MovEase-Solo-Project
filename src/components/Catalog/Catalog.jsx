import './Catalog.css';

import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// buttons
import { lighten, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// sweetalert2
import Swal from 'sweetalert2';

// table
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';



function Catalog() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    console.log(movies);

    useEffect(() => {
        dispatch({ type: 'GET_MOVIES' });
    }, []);

    const handleEdit = (event, movie) => {
        
        event.preventDefault();

        console.log(`event.target.value: ${event.target.value}`);
        console.log('movie:', movie);

        dispatch({
            type: 'MOVIE_TO_EDIT',
            payload: movie, 
        })

        // // navigate user to edit view
        history.push('/edit');

    } // end handleEdit

    const handleRemove = (movie) => {

        console.log('movie: ', movie);

        Swal.fire({
            title: 'Are you sure?',
            text: `This will permanently remove ${movie.title} from your catalog!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'I HATE THIS MOVIE I NEVER WANNA SEE IT AGAIN!!',
            cancelButtonText: 'Maybe I should give it a rewatch...'
        }) // end.fire
            .then((result) => {
                if (result.isConfirmed) {

                    console.log(movie);

                    // dispatch
                    dispatch({
                        type: 'REMOVE_MOVIE',
                        payload: movie
                    })

                    

                    Swal.fire(
                        'Removed!',
                        'This movie has been removed from your catalog.',
                        'success'
                    )

                    dispatch({ type: 'GET_MOVIES' });
                    // For more information about handling dismissals please visit
                    // https://sweetalert2.github.io/#handling-dismissals
                } // end if
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'Phew That was a CLOSE one!',
                        'error'
                    )
                } // end else if
            }) // end .then, end Swal

    } // end handleRemove

    const handleFeature = (movieId) => {
        console.log(`movie id: ${movieId}`);
        dispatch({
            type: 'FEATURE_MOVIE',
            payload: movieId
        })
    } // end handleFeature

    return (

        <div className="catalog">
            <h1>Catalog</h1>
            <table>
                <thead className="thead">
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {movies?.map(movie => (
                        <tr key={movie?.id}>
                            <td><Link to='/movie' onClick={() => handleFeature(movie.id)}>{movie?.title}</Link></td>
                            <td>{movie?.director}</td>
                            <td>{movie?.release_date.slice(0, 10)}</td>
                            <td>{movie?.genre}</td>
                            <td><button onClick={(event) => handleEdit(event, movie)}>Edit</button></td>
                            <td><button onClick={() => handleRemove(movie)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    ); // end return

}; // end Catalog fn

export default Catalog;