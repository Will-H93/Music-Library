const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update album', () => {
  let db;
  let albums;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Tame Impala',
        'rock',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Kylie Minogue',
        'pop',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Dave Brubeck',
        'jazz',
      ]),
    ]);

    const [[tame_impala]] = await db.query(
      'SELECT id FROM Artist WHERE name=?', [
        'Tame Impala'
      ]);
    const [[kylie]] = await db.query('SELECT id FROM Artist WHERE name=?', [
      'Kylie Minogue',
    ]);
    const [[dave]] = await db.query('SELECT id FROM Artist WHERE name=?', [
      'Dave Brubeck',
    ]);

    await Promise.all([
      db.query('INSERT INTO Album(album, year, artistId) VALUES(?,?,?)', [
        'Innerspeaker',
        2010,
        tame_impala.id,
      ]),
      db.query('INSERT INTO Album(album, year, artistId) VALUES(?,?,?)', [
        'light Years',
        2000,
        kylie.id,
      ]),
      db.query('INSERT INTO Album(album, year, artistId) VALUES(?,?,?)', [
        'Time Out',
        1995,
        dave.id,
      ]),
    ]);
    [albums] = await db.query('SELECT * FROM Album')
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album')
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/album/:albumId', () => {
    describe('PATCH', () => {
      it('updates a single artist with the correct id', async () => {
        const album = albums[0];
        const res = await request(app)
          .patch(`/album/${album.id}`)
          .send({ album: 'new name', year: 2022 });

        expect(res.status).to.equal(200);

        const [
          [newAlbumRecord],
        ] = await db.query('SELECT * FROM Album WHERE id = ?', [album.id]);

        expect(newAlbumRecord.album).to.equal('new name');
      });

      it('returns a 404 if the album is not in the database', async () => {
        const res = await request(app)
          .patch('/album/999999')
          .send({ album: 'new name' });

        expect(res.status).to.equal(404);
      });
    });
  });
});