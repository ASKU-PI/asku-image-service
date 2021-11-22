const Magazine = require("../models/magazine");

const addMagazinePhotos = (req, res, next) => {
  const magazineId = req.query.id;
  const photos = req.files.map((file) => {
    return { url: file.path };
  });

  Magazine.exists({ id: magazineId }, function (err, doc) {
    if (err) {
      console.log(err);
      res.status(400).send("Error saving to the database");
    } else {
      if (doc) {
        Magazine.findOneAndUpdate(
          { id: magazineId },
          { $push: { photos: photos } },
          { new: true },
          function (error, success) {
            if (error) {
              console.log(err);
              res.status(400).send("Error saving to the database");
            } else {
              res.send(success);
            }
          }
        );
      } else {
        Magazine.create(
          { id: magazineId, photos: photos },
          function (error, success) {
            if (error) {
              console.log(err);
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

const getMagazinePhotos = (req, res) => {
  const magazineId = req.query.id;

  Magazine.findOne({ id: magazineId }, function (err, magazine) {
    if (err) {
      console.log(err);
      res.status(400).send("Error getting magazine");
    } else {
      res.send(magazine);
    }
  });
};

const deleteMagazinePhoto = (req, res, next) => {
  const magazineId = req.query.id;
  const photoId = req.query.photoId;

  Magazine.findOneAndUpdate(
    { id: magazineId },
    { $pull: { photos: { _id: photoId } } },
    function (err) {
      if (err) {
        console.log(err);
        res.status(400).send("Error removing file");
      } else {
        res.status(200).send("Removed");
      }
    }
  );
};

module.exports = {
  addMagazinePhotos,
  getMagazinePhotos,
  deleteMagazinePhoto,
};
