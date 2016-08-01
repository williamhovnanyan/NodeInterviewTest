var mongoose = require('../../lib/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var schema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        default: 0
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    },
    fb_id: {
        type: Number,
        unique: true,
        required: true
    }
});

// schema.methods.aaa = function(attr) {
//
// };

schema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id'
});

exports.User = mongoose.model('User', schema);
