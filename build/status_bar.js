
/*
 * Displays total distance, time, and leader's laps remaining at the top of the screen.
 */
var StatusBar = React.createClass({displayName: "StatusBar",
	
	render: function() {
		return (
			React.createElement("div", null, "I am the status bar.", 
				React.createElement(Timer, {start_time: this.props.start_time}), 
				React.createElement("div", null, "Laps Remaining: ", this.props.laps_remaining)
			)
		);
	}
});