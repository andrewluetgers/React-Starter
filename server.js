var http = 				require('http'),
	path =				require('path'),
	express = 			require('express'),
	cors =				require('cors'), // used in support of webpack dev server
	log4js = 			require('log4js'),
	morgan = 			require('morgan'),
	favicon =			require("serve-favicon"),
	serveStatic =		require("serve-static"),
	compression = 		require('compression'),
	bodyParser =		require("body-parser"),
	session = 			require("express-session"),
	compression =		require('compression'),
	cookieParser = 		require("cookie-parser"),
	flash =				require('connect-flash'),
	package = 			require('./package.json');
	//_ =					require("lodash");

// config
var processTitle = 		"react-starter",
	port = 				process.env.PORT || 3000,
	appRoot = 			"/",
	staticDir = 		path.join(__dirname, '/build'),
	sessionStore = 		new session.MemoryStore(),
	rdb = {
		host: "localhost",
		port: 28015
	};

// logging setup
var logger = log4js.getLogger(),
	httpLogger = morgan("short", {
		stream: {
			write: function (str) { logger.debug(str); }
		}
	});


// server config
var app = express();
app.use(compression({threshold: 512}));
app.use(httpLogger);

// Serve a static directory for the webpack-compiled Javascript and CSS.
// Only in production since the webpack dev server handles this otherwise.
if (process.env.NODE_ENV !== "dev") {
	app.use(appRoot, serveStatic(staticDir));
	//app.use(favicon(staticDir + "assets/favicon.ico"));
}

app.use(cors());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

//app.use(cookieParser("sd;safklsad-ASDFAS@#%#$&$%#DKasdfljdsak"));
//app.use(session({
//	name: 		"sid",
//	secret: 	"sdlajflksKdj234lk23jl4",
//	cookie: 	{httpOnly: true, secure: true, maxAge: 1000 * 60 * 30},
//	store: 		sessionStore
//}));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());
//
//
//// rethinkDb connect
//r.connect(rdb, function(err, conn) {
//	if(err) {throw err;}
//	app.rdbConn = conn;
//});

// api routes
//require('./api/api.js')(app, passport);



// isometric features --------------------------------------------------------------------------
require('node-jsx').install({extension: '.jsx'});

var React = require('react'),
	Router = require('react-router'),
	UAParser = require('ua-parser-js'),
	ReactDocumentTitle = require('react-document-title'),
	routes = require('./src/routes.jsx'),
	Head = React.createFactory(require('./src/main/Head.jsx')),
	isDev = (process.env.NODE_ENV == "dev"),
	script = isDev
		? "http://localhost:3001/assets/"+package.name+".js" // use webpack hot-loading dev server
		: "/assets/"+package.name+".js";


// at this point all get requests return the app
app.get('/', function (req, res, next) {
	var parser = new UAParser(),
		ua = parser.setUA(req.headers['user-agent']).getResult(),
		head = React.renderToStaticMarkup(Head({
			// Resets the document title on each request
			// See https://github.com/gaearon/react-document-title#server-usage
			title: ReactDocumentTitle.rewind(),
			cssPath: isDev ? "" : "/assets/"+package.name+".css"
		}));

	// We customize the onAbort method in order to handle redirects
	var router = Router.create({
		routes: routes,
		location: req.path,
		onAbort: function defaultAbortHandler(abortReason, location) {
			if (abortReason && abortReason.to) {
				res.redirect(301, abortReason.to);
			} else {
				res.redirect(404, "404");
			}
		}
	});

	// react-router also runs on the server, handles all the routing and kicks back HTML
	router.run(function (Handler, state) {

		// this needs to match app.js render
		var content = React.renderToString(React.createElement(Handler, {
			routerState: state,
			deviceType: ua.device.type || "desktop",
			environment: "server"
		}), null);

		res.write('<html>');
		res.write(head);
		res.write('<body>');
		res.write(content);
		res.write('<script src="'+script+'"></script>');
		res.write('</body>');
		res.end();
	});


});
// ---------------------------------------------------------------------------------------------

app.listen(port);
console.log('process '+ processTitle +' started on port '+ port);
