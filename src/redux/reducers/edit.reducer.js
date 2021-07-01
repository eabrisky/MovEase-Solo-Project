const edit = (state = {}, action) => {
    switch(action.type) {
        case 'MOVIE_TO_EDIT':
            return action.payload;
        case 'EDIT_MOVIE':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default edit;