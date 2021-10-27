const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = './uploads';
        console.log("DUPA")
        if (!fs.existsSync) {
            console.log("HEJ")
            fs.mkdirSync(path, { recursive: true })
        }
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

module.exports = upload;