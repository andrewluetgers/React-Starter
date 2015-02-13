var React = require("react"),
	Reflux = require("reflux"),
	ListStore = require("./ListStore.js"),
	Header = require("./Header.jsx"),
	Footer = require("./Footer.jsx");


// Renders the full application
// activeRouteHandler will always be TodoMain, but with different 'showing' prop (all/completed/active)
module.exports = React.createClass({

	// this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
	mixins: [Reflux.connect(ListStore, "list")],

	render: function() {
		return (
			<div>
				<Header />
				<this.props.activeRouteHandler list={this.state.list} />
				<Footer list={this.state.list} />
			</div>
		);
	}
});
