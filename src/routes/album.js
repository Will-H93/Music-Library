const express = require('express');
const { newAlbum, readAlbum, readId, update } = require('../controllers/album');


const router = express.Router();

router.post('/artist/:artistId/album', newAlbum)
router.get('/album', readAlbum)
router.get('/album/:albumId', readId)
router.patch('/album/:albumId', update)

module.exports = router;