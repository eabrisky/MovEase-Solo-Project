const edit = (state = {}, action) => {
    switch(action.type) {
        case 'MOVIE_TO_EDIT':
            console.log('edit reducer, movie to edit (action.payload: ', action.payload);
            
            return action.payload;
        default:
            return state;
    }
};

export default edit;