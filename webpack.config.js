var webpack = 		require('webpack'),
	path = 			require('path'),
	package =		require('./package.json');

var buildPath = path.join(__dirname, '/build/assets'),
	entrypoint = './src/app.jsx';


var devConfig = {
	cache: true,
	//devtool: 'eval',
	resolve: {extensions: ["", ".js",  ".jsx", ".css", ".styl"]},
	entry:  [
		"webpack-dev-server/client?http://localhost:3001",
		"webpack/hot/dev-server",
		entrypoint
	],
	output: {
		path: buildPath,
		filename: package.name+'.js',
		publicPath: 'http://localhost:3001/assets/'
	},
	devServer: {
		headers: {"Access-Control-Allow-Origin": "*"}
	},
	module: {loaders: [
		{test: /\.js$|\.jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'jsx?harmony']},
		{test: /\.styl$/, loaders: ["style", "css", "stylus"]},
		{test: /\.css$/, loaders: ["style", "css"]}
	]},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
		//new webpack.NoErrorsPlugin()
	]
};

// we let gulp take care of stylus on build
var buildConfig = {
	cache: true,
	devtool: 'source-map',
	resolve: {extensions: ["", ".js", ".jsx"]},
	entry: [entrypoint],
	output: {path: buildPath, filename: package.name+'.js'},
	module: {loaders: [
		{test: /\.js$|\.jsx$/, exclude: /node_modules/, loaders: ['jsx?harmony']},
	]},
	plugins: [
		new webpack.IgnorePlugin(/\.styl$|\.css$/),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	]
};

module.exports = {
	dev: devConfig,
	build: buildConfig
};
