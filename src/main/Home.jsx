/* @flow weak */

var React = require('react'),
	Title = require('react-document-title'),
	Link = require('react-router').Link,
	request = require('superagent');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			username: '',
			lastGistUrl: ''
		};
	},

	doRequest: function() {
		var self = this;
		console.log("foo");
		request.get("https://api.github.com/users/andrewluetgers/gists", function(res) {
			console.log(res);
			var lastGist = res.body[0];
			self.setState({
				username: lastGist.owner.login,
				lastGistUrl: lastGist.html_url
			});
		});
	},

	render: function() {
		return (
			<Title title='Home'>
				<div onClick={this.doRequest}>
					{this.state.username}'s last gist is
					<a href={this.state.lastGistUrl}>here</a>.
				</div>
			</Title>
		);
	}
});
