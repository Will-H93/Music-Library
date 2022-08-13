const express = require('express');
const { newAlbum, readAlbum, readId, update, deleteFromAlbum } = require('../controllers/album');


const router = express.Router();

router.post('/artist/:artistId/album', newAlbum)
router.get('/album', readAlbum)
router.get('/album/:albumId', readId)
router.patch('/album/:albumId', update)
router.delete('/album/:albumId', deleteFromAlbum)

module.exports = router;