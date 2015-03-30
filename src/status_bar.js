var Timer = require('./timer.js');

/*
 * Displays total distance, time, and leader's laps remaining at the top of the screen.
 */
var StatusBar = React.createClass({
	render: function() {
		var timer;
		if (this.props.started) { // show timer
			timer = <Timer started={this.props.started} start_time={this.props.start_time} />
		} else { // show start button
			timer = <div id="start-button" onClick={this.props.startRace}>START</div>
		}
		return (
			<div id="status-bar">
				<div className="info" id="undo" onClick={this.props.undo} >Undo</div>
				{timer}
				<div className="laps">Laps: {this.props.laps_remaining}</div>
			</div>
		);
	}
});

module.exports = StatusBar;