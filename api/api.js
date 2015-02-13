module.exports = function(app, passport) {


	// rate limit this endpoint as it is a source of DOS attack
	app.post('/api/login', function(req, res) {
		// todo: login
		res.json({message: req.flash('loginMessage')});
	});

	// rate limit this endpoint as it is a source of DOS attack
	app.post('/api/signup', function(req, res) {
		// todo: signup
		res.json({message: req.flash('signupMessage')});
	});

	app.get('/api/profile', isLoggedIn, function(req, res) {
		res.json({
			user: req.user
		});
	});

	app.get('/api/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()) {
			return next();
		}

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
};


