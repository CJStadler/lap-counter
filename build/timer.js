var Timer = React.createClass({displayName: "Timer",
	getInitialState: function() {
		return {
			elapsed: 0
		};
	},
	getElapsed: function() {
		var elapsed = new Date().getTime() - this.props.start_time
		return Math.floor(elapsed / 1000);
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
	formatTime: function(seconds) {
		var formatted;
		// if less than a minute just show seconds, else show M:SS
		var minutes = Math.floor(seconds/60);
		if (minutes > 0) {
			var seconds = seconds%60;
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			formatted = minutes + ":" + seconds;
		} else {
			formatted = seconds + "";
		}
		return formatted
	},
	render: function() {
		return (
			React.createElement("div", {className: "timer"}, this.formatTime(this.state.elapsed))
		);
	}
});