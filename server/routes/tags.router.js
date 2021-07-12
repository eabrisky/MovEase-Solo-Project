const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    console.log('tags router req.params: ', req.params);
    console.log('req.body: ', req.body);

    const queryText = `
    SELECT "tags".*
    FROM "tags"
    JOIN "movies_tags"
    ON "movies_tags".tag_id = "tags".id
    WHERE "movies_tags".movie_id = $1;
    `;

    pool
        .query(queryText, [req.params.id]) // end .query
        .then(result => {
            console.log('tags router result.rows: ', result.rows);
            
            res.send(result.rows);
        }) // end .then
        .catch(err => {
            console.error('Fiddlesticks, there was a problem getting those tags! ', err);
            res.sendStatus(500);
        }) // end .catch, end pool

}); // end router.get

module.exports = router;