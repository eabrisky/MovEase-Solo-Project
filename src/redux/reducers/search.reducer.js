const allMovies = (state = [], action) => {
    switch(action.type) {
        case 'SET_ALL_MOVIES':
            return action.payload;
        default:
            return state;
    }
};

export default allMovies;