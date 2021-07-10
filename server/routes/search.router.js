const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get(`/all`, rejectUnauthenticated, (req, res) => {

    const queryText = `
    SELECT "movies".*,
    "genres".name
    AS genre,
    "movies_genres".genre_id,
    "tags".name
    AS tags
    FROM "movies"
    JOIN "movies_genres"
    ON "movies_genres".movie_id = "movies".id
    JOIN "genres"
    ON "genres".id = "movies_genres".genre_id
    JOIN "user"
    ON "user".id = "movies".user_id
    JOIN "users_movies"
    ON "users_movies".user_id = "movies".user_id
    JOIN "movies_tags"
    ON "movies_tags".movie_id = "movies".id
    JOIN "tags"
    ON "tags".id = "movies_tags".tag_id
    GROUP BY "movies".id, "movies_genres".genre_id, "genres".name, "tags".name
    ORDER BY "title" ASC;
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

router.post('/', rejectUnauthenticated, (req, res) => {

    const movie = req.body;
    console.log('movie to add to catalog: ', req.body);

    const movieQuery = `
    INSERT INTO "users_movies" ("user_id", "movie_id")
    VALUES ($1, $2)
    RETURNING "id";
    `;

    pool // movie query
        .query(movieQuery, [req.user.id, movie.id]) // end .query
        .then(() => {res.sendStatus(201)}) // end .then
        .catch((err) => {
            console.error('AW BRUSSEL SPROUTS, error encountered while posting to users_movies: ', err);
            res.sendStatus(500);
        }) // end .catch, end movie query pool
    
}) // end .post

module.exports = router;