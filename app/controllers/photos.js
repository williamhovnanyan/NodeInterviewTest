// load up the models
var User = require('../models/user').User;
var Photo = require('../models/photo').Photo;
var AuthPolicy = require('../policies/userPhotoAuthorizationPolicy');

exports.show = function(req, res) {
  var photo = Photo.findOne({'id': req.params.id}, Photo.availableFields, function(err, photo) {
    if(err)
      res.send(500, 'Error');

    // Throw not found also for private photos
    if(photo && AuthPolicy.isAuthorized(photo, req.user)) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(photo));
    } else {
      res.send(404, 'Not found');
    }
  });
};

exports.list = function(req, res) {
  // TODO: move search logic to Photo.search() static method
  var skip = req.params.offset || 0;
  var limit = req.params.limit || 10;
  var conditions = {};

  if(req.params.user_id && req.params.user_id != req.user.id) {
    conditions["user_id"] = req.params.user_id;
    conditions["private"] = false;
  } else {
    conditions["user_id"] = req.user.id;
  }

  if(req.params.q) {
    conditions["$text"] = {"$search": q};
  }
  if(req.params.longitude && req.params.latitude) {
    var maxDistance = req.params.distance || 10;
    maxDistance /= 6371;

    var coords = [];
    coords[0] = req.params.longitude;
    coords[1] = req.params.latitude;

    conditions["coordinates"] = {
      "$near": coords,
      "$maxDistance": maxDistance
    }
  }

  Photo.find(conditions)
      .select(Photo.availableFields)
      .skip(skip)
      .limit(limit)
      .exec(function(err, photos) {
        res.send(JSON.stringify(photos));
      });
};

exports.create = function(req, res) {
  //sanitize incoming data using Photo.availableFields and add to db
  res.send(200, 'OK');
};

exports.patch = function(req, res) {
  // check authorization policy with helper method
  //sanitize incoming data using Photo.availableFields and update in db
  res.send(200, 'OK');
};

exports.delete = function(req, res) {
  // check authorization policy with helper method and delete
  res.send(200, 'OK');
};
