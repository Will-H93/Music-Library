const express = require('express');
const { newArtist } = require('../controllers/artist')

const router = express.Router();

router.post('/artist', newArtist)

module.exports = router;