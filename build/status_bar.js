var Timer = require('./timer.js');

/*
 * Displays total distance, time, and leader's laps remaining at the top of the screen.
 */
var StatusBar = React.createClass({displayName: "StatusBar",
	render: function() {
		var timer;
		if (this.props.started) { // show timer
			timer = React.createElement(Timer, {started: this.props.started, start_time: this.props.start_time})
		} else { // show start button
			timer = React.createElement("div", {id: "start-button", onClick: this.props.startRace}, "START")
		}
		return (
			React.createElement("div", {id: "status-bar"}, 
				React.createElement("div", {className: "info", id: "undo", onClick: this.props.undo}, "Undo"), 
				timer, 
				React.createElement("div", {className: "laps"}, "Laps: ", this.props.laps_remaining)
			)
		);
	}
});

module.exports = StatusBar;