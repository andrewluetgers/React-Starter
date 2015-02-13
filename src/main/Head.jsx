
// The head component ONLY gets rendered server-side
var React = require('react'),
	PureRenderMixin = require('react').addons.PureRenderMixin;

module.exports = React.createClass({

	displayName: 'Head',

	mixins: [PureRenderMixin],

	render: function() {
		return (
			<head>
				<meta charSet="utf-8" />
				<title>{this.props.title}</title>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
				<meta name="apple-mobile-web-app-capable" content="yes"/>
				<meta name="mobile-web-app-capable" content="yes"/>
				<link rel="stylesheet" type="text/css" href={this.props.cssPath}></link>
			</head>
		);
	}
});
