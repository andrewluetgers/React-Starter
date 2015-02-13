/* @flow weak */

var React = require('react'),
	Title = require('react-document-title'),
	Link = require('react-router').Link;

module.exports = React.createClass({

	render: function() {
		return (
			<Title title='About'>
				<div>
					<h1>About</h1>
					<Link to='home'>foo</Link>
				</div>
			</Title>
		);
	}

});
