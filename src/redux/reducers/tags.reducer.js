const tags = (state = [], action) => {
    switch(action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
};

export default tags;