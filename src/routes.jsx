/* @flow weak */

var React = require('react'),
	Route = require('react-router').Route,
	NotFoundRoute = require('react-router').NotFoundRoute;
	DefaultRoute = require('react-router').DefaultRoute;
	Redirect = require('react-router').Redirect;

module.exports = (
	<Route handler={require('./main/App')}>

		<DefaultRoute name="home" handler={require('./main/Home')}/>
		<Route name="about" handler={require('./main/About')}/>
		<Redirect from="foo" to="about"/>

		<Route name="todo" handler={require('./Todo/App')}>
			<Route name="all" handler={require('./Todo/Main')} />
			<Route name="completed" handler={require('./Todo/Main')} />
			<Route name="active" handler={require('./Todo/Main')} />
		</Route>

		<NotFoundRoute handler={require('./common/NotFound')}/>

	</Route>
);

