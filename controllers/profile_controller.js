require('../models/profile');
const Profile = require('../models/profile');

const createOrUpdateProfilePicture = (req, res) => {
  const filePath = req.file.path;
  const userId = req.query.id;

  const callback = (error, success) => {
    if (error) {
      console.log(error);
      res.status(400).send('Error saving to the database');
    } else {
      res.send(success);
    }
  };

  Profile.exists({ id: userId }, (err, doc) => {
    if (err) {
      res.status(400).send('Error saving to the database');
    } else {
      if (doc) {
        Profile.findOneAndUpdate(
          { id: userId },
          { photo: { url: filePath } },
          { new: true },
          callback,
        );
      } else {
        Profile.create({ id: userId, photo: { url: filePath } }, callback);
      }
    }
  });
};

const getProfilePicture = (req, res) => {
  const userId = req.query.id;

  Profile.findOne({ id: userId }, (error, profile) => {
    if (error) {
      console.log(error);
      res.status(400).send('Error getting profile');
    } else {
      res.send(profile);
    }
  });
};

const deleteProfilePicture = (req, res) => {
  const userId = req.query.id;

  Profile.findOneAndRemove({ id: userId }, err => {
    if (err) {
      console.log(err);
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
