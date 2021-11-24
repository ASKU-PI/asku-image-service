const Magazine = require('../models/magazine');

const addMagazinePhotos = (req, res) => {
  const magazineId = req.query.id;
  const photos = req.files.map(file => {
    return { url: file.path };
  });

  const callback = (error, success) => {
    if (error) {
      console.log(error);
      res.status(400).send('Error saving to the database');
    } else {
      res.send(success);
    }
  };

  Magazine.exists({ id: magazineId }, (error, doc) => {
    if (error) {
      console.log(error);
      res.status(400).send('Error saving to the database');
    } else {
      if (doc) {
        Magazine.findOneAndUpdate(
          { id: magazineId },
          { $push: { photos: photos } },
          { new: true },
          callback,
        );
      } else {
        Magazine.create({ id: magazineId, photos: photos }, callback);
      }
    }
  });
};

const getMagazinePhotos = (req, res) => {
  const magazineId = req.query.id;

  Magazine.findOne({ id: magazineId }, (error, magazine) => {
    if (error) {
      console.log(error);
      res.status(400).send('Error getting magazine');
    } else {
      res.send(magazine);
    }
  });
};

const deleteMagazinePhoto = (req, res) => {
  const magazineId = req.query.id;
  const photoId = req.query.photoId;

  Magazine.findOneAndUpdate(
    { id: magazineId },
    { $pull: { photos: { _id: photoId } } },
    error => {
      if (error) {
        console.log(error);
        res.status(400).send('Error removing file');
      } else {
        res.status(200).send('Removed');
      }
    },
  );
};

module.exports = {
  addMagazinePhotos,
  getMagazinePhotos,
  deleteMagazinePhoto,
};
