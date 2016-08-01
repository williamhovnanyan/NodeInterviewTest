var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.get('mongoose:url'), config.get('mongoose:options'));

module.exports = mongoose;
