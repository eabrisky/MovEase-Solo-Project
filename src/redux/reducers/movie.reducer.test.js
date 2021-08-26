import { expect, test } from '@jest/globals';
import { response } from 'express';
import movies from './movie.reducer';

describe('MOVIE REDUCER TESTS', () => {

    test('SET_MOVIES', () => {
        const action = {
            type: 'SET_MOVIES',
            payload: response.data
        }
        const state = [];
        expect(movies(state, action)).toEqual(response.data);
    })

    test('SET_ALL_MOVIES', () => {
        const action = {

        }
    })

}) // end describe