const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {

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
            console.log(`GET result: ${result.rows}`);
            res.send(result.rows);
        }) // end .then
        .catch(err => {
            console.error(`Aw SNAP, there's been a GET error: ${err}`);
            res.sendStatus(500);
        }) // end .catch, end pool

}); // end router.get

router.post('/', rejectUnauthenticated, (req, res) => {

    console.log(`Movie to create: ${req.body}`);
    const movie = req.body;

    const movieQuery = `
    INSERT INTO "movies" ("title", "image", "synopsis", "release_date", "user_id")
    VALUES ($1, $2, $3, $4, $5)
    ;`;

    if (req.isAuthenticated) {
        pool // movie query
            .query(movieQuery, [movie.title, movie.image, movie.synopsis, movie.release_date, req.user.id]) // end .query
            .then(result => {
                res.sendStatus(201);
                console.log(`Created movie: ${result.rows[0]}`);

                const genreQuery = `
                INSERT INTO "movies_genres" ("movie_id", "genre_id")
                VALUES ($1, $2)
                ;`;

                pool // genre query
                    .query(genreQuery, [movie.id, movie.genre]) // end .query
                    .then(result => {
                        res.sendStatus(201);
                    }) // end .then
                    .catch(err => {
                        res.sendStatus(500);
                        console.error(`Goodness gracious, there's been an issue adding that genre! ${error}`);
                    })

                const directorQuery = `
                INSERT INTO "movies_directors" ("movie_id", "director_id")
                VALUES ($1, $2)
                ;`;
                pool // director query
                    .query()
            }) // end .then
            .catch(err => {
                res.sendStatus(500);
                console.error(`Noooooo, we had trouble creating that movie =( ${err}`);
            }) // end .catch, end pool
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}); // end router.post

module.exports = router;