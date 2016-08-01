var checkAuth = require('../middleware/checkAuth');
var usersController = require('../app/controllers/users');
var photosController = require('../app/controllers/photos');
var authController = require('../app/controllers/auth');

module.exports = function(app, passport) {
  // User routes
  app.get('/', checkAuth, usersController.show);

  // Photo routes
  app.get('/users/:user_id/photos', checkAuth, photosController.list);
  app.get('/photos', checkAuth, photosController.list);
  app.get('/photos/:id', checkAuth, photosController.show);

  // TODO: implement crud actions
  app.post('/photos', checkAuth, photosController.create);
  app.delete('/photos/:id', checkAuth, photosController.delete);
  app.patch('/photos/:id', checkAuth, photosController.patch);

  // Authentication routes
  app.get('/login', authController.login);
  app.get('/logout', authController.logout);
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

};
