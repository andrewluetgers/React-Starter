var fs = 				require('fs'),
	gulp =				require('gulp'),
	gutil = 			require('gulp-util'),
	plumber = 			require('gulp-plumber'),
	notify = 			require('gulp-notify'),
	sourcemaps = 		require('gulp-sourcemaps'),
	stylus =			require('gulp-stylus'),
	addSrc =			require('gulp-add-src'),
	concat =			require('gulp-concat'),
	minifyCss =			require('gulp-minify-css'),
	//rename = 			require("gulp-rename"),
	rimraf =			require('gulp-rimraf'),
	package = 			require('./package.json'),
	styles = 			require('./styles'),

// webpack for js build and live-coding
	webpack = 			require('webpack'),
	WebpackDevServer = 	require('webpack-dev-server'),
	webpackConfig = 	require('./webpack.config');


var build =		'./build',
	assets =	'/assets',
	dest =		build + assets,
	stylSrc =	styles.stylSrc,
	cssSrc =	styles.cssSrc,
	copySrc =	['./src/*.html', './src/assets/*'],
	opts = 		{errorHandler: notify.onError("Error: <%= error.message %>")},
	devPort = 	3001,
	statsCfg = {
		colors: true,
		hash: true,
		timings: true,
		assets: true,
		chunks: false,
		chunkModules: true,
		modules: false,
		children: true
	};


function notifyError(err) {
	if (!err) { return; }
	gutil.log(err.message);
	gutil.beep();
	notifier.notify({
		title: 'Error: ' + package.name,
		message: err.message
	});
}

gulp.task('webpack-build', ['clean'], function(callback) {
	webpack(webpackConfig.build, function(err, stats) {
		if (err) {return notifyError(err);}
		gutil.log("webpack-build:", stats.toString(statsCfg));
		callback();
	});
});

gulp.task("webpack-dev-server", function(callback) {

	var compiler = webpack(webpackConfig.dev, function(err, stats) {
		if (err) {return notifyError(err);}
		gutil.log("webpack-build:", stats.toString(statsCfg));
		setTimeout(function() {
			console.log("----------------------- hot load server ----------------------------");
			console.log("If styles do not load save a change to trigger recompilation.");
			console.log("--------------------------------------------------------------------");
		}, 2000);
	});

	new WebpackDevServer(compiler, {
		contentBase: 	'http://localhost:' + devPort,
		publicPath: 	'http://localhost:' + devPort + assets + '/',
		noInfo:			true,
		hot: 			true,
		headers: 		{"Access-Control-Allow-Origin": "*"},
		stats: 			{colors: true}
	}).listen(devPort, 'localhost', function (err, result) {
		if (err) {throw new gutil.PluginError("webpack-dev-server", err);}
		gutil.log('Webpack dev-server listening at localhost:' + devPort);
	});
});




gulp.task('styl', function() {
	gulp.src(stylSrc)
		.pipe(plumber(opts))
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(addSrc(cssSrc))
		.pipe(sourcemaps.write('.'))
		.pipe(minifyCss({keepBreaks:true}))
		.pipe(concat(package.name+".css"))
		//.pipe(rename(package.name+".css"))
		.pipe(gulp.dest(dest));
});

gulp.task('copy', function() {
	return gulp.src(copySrc)
		.pipe(plumber(opts))
		.pipe(gulp.dest(build));
});

gulp.task('clean', function(cb) {
	return gulp.src([build+'/*', build + assets + '/*'], {read: false})
		.pipe(plumber(opts))
		.pipe(rimraf());
});

gulp.task('watch', function() {
	gulp.watch(copySrc, ['copy']);
});

gulp.task('default', ['clean', 'copy', 'styl', 'webpack-build']);

gulp.task('dev', ['clean', 'copy', 'webpack-dev-server', 'watch']);
