const express = require('express');
const { newAlbum } = require('../controllers/album');


const router = express.Router();

router.post('/artist/:artistId/album', newAlbum)

module.exports = router;