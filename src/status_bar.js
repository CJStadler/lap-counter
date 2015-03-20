
/*
 * Displays total distance, time, and leader's laps remaining at the top of the screen.
 */
var StatusBar = React.createClass({
	
	render: function() {
		return (
			<div id="status-bar">
				<div className="info">{this.props.distance}</div>
				<Timer start_time={this.props.start_time} />
				<div className="laps">Laps: {this.props.laps_remaining}</div>
			</div>
		);
	}
});