var mongoose = require('../../lib/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var schema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    private: {
        type: Boolean,
        required: true,
        default: true
    },
    user_id: {
        type: Number,
        required: true
    },
    coordinates: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d',
        required: true
    }
});

schema.index(
    {
        "title": "text",
        "tags": "text"
    },
    {
        "weights": {
            "title": 5,
            "tags": 2
        }
    }
);

schema.statics.availableFields = {title: 1, url: 1, coordinates: 1, private: 1};

schema.methods.isPublic = function(attr) {
    return !this.private;
};


schema.plugin(autoIncrement.plugin, {
    model: 'Photo',
    field: 'id'
});


exports.Photo = mongoose.model('Photo', schema);
