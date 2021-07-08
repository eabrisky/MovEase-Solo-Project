const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get(`/all`, rejectUnauthenticated, (req, res) => {

    const queryText = `
    SELECT "movies".*,
    STRING_AGG("genres".name, ', ')
    AS genre,
    "movies_genres".genre_id
    FROM "movies"
    JOIN "movies_genres"
    ON "movies_genres".movie_id = "movies".id
    JOIN "genres"
    ON "genres".id = "movies_genres".genre_id
    GROUP BY 1, "movies_genres".genre_id;
    `;

    pool
        .query(queryText) // end .query
        .then(result => {
            // console.log('get all movies, result.rows: ', result.rows);
            res.send(result.rows);
        }) // end .then
        .catch(err => {
            console.error('CURSES! We could not retrieve all movies, my liege. ', err);
            res.sendStatus(500);
        }) // end .catch, end pool

}) // end .get

router.get('/:search', rejectUnauthenticated, (req, res) => {
    console.log('req.params: ', req.params);

    const queryText = `
    SELECT "movies".*,
    STRING_AGG("genres".name, ', ')
    AS genre,
    "movies_genres".genre_id,
    STRING_AGG("tags".name, ', ')
    AS tags
    FROM "movies"
    JOIN "movies_genres"
    ON "movies_genres".movie_id = "movies".id
    JOIN "genres"
    ON "genres".id = "movies_genres".genre_id
    JOIN "movies_tags"
    ON "movies_tags".movie_id = "movies".id
    JOIN "tags"
    ON "tags".id = "movies_tags".tag_id
    WHERE "movies".title = $1
    GROUP BY "movies".id, "movies_genres".genre_id;
    `;

    pool
        .query(queryText, [req.params.search]) // end .query
        .then(result => {
            res.send(result.rows);
        }) // end .then
        .catch(err => {
            console.error('BLAST IT ALL! We simply COULD not obtain that which we sought for thine search query, milord :/ ', err);
        }) // end .catch, end pool

}) // end .get search query

module.exports = router;