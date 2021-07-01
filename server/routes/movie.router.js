const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get all movies
router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = `
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
        WHERE "movies".user_id = $1
        GROUP BY "movies".id, "movies_genres".genre_id
        ORDER BY "title" ASC;
    `;

    pool
        .query(queryText, [req.user.id]) // end .query
        .then(result => {                // console.log(`GET result: ${result.rows}`);
            res.send(result.rows);
        }) // end .then
        .catch(err => {
            res.sendStatus(500);
            console.error(`Aw SNAP, there's been a GET error: ${err}`);
        }) // end .catch, end pool

}); // end router.get all

// get featured movie
router.get('/:id', rejectUnauthenticated, (req, res) => {

    const queryText = `
    SELECT "movies".*,
    STRING_AGG("genres".name, ', ')
    AS genre
    FROM "movies"
    JOIN "movies_genres"
    ON "movies_genres".movie_id = "movies".id
    JOIN "genres"
    ON "genres".id = "movies_genres".genre_id
    WHERE "movies".id = $1
    GROUP BY 1;
    `;

    pool
        .query(queryText, [req.params.id]) // end .query
        .then(result => {
            console.log('result.rows: ', result.rows);
            res.send(result.rows);
        }) // end .then
        .catch(err => {
            res.sendStatus(500);
            console.error(`CLARO QUE NO! We couldn't grab that ${err}`);
        }) // end .catch, end pool

}); // end router.get featured

// post new movie
router.post('/', rejectUnauthenticated, (req, res) => {

    const movie = req.body;
    console.log('movie to create: ', req.body);

    const movieQuery = `
        INSERT INTO "movies" ("title", "director", "image", "synopsis", "release_date", "user_id")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING "id";
    `;

    pool // movie query
        .query(movieQuery, [movie.title, movie.director, movie.image, movie.synopsis, movie.release_date, req.user.id]) // end .query
        .then(result => {
            res.sendStatus(201);
            console.log('created movie: ', result.rows);

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

                    const usersMoviesQuery = `
                    INSERT INTO "users_movies" ("user_id", "movie_id")
                    VALUES ($1, $2);
                    `;

                    pool
                        .query(usersMoviesQuery, [req.user.id, createdMovieId]) // end .query
                        .then(() => console.log(`users_movies table updated successfully!`)) // end .then
                        .catch((err) => {
                            console.error(`Ayyy Papiiiiiii! ${err}`);
                        }) // end .catch

                }) // end .then
                .catch(err => {
                    console.error(`Goodness gracious, there's been an issue adding that genre! ${err}`);
                }) // end .catch, end genre_id pool

        }) // end .then
        .catch(err => {
            res.sendStatus(500);
            console.error(`Noooooo, we had trouble creating that movie =( ${err}`);
        }) // end .catch, end pool

}); // end router.post

router.put('/:id', rejectUnauthenticated, (req, res) => {

    console.log('put req.params: ', req.params);
    console.log('put req.body: ', req.body);
    console.log('put req.user: ', req.user);

    const movie = req.body;

    const queryText = `
    UPDATE "movies"
    SET "title"=$1, "director"=$2, "image"=$3, "synopsis"=$4, "release_date"=$5, "user_id"=$6
    WHERE "movies".id=$7;
    `;

    pool
        .query(queryText, [movie.title, movie.director, movie.image, movie.synopsis, movie.release_date, req.user.id, movie.id])
        .then(result => {

            // const genreQuery =`
            // UPDATE "movies_genres"
            // SET "genre_id" = $1
            // WHERE "movie_id" = $2;
            // `;

            // console.log(result);

            // pool
            //     .query(genreQuery, [movie.genre, movie.id]) // end .query
            //     .then(() => res.sendStatus(200)) // end .then
            //     .catch(err => {
            //         console.log('put genre error: ', err);
            //     }) // end catch, end genre pool

            // OK
            res.sendStatus(200);

        }) // end .then
        .catch(err => {
            console.log('put error: ', err);
            res.sendStatus(500);
        }) // end .catch, end pool
}); // end router.put

router.delete('/:id', rejectUnauthenticated, (req, res) => {

    console.log(`
    You've made it to /api/movie/DELETE.
    req.params:`, req.params);

    console.log('router.delete req.user.id: ', req.user.id);


    if (req.user.id == req.params.user_id) {

        const queryText = `
        DELETE FROM "users_movies"
        WHERE "user_id"=$1
        `;

        pool
            .query(queryText, [req.user.id]) // end .query
            .then(() => res.sendStatus(200)) // end .then
            .catch((err) => {
                console.error(`ACK, WE COULDN'T REMOVE THAT FROM YOUR CATALOG!! ${err}`);
                res.sendStatus(500);
            }) // end .catch, end pool

    } else {
        // forbidden
        res.sendStatus(403);
    } // end if else

}); // end router.delete

module.exports = router;