const express = require('express');
const { newArtist, readArtist, artistId } = require('../controllers/artist')

const router = express.Router();

router.post('/artist', newArtist)
router.get('/artist', readArtist)
router.get('/artist/:id', artistId)

module.exports = router;