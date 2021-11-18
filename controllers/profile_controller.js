const { rawListeners } = require("../models/profile");
const Profile = require("../models/profile");

const createOrUpdateProfilePicture = (req, res, next) => {
  const filePath = req.file.path;
  const userId = req.query.id;

  Profile.exists({ id: userId }, function (err, doc) {
    if (err) {
      res.status(400).send("Error saving to the database");
    } else {
      if (doc) {
        Profile.findOneAndUpdate(
          { id: userId },
          { photo: { url: filePath } },
          { new: true },
          function (error, success) {
            if (error) {
              console.log(error);
              res.status(400).send("Error saving to the database");
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
              console.log(error);
              res.status(400).send("Error saving to the database");
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

  Profile.findOne({ id: userId }, function (err, profile) {
    if (err) {
      console.log(error);
      res.status(400).send("Error getting profile");
    } else {
      res.send(profile);
    }
  });
};

const deleteProfilePicture = (req, res, next) => {
  const userId = req.query.id;

  Profile.findOneAndRemove({ id: userId }, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send("Error removing file");
    } else {
      res.status(200).send("Removed");
    }
  });
}

module.exports = {
  createOrUpdateProfilePicture,
  getProfilePicture,
  deleteProfilePicture
};
