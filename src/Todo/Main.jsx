var React = require("react"),
	Actions = require("./Actions.js");

// Renders the todo list as well as the toggle all button
module.exports = React.createClass({

	propTypes: {
		list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	},

	toggleAll: function(evt) {
		Actions.toggleAllItems(evt.target.checked);
	},

	render: function() {

		var filteredList;

		switch(this.props.name){
			case 'all':
				filteredList = this.props.list;
				break;
			case 'completed':
				filteredList = _.filter(this.props.list,function(item){ return item.isComplete; });
				break;
			case 'active':
				filteredList = _.filter(this.props.list,function(item){ return !item.isComplete; });
		}

		var classes = React.addons.classSet({
			"hidden": this.props.list.length < 1
		});

		return (
			<section id="main" className={classes}>
				<input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul id="todo-list">
					{filteredList.map(function(item) {
						return <TodoItem label={item.label} isComplete={item.isComplete} key={item.key}/>;
					})}
				</ul>
			</section>
		);
	}
});
