
/*
 * Displays total distance, time, and leader's laps remaining at the top of the screen.
 */
var StatusBar = React.createClass({
	
	render: function() {
		return (
			<div>I am the status bar.<span>{this.props.laps_remaining}</span></div>
		);
	}
});