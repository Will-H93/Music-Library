const getDb = require('../services/db');

const newAlbum = async(req, res) => {
    const db = await getDb();
    const { name, year } = req.body;

    try {
    await db.query('INSERT INTO Album (name, year) VALUES (?, ?)', [
        name,
        year
    ]);
    
    res.status(201).json({ message: "POST new album" });
    } catch (error) {
        
        res.status(500).json(error)
    }
    db.end();
};

module.exports = { newAlbum }