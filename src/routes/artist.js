const express = require('express');
const { newArtist, readArtist, readId, update, deleteFromArtist } = require('../controllers/artist')

const router = express.Router();

router.post('/artist', newArtist)
router.get('/artist', readArtist)
router.get('/artist/:artistId', readId)
router.patch('/artist/:artistId', update)
router.delete('/artist/:artistId', deleteFromArtist)

module.exports = router;