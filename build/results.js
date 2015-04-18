var React = require('react'),
	formatTime = require('./timer.js').formatTime;
	
var Results = React.createClass({displayName: "Results",
	render: function() {
		return (React.createElement("div", {id: "results"}, 
			React.createElement("h2", null, "---------- Results ----------"), 
			React.createElement("ol", null, 
				this.props.athletes.map(function(a, i) {
					return React.createElement("li", {key: a.name}, React.createElement("span", {className: "place"}, i+1), React.createElement("span", {className: "name"}, a.name), React.createElement("span", {className: "time"}, formatTime(a.start_time - this.props.start_time)))
				}.bind(this))
			)
		));
	}
});

module.exports = Results;