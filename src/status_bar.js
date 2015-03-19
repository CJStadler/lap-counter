
/*
 * Displays total distance, time, and leader's laps remaining at the top of the screen.
 */
var StatusBar = React.createClass({
	
	render: function() {
		return (
			<div>I am the status bar.
				<Timer start_time={this.props.start_time} />
				<div>Laps Remaining: {this.props.laps_remaining}</div>
			</div>
		);
	}
});