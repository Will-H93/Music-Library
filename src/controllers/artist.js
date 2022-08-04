const newArtist = (_, res) => {
    res.status(201).json({ message: "POST new artist" });
}

module.exports = { newArtist }