
module.exports = {
	// keep in sync with webpack styles below
	cssSrc: [".src/common/reset/reset.css"],
	stylSrc: ["./src/app.styl"],

	webpackStylesBootstrap: function() {
		// this bootstraps the Webpack hot-loading style compilation
		// using a try block because build output of this blows up in the browser
		// keep in sync with above
		try {
			require('./src/common/reset/reset.css');
			require('./src/app.styl');
		} catch (e) {}
	}
};

