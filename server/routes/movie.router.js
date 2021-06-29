const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {

    const queryText = `
    SELECT * FROM "movies" ORDER BY "title" ASC;
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

router.post('/', (req, res) => {

    console.log(`Movie to create: ${req.body}`);
    const movie = req.body;

    const queryText = `
    INSERT INTO "movies" ("title", "image", "synopsis", "release_date")
    VALUES ($1, $2, $3, $4)
    `;

    pool
        .query(queryText, [movie.title, movie.image, movie.synopsis, movie.release_date]) // end .query
        .then(result => {
            res.sendStatus(201);
            console.log(`Created movie: ${result.rows}`);
        }) // end .then
        .catch(err => {
            res.sendStatus(500);
            console.error(`Noooooo, we had trouble creating that movie: ${err}`);
        }) // end .catch

}); // end router.post

module.exports = router;