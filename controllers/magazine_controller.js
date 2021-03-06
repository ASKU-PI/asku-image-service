const Magazine = require('../models/magazine');
const logger = require('../utils/logger');

const addMagazinePhotos = (req, res) => {
  const magazineId = req.query.id;
  const photos = req.files.map(file => {
    return { url: file.path };
  });

  Magazine.exists({ id: magazineId }, (error, doc) => {
    if (error) {
      logger.log.error(
        'Checking if the image exists in database failed: ' + error,
      );
      res.status(400).send('Error saving to the database');
    } else {
      if (doc) {
        Magazine.findOneAndUpdate(
          { id: magazineId },
          { $push: { photos: photos } },
          { new: true },
          (error, success) => {
            if (error) {
              logger.log.error(
                'Updating the existing image in database failed: ' + error,
              );
              res.status(400).send('Error saving to the database');
            } else {
              res.send(success);
            }
          },
        );
      } else {
        Magazine.create(
          { id: magazineId, photos: photos },
          (error, success) => {
            if (error) {
              logger.log.error(
                'Creating new image in database failed: ' + error,
              );
              res.status(400).send('Error saving to the database');
            } else {
              res.send(success);
            }
          },
        );
      }
    }
  });
};

const getMagazinePhotos = (req, res) => {
  const magazineId = req.query.id;

  Magazine.findOne({ id: magazineId }, (error, magazine) => {
    if (error) {
      logger.log.error('Getting image from database failed: ' + error);
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
        logger.log.error('Removing image from database failed: ' + error);
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
