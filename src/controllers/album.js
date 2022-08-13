const getDb = require('../services/db');

const newAlbum = async(req, res) => {
    const db = await getDb();
    const { artistId } = req.params
    const { album, year } = req.body;

    try {
    await db.query('INSERT INTO Album (album, year, artistId) VALUES (?, ?, ?)', [
        album,
        year,
        artistId
    ]);
    
    res.status(201).json({ message: "POST new album" });
    } catch (error) {
        
        res.status(500).json(error)
    }
    db.end();
};

const readAlbum = async(_, res) => {
    const db = await getDb();

    try { 
        const [albums] = await db.query('SELECT Album.id, Album.album, Album.year, Artist.name, Artist.genre FROM Album LEFT JOIN Artist ON Album.ArtistId = Artist.id');
        res.status(200).json(albums)
    } catch(error) {
        res.status(500).json(error);
    }
    db.end();
};

const readId = async(req, res) => {
    const db = await getDb();
    const { albumId } = req.params;
    const [[album]] = await db.query('SELECT Album.id, Album.album, Album.year, Artist.name, Artist.genre FROM Album LEFT JOIN Artist ON Album.ArtistId = Artist.id WHERE Album.id = ?', [
        albumId
    ]);
    console.log(album)
    if (album) {
        res.status(200).json(album); 
    } else {
        res.sendStatus(404)
    }
    db.end();
};

const update = async(req, res) => {
    const db = await getDb();
    const data = req.body;
    const { albumId } = req.params;
  
    try {
      const [
        { affectedRows },
      ] = await db.query('UPDATE Album SET ? WHERE id = ?', [
        data,
        albumId
        ]);
  
      if (!affectedRows) {
        res.sendStatus(404);
      } else {
        res.status(200).send('Record has been updated');
      }
    } catch (err) {
      res.sendStatus(500);
    }
    db.end();
};

const deleteFromAlbum = async(req, res) => {
    const db = await getDb();
    const { albumId } = req.params;
    const [ { affectedRows } ] = await db.query(`DELETE FROM Album WHERE id = ?`, [
        albumId
    ]);

    if (!affectedRows) {
        res.sendStatus(404);
    } else {
        res.status(200).send();
    }
    db.end();
};

module.exports = { newAlbum, readAlbum, readId, update, deleteFromAlbum }