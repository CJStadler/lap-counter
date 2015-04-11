var React = require('react');

var Timer = React.createClass({displayName: "Timer",
	getInitialState: function() {
		return {
			elapsed: 0
		};
	},
	getElapsed: function() {
		var elapsed = new Date().getTime() - this.props.start_time
		return elapsed;
	},
	tick: function() {
		if (this.props.started) {
			this.setState({elapsed: this.getElapsed()});
		} else if (this.state.elapsed != 0) {
			this.setState({elapsed: 0});
		}
	},
	componentDidMount: function() {
		// rerender every 100ms
		this.interval = setInterval(this.tick, 100);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	render: function() {
		return (
			React.createElement("div", {className: "timer"}, formatTime(this.state.elapsed))
		);
	}
});

var formatTime = function(milliseconds) {
	var formatted;
	var seconds = milliseconds / 1000;
	var minutes = Math.floor(seconds/60);
	seconds = Math.floor(seconds%60);
	// if less than a minute just show seconds, else show M:SS
	if (minutes > 0) {
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		formatted = minutes + ":" + seconds;
	} else {
		formatted = seconds + "";
	}
	return formatted
}

module.exports = {timer: Timer, formatTime: formatTime};
