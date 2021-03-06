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
        console.error('Error getting movies: ', err);
    }
} // end getMovies fn*

function* getTags(action) {
    try{       
        // send request to server & save response
        const response = yield axios.get('/api/tags', action.payload);
        // send response to tag.reducer
        // yield put({
        //     type: 'SET_TAGS',
        //     payload: response.data
        // });
    }
    catch(err){
        console.error('Error getting tags: ', err);
    }
} // end getTags

function* getAllMovies() {
    try{
        const response = yield axios.get(`/api/search/all`);
        yield put({
            type: 'SET_ALL_MOVIES',
            payload: response.data
        });
    }
    catch(err){
        console.log('Error getting all movies: ', err);
    }
} // end getAllMovies* fn

function* sendQuery(action){
    try{
        const response = yield axios.get(`/api/search/${action.payload.search}`, action.payload);

        yield put({
            type: 'RETURN_SEARCH',
            payload: response.data
        });
    }
    catch(err){
        console.error('Error returning search: ', err);
    }
} // end sendQuery fn*

function* addToCatalog(action){
    try{
        yield axios.post('api/search', action.payload);
        // get movies
        yield put({ type: 'GET_MOVIES' });
    }
    catch(err){
        console.log('Error adding to catalog: ', err);
    }
} // end addToCatalog fn*

function* featureMovie(action){
    try{
        const response = yield axios.get(`/api/movie/${action.payload}`);
        // send response.data to reducer to call on movie page
        yield put({
            type: 'SET_MOVIE',
            payload: response.data
        });

        yield put({ type: 'GET_MOVIES' })
    }
    catch(err){
        console.error(`Error featuring this movie ${err}`);
    }
} // end featureMovie fn*

function* createMovie(action) {
    try{
         const response = yield axios.post('/api/movie', action.payload);
         console.log('created movie response: ', response.data);
         
        //get movies
        yield put({ type: 'GET_MOVIES' });
    }
    catch(err){
        console.error(`Error creating movie: ${err}`);
    }
} // end createMovie fn*

function* updateMovie(action) {
    try{
        yield axios.put(`api/movie/${action.payload.id}`, action.payload);
        // get movies
        yield put({ type: 'GET_MOVIES' });
    }
    catch(err){
        console.log(`Error editing movie: ${err}`);
    }
} // end editMovie fn*

function* removeMovie(action) {
    try{
        const response = yield axios.delete(`api/movie/${action.payload.id}`, action.payload);
        console.log('delete response: ', response.data);
        
        //get movies
        yield put({ type: 'GET_MOVIES' });
    }
    catch(err){
        console.error(`Error removing movie =( ${err}`);
    }
} // end removeMovie fn*

// watcherSaga
function* movieSaga() {
    yield takeEvery('GET_MOVIES', getMovies);
    yield takeEvery('GET_TAGS', getTags);
    yield takeEvery('GET_ALL_MOVIES', getAllMovies);
    yield takeEvery('SEND_QUERY', sendQuery);
    yield takeEvery('ADD_TO_CATALOG', addToCatalog);
    yield takeEvery('FEATURE_MOVIE', featureMovie);
    yield takeEvery('CREATE_MOVIE', createMovie);
    yield takeEvery('UPDATE_MOVIE', updateMovie);
    yield takeEvery('REMOVE_MOVIE', removeMovie);
}

export default movieSaga;