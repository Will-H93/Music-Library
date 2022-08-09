// tests/artist-create.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
  let db;
  let artist;

  beforeEach(async () => {
    db = await getDb();
    await db.query("INSERT INTO Artist(name, genre) VALUES(?,?)", [
      "Paramore",
      "rock",
    ]);
    [[artist]] = await db.query("SELECT * FROM Artist");
  });

  afterEach(async () => {
    await db.query('DELETE FROM Artist')
    await db.query('DELETE FROM Album');
    await db.end();
  });

  describe('/artist/:artistId/album', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const artistId = artist.id;
        const res = await request(app).post(`/artist/${artistId}/album`).send({
          name: 'Innerspeaker',
          year: 2010,
        });
        
        expect(res.status).to.equal(201);

        const [[albumEntries]] = await db.query(
          `SELECT * FROM Album WHERE id = ?`, [
            artistId
          ]
        );

        expect(albumEntries.name).to.equal('Innerspeaker');
        expect(albumEntries.year).to.equal(2010);
      });
    });
  });
});