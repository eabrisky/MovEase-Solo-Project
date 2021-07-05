const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get(`/dogs`, rejectUnauthenticated, (req, res) => {

    // const searchQuery = `
    // SELECT "movies".*,
    // STRING_AGG ("genres".name, ', ')
    // AS genre,
    // "movies_genres".genre_id
    // FROM "movies"
    // JOIN "movies_genres"
    // ON "movies_genres".movie_id = "movies".id
    // JOIN "genres"
    // ON "genres".id = "movies_genres".genre_id
    // JOIN "user"
    // ON "user".id = "movies".user_id
    // GROUP BY "movies".id, "movies_genres".genre_id
    // ORDER BY "title" ASC;
    // `;

    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);
    
    
    

    const searchQuery = `
    SELECT "movies".*,
    STRING_AGG ("genres".name, ', ')
    AS genre,
    "movies_genres".genre_id
    FROM "movies"
    JOIN "movies_genres"
    ON "movies_genres".movie_id = "movies".id
    JOIN "genres"
    ON "genres".id = "movies_genres".genre_id
    JOIN "user"
    ON "user".id = "movies".user_id
    WHERE "movies".name ~~ '%$1%'
    GROUP BY "movies".id, "movies_genres".genre_id
    ORDER BY "title" ASC;
    `;

    pool
        .query(searchQuery, req.params) // end .query
        .then(response => {
            console.log('searchQuery: ', response.data);
            res.send(response.data);
        }) // end .then
        .catch(err => {
            console.error('Problem with search query: ', err);
            res.sendStatus(500);
        }) // end .catch, end pool

}) // end .get

module.exports = router;