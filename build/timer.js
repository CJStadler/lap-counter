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
		this.setState({elapsed: this.getElapsed()});
	},
	componentDidMount: function() {
		this.interval = setInterval(this.tick, 100);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	render: function() {
		return (
			React.createElement("div", {className: "timer"}, this.state.elapsed)
		);
	}
});