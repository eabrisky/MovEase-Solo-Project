const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get all user movies
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

    pool // 
        .query(queryText, [req.user.id]) // end .query
        .then(result => {
            // console.log('GET result: ', result.rows);
            res.send(result.rows);
        }) // end .then
        .catch(err => {
            console.error(`Aw SNAP, there's been a GET error: ${err}`);
            res.sendStatus(500);
        }) // end .catch, end pool

}); // end router.get all

// get featured movie
router.get('/:id', rejectUnauthenticated, (req, res) => {

    console.log('req.params.id: ', req.params.id);
    

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
    WHERE "movies".id = $1
    GROUP BY 1, "movies_genres".genre_id;
    `;

    pool // movies & genres query
        .query(queryText, [req.params.id]) // end .query
        .then(result => {
            console.log('result.rows: ', result.rows);
            res.send(result.rows);
        }) // end .then
        .catch(err => {
            console.error(`CLARO QUE NO! We couldn't grab that ${err}`);
            res.sendStatus(500);
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

            pool // "movies_genres".genre_id query
                // send created movie's id, as well as movie's genre_id
                .query(genreQuery, [createdMovieId, movie.genre_id]) // end .query
                .then(result => {

                    const usersMoviesQuery = `
                    INSERT INTO "users_movies" ("user_id", "movie_id")
                    VALUES ($1, $2);
                    `;

                    console.log('users_movies query createdMovieId: ', createdMovieId);
                    
                    console.log('users_movies query req.user: ', req.user);
                    
                    pool // users_movies query
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
            console.error(`Noooooo, we had trouble creating that movie =( ${err}`);
            res.sendStatus(500);
        }) // end .catch, end pool

}); // end router.post

router.put('/:id', rejectUnauthenticated, (req, res) => {

    console.log('put req.params: ', req.params);
    console.log('put req.body: ', req.body);
    console.log('put req.user: ', req.user);

    const movie = req.body;

    const moviesQuery = `
    UPDATE "movies"
    SET "title"=$1, "director"=$2, "image"=$3, "synopsis"=$4, "release_date"=$5, "user_id"=$6
    WHERE "movies".id=$7;
    `;

    pool // movies query
        .query(moviesQuery, [movie.title, movie.director, movie.image, movie.synopsis, movie.release_date, req.user.id, movie.id])
        .then(result => {

            console.log('put route genre query req.body/movie: ', movie);

            const genreQuery =`
            UPDATE "movies_genres"
            SET "genre_id" = $1
            WHERE "movie_id" = $2;
            `;

            pool // movies_genres query
                .query(genreQuery, [movie.genre_id, movie.id]) // end .query
                .then(() => console.log('Genre update successful!')) // end .then
                .catch(err => {
                    console.log('put genre error: ', err);
                }) // end catch, end genre pool

            // OK
            res.sendStatus(200);

        }) // end .then
        .catch(err => {
            console.log('put error: ', err);
            res.sendStatus(500);
        }) // end .catch, end pool
}); // end router.put

router.delete('/:id', rejectUnauthenticated, (req, res) => {

    console.log('req.params (movie id): ', req.params);

    console.log('router.delete req.user.id: ', req.user.id);

    const queryText = `
        DELETE FROM "users_movies"
        WHERE "user_id"=$1
        AND "movie_id"=$2;
    `;

    pool // users_movies query
        .query(queryText, [req.user.id, req.params.id]) // end .query
        .then(result => {

            const moviesQuery = `
            UPDATE "movies"
            SET "user_id"=$1
            WHERE "user_id"=$2
            AND "id"=$3;
            `;

            pool // movies query
                .query(moviesQuery,[null, req.user.id, req.params.id]) // end .query
                .then(response => {
                    console.log(`"movies".user_id successfully removed`);
                    res.sendStatus(200);
                }) // end .then
                .catch(err => {
                    console.error(`Balderdash, we just really couldn't remove that user_id from the "movies" table...`, err);
                }) // end .catch, end movies pool

        }) // end .then
        .catch((err) => {
            console.error(`ACK, WE COULDN'T REMOVE THAT FROM YOUR CATALOG!! `, err);
            res.sendStatus(500);
        }) // end .catch, end pool

}); // end router.delete

module.exports = router;