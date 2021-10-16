const mongoose = require('mongoose');
const {Schema} = mongoose;

const Magazine = new Schema({
    id: {type: Number, required: true},
    photos: [{url: String}]
});

module.exports = mongoose.model('Magazine', Magazine);