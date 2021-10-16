const express = require('express');
const eurekaClient = require('./eureka');
const uploader = require('./uploader');
const mongo = require('./mongo')

const Magazine = require('./models/magazine');
const Profile = require('./models/profile');
const e = require('express');

const app = express();
const port = 8892;

eurekaClient.start()

app.use('/uploads', express.static('uploads'));

app.post('/profile', uploader.single('picture'), function (req, res, next) {
    const filePath = req.file.path
    const userId = req.query.id

    Profile.exists({id: userId}, function (err, doc) {
        if (err) {
            res.status(400).send("Error saving to the database");
        } else {
            if (doc) {
                Profile.findOneAndUpdate(
                    {id: userId},
                    {photo: {url: filePath}},
                    {new: true},
                    function (error, success) {
                        if (error) {
                            res.status(400).send("Error saving to the database");
                        } else {
                            res.send("File uploaded successfully");
                        }
                    });
            } else {
                Profile.create({id: userId, photo: {url: filePath}}, function (error, success) {
                    if (error) {
                        res.status(400).send("Error saving to the database");
                    } else {
                        res.send("File uploaded successfully");
                    }
                });
            }
        }
    });
});

app.post('/magazine', uploader.array('picture', 15), function (req, res, next) {
    const magazineId = req.query.id;
    const photos = req.files.map((file) => {
        return {url: file.path}
    });

    Magazine.exists({id: magazineId}, function (err, doc) {
        if (err) {
            res.status(400).send("Error saving to the database");
        } else {
            if (doc) {
                Magazine.findOneAndUpdate(
                    {id: magazineId},
                    {$push: {photos: photos}},
                    {new: true},
                    function (error, success) {
                        if (error) {
                            res.status(400).send("Error saving to the database");
                        } else {
                            res.send(success);
                        }
                    }
                );
            } else {
                Magazine.create({id: magazineId, photos: photos}, function (error, success) {
                    if (error) {
                        res.status(400).send("Error saving to the database");
                    } else {
                        res.send(success);
                    }
                });
            }
        }
    });
})

app.get('/profile', function (req, res) {
    const userId = req.query.id;

    Profile.findOne({id: userId}, function (err, profile) {
        if (err) {
            res.status(400).send("Error getting profile");
        } else {
            res.send(profile);
        }
    })
});

app.get('/magazine', function (req, res) {
    const magazineId = req.query.id;

    Magazine.findOne({id: magazineId}, function (err, magazine) {
        if (err) {
            res.status(400).send("Error getting magazine");
        } else {
            res.send(magazine);
        }
    })
});

app.listen(port, () => {
    console.log(`ASKU Image Service listening at http://localhost:${port}`)
})

