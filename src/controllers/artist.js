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
}

module.exports = { newArtist }