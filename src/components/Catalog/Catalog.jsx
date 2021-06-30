import './Catalog.css';

import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// buttons
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// sweetalert2
import Swal from 'sweetalert2';

// cards
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        maxWidth: 345
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
})); // end useStyles

function Catalog() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    console.log(movies);

    useEffect(() => {
        dispatch({ type: 'GET_MOVIES' });
    }, []);

    const handleEdit = () => {
        // console.log(user.id);
        console.log(`HI`);

    } // end handleEdit

    const handleRemove = (movie) => {

        console.log(`movie: ${movie}`);

        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently remove this movie from your catalog!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'I HATE THIS MOVIE I NEVER WANNA SEE IT AGAIN!!',
            cancelButtonText: 'Maybe I should give it a rewatch...'
          }) // end.fire
          .then((result) => {
            if (result.isConfirmed) {

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

    return (

        <div className="catalog">
            <h1>Catalog</h1>
            <table>
                <thead>
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
                        <td>{movie?.title}</td>
                        <td>{movie?.director}</td>
                        <td>{movie?.release_date}</td>
                        <td>{movie?.genre}</td>
                        <td><button onClick={() => handleEdit(movie)}>Edit</button></td>
                        <td><button onClick={() => handleRemove(movie)}>Remove</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
                
        </div>

    ); // end return

}; // end Catalog fn

export default Catalog;