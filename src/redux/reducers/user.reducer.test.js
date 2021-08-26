import userReducer from './user.reducer';

// test SET_USER

// test UNSET_USER

// test other action (default)

// test initial value

describe('USER REDUCER TESTS', () => {

    test('SET_USER', () => {
        const action = {
            type: 'SET_USER',
            payload: {
                id: 1
            }
        }
        const state = {};
        // run the user reducer, the user reducer returns either the action.payload , or a new object, or what the state was before
        // we wanna expect that whatever it returned will equal
        expect(userReducer(state, action)).toEqual({id : 1});
    })

    test('UNSET_USER', () => {
        const action = {
            type: 'UNSET_USER'
        }
        const state = {id: 1};
        expect(userReducer(state, action)).toEqual({});
    })

}) // end describe