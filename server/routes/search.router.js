const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get(`/`, rejectUnauthenticated, (req, res) => {

    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);

}) // end .get

module.exports = router;