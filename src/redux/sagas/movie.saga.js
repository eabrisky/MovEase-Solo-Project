import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createMovie(action) {
    try{
        yield axios.post('/api/movie', action.payload);
        //get movies
        // yield put({ type: 'GET_MOVIES'});
    }
    catch(error){
        console.error(`Error creating movie: ${error}`);
    }
}

function* movieSaga() {
    yield takeEvery('CREATE_MOVIE', createMovie);
}

export default movieSaga;