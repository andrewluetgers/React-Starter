/* @flow weak */

"use strict";

var React = require('react'),
	Router = require('react-router'),
	Handler = Router.RouteHandler,
	routes = require('./routes.jsx');

require('../styles.js').webpackStylesBootstrap();

console.log("app ----", this);

// Set a device type based on window width, so that we can write media queries in javascript
// by calling if (this.props.deviceType === "mobile")
var deviceType;

if (window.matchMedia("(max-width: 639px)").matches === true) {
	deviceType = "mobile";
} else if (window.matchMedia("(max-width: 768px)").matches === true) {
	deviceType = "tablet";
} else {
	deviceType = "desktop";
}

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
	React.render(<Handler routerState={state} deviceType={deviceType} environment="browser" />, document.body);
});
