const edit = (state = {}, action) => {
    switch(action.type) {
        case 'EDIT_MOVIE':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default edit;