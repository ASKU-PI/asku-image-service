const { rawListeners } = require('../models/profile');
const Profile = require('../models/profile');
const logger = require('./utils/logger');

const createOrUpdateProfilePicture = (req, res, next) => {
  const filePath = req.file.path;
  const userId = req.query.id;

  Profile.exists({ id: userId }, function (error, doc) {
    if (error) {
      logger.log.error(
        'Checking if the image exists in database failed: ' + error
      );
      res.status(400).send('Error saving to the database');
    } else {
      if (doc) {
        Profile.findOneAndUpdate(
          { id: userId },
          { photo: { url: filePath } },
          { new: true },
          function (error, success) {
            if (error) {
              logger.log.error(
                'Updating the existing image in database failed: ' + error
              );
              res.status(400).send('Error saving to the database');
            } else {
              res.send(success);
            }
          }
        );
      } else {
        Profile.create(
          { id: userId, photo: { url: filePath } },
          function (error, success) {
            if (error) {
              logger.log.error(
                'Creating new image in database failed: ' + error
              );
              res.status(400).send('Error saving to the database');
            } else {
              res.send(success);
            }
          }
        );
      }
    }
  });
};

const getProfilePicture = (req, res) => {
  const userId = req.query.id;

  Profile.findOne({ id: userId }, function (error, profile) {
    if (error) {
      logger.log.error('Getting image from database failed: ' + error);
      res.status(400).send('Error getting profile');
    } else {
      res.send(profile);
    }
  });
};

const deleteProfilePicture = (req, res, next) => {
  const userId = req.query.id;

  Profile.findOneAndRemove({ id: userId }, function (error) {
    if (error) {
      logger.log.error('Removing image from database failed: ' + error);
      res.status(400).send('Error removing file');
    } else {
      res.status(200).send('Removed');
    }
  });
};

module.exports = {
  createOrUpdateProfilePicture,
  getProfilePicture,
  deleteProfilePicture,
};
