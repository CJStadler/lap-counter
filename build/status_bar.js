
/*
 * Displays total distance, time, and leader's laps remaining at the top of the screen.
 */
var StatusBar = React.createClass({displayName: "StatusBar",
	
	render: function() {
		return (
			React.createElement("div", {id: "status-bar"}, 
				React.createElement("div", {className: "info"}, this.props.distance), 
				React.createElement(Timer, {start_time: this.props.start_time}), 
				React.createElement("div", {className: "laps"}, "Laps: ", this.props.laps_remaining)
			)
		);
	}
});