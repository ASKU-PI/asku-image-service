const express = require('express');
const eurekaClient = require('./config/eureka');
const uploader = require('./utils/uploader');
const logger = require('./utils/logger');
require('./config/mongo');

const app = express();
const port = 8892;

const profileController = require('./controllers/profile_controller');
const magazineController = require('./controllers/magazine_controller');

eurekaClient.start();

app.use('/uploads', express.static('uploads'));

app.post(
  '/profile',
  uploader.single('picture'),
  profileController.createOrUpdateProfilePicture,
);

app.get('/profile', profileController.getProfilePicture);

app.delete('/profile', profileController.deleteProfilePicture);

app.post(
  '/magazine',
  uploader.array('picture', 20),
  magazineController.addMagazinePhotos,
);

app.get('/magazine', magazineController.getMagazinePhotos);

app.delete('/magazine', magazineController.deleteMagazinePhoto);

app.listen(port, () => {
  logger.log.info(`ASKU Image Service listening at http://localhost:${port}`);
});
