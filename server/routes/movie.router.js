const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    //get
}); // end router.get

router.post('/', (req, res) => {

    console.log(req.body);

    const queryText = `
    INSERT INTO "movies" ("")
    VALUES ()
    `;

    pool
    .query(queryText, []) // end .query
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