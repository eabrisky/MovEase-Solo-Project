const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id/:user_id', rejectUnauthenticated, (req, res) => {

    if (req.user.id == req.params.user_id) {

        const queryText = `
            SELECT * FROM "movies"
            JOIN "user"
            ON "user".id = "movies".user_id
            WHERE "movies".user_id = "user".id
            ORDER BY "title" ASC;
        `;

        pool
            .query(queryText) // end .query
            .then(result => {
                // console.log(`GET result: ${result.rows}`);
                res.send(result.rows);
            }) // end .then
            .catch(err => {
                console.error(`Aw SNAP, there's been a GET error: ${err}`);
                res.sendStatus(500);
            }) // end .catch, end pool
    } else {
        // forbidden
        res.sendStatus(403);
    }

}); // end router.get

router.post('/', rejectUnauthenticated, (req, res) => {

    // console.log(`Movie to create: ${req.body}`);
    const movie = req.body;

    const movieQuery = `
        INSERT INTO "movies" ("title", "director", "image", "synopsis", "release_date", "user_id")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING "id";
    `;

    pool // movie query
        .query(movieQuery, [movie.title, movie.director, movie.image, movie.synopsis, movie.release_date, req.user.id]) // end .query
        .then(result => {
            res.sendStatus(201);
            // console.log(`Created movie: ${result.rows}`);

            // grab movie id after creating movie in db
            const createdMovieId = result.rows[0].id;

            const genreQuery = `
                INSERT INTO "movies_genres" ("movie_id", "genre_id")
                VALUES ($1, $2);
            `;

            pool // genre_id query
                // send created movie's id, as well as movie's genre_id
                .query(genreQuery, [createdMovieId, movie.genre_id]) // end .query
                .then(result => {

                }) // end .then
                .catch(err => {
                    console.error(`Goodness gracious, there's been an issue adding that genre! ${error}`);
                }) // end .catch, end genre_id pool

        }) // end .then
        .catch(err => {
            res.sendStatus(500);
            console.error(`Noooooo, we had trouble creating that movie =( ${err}`);
        }) // end .catch, end pool

}); // end router.post

module.exports = router;