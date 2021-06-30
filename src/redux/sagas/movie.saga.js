import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getMovies() {
    try{
        // send request to server & save response
        const response = yield axios.get('/api/movie');
        // send response to movie.reducer
        yield put({
            type: 'SET_MOVIES',
            payload: response.data
        });
    }
    catch(err){
        console.error(`Error getting movies: ${err}`);
    }
} // end getMovies fn*

function* createMovie(action) {
    try{
        yield axios.post('/api/movie', action.payload);
        //get movies
        yield put({ type: 'GET_MOVIES'});
    }
    catch(err){
        console.error(`Error creating movie: ${err}`);
    }
} // end createMovie fn*

function* removeMovie(action) {
    try{
        yield axios.delete(`api/movie/${action.payload.id}/${action.payload.user_id}`, action.payload);
        //get movies
        yield put({ type: 'GET_MOVIES'});
    }
    catch(err){
        console.error(`Error removing movie =( ${err}`);
    }
}

// watcherSaga
function* movieSaga() {
    yield takeEvery('GET_MOVIES', getMovies);
    yield takeEvery('CREATE_MOVIE', createMovie);
    yield takeEvery('REMOVE_MOVIE', removeMovie);
}

export default movieSaga;