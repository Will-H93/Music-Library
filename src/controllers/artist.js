const getDb = require('../services/db');

const newArtist = async(req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;

    try {
    await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
        name,
        genre
    ]);
    
    res.status(201).json({ message: "POST new artist" });
    } catch (error) {
        
        res.status(500).json(error)
    }
    db.end();
};

const readArtist = async(_, res) => {
    const db = await getDb();

    try { 
        const [artists] = await db.query('SELECT * FROM Artist');
        res.status(200).json(artists)
    } catch(error) {
        res.status(500).json(error);
    }
    db.end();
};

const artistId = async(req, res) => {
    const db = await getDb();
    const { id } = req.params;
    const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
        id
    ]);
    if (artist) {
        res.status(200).json(artist); 
    } else {
        res.sendStatus(404)
    }
    db.end();
};

module.exports = { newArtist, readArtist, artistId }