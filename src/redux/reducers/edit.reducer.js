const edit = (state = {}, action) => {
    switch(action.type) {
        case 'EDIT_MOVIE':
            console.log(action.payload);
            return {movieId: action.payload};
        default:
            return state;
    }
};

export default edit;