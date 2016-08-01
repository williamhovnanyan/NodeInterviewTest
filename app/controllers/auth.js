exports.login = function(req, res) {
    res.render('index');
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/login');
};
