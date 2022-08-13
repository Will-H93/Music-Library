const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read album', () => {
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
    [albums] = await db.query('SELECT Album.id, Album.album, Album.year, Artist.name, Artist.genre FROM Album LEFT JOIN Artist ON Album.ArtistId = Artist.id')
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.query('DELETE FROM Artist');
    await db.end();
  });

  describe('/album', () => {
    describe('GET', () => {
      it('returns all album records in the database and join the artist', async () => {
        const res = await request(app).get('/album').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((albumRecord) => {
          const expected = albums.find((a) => a.id === albumRecord.id);
          expect(albumRecord).to.deep.equal(expected);
        });
      });
    });
  });

  describe('/album/:albumId', () => {
    describe('GET', () => {
      it('returns a single album with the correct id', async () => {
        const expected = albums[0];
        const res = await request(app).get(`/album/${expected.id}`).send();

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(expected);
      });

      it('returns a 404 if the album is not in the database', async () => {
        const res = await request(app).get('/album/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });

});