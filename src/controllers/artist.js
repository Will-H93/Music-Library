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

const readId = async(req, res) => {
    const db = await getDb();
    const { artistId } = req.params;
    const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
        artistId
    ]);
    if (artist) {
        res.status(200).json(artist); 
    } else {
        res.sendStatus(404)
    }
    db.end();
};

const update = async(req, res) => {
    const db = await getDb();
    const data = req.body;
    const { artistId } = req.params;
  
    try {
      const [
        { affectedRows },
      ] = await db.query('UPDATE Artist SET ? WHERE id = ?', [
        data,
        artistId
        ]);
  
      if (!affectedRows) {
        res.sendStatus(404);
      } else {
        res.status(200).send();
      }
    } catch (err) {
      res.sendStatus(500);
    }
    db.end();
};

module.exports = { newArtist, readArtist, readId, update }