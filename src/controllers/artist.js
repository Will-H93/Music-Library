const getDb = require('../services/db');

const newArtist = async(_, res) => {
    
    const db = await getDb();
    const { name, genre } = res.body;

    try {
    await db.query(`INSERT INTO Artist (name, genre) VALUES ('${name}', '${genre}');`);
    db.end();
    return res.status(201).json({ message: "POST new artist" });
    } catch (error) {
        db.end();
        return res.status(500).json({ message: "error" })
    }
}

module.exports = { newArtist }