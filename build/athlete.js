var React = require('react'),
	Timer = require('./timer.js').timer;

var Athlete = React.createClass({displayName: "Athlete",
    render: function() {
        var classes = "athlete";
		
		// Check if approaching bell or in last lap
        if (this.props.athlete.laps == 1) {
            classes += " bell";
        } else if (this.props.athlete.laps < 1) {
            classes += " finishing";
        }
		
		// Check if lapped or is leader
		var diff = this.props.athlete.laps - this.props.leader.laps;
		if (diff > 1 || (diff > 0 && this.props.athlete.start_time > this.props.leader.start_time)) {
			classes += " lapped";
		} else if (this.props.leader && this.props.leader.hip_number == this.props.athlete.hip_number) {
			classes += " leader";
		}
		
        return (
            React.createElement("div", {onClick: this.props.lapCompleted.bind(null, this.props.i), className: classes}, 
                React.createElement("div", {className: "info"}, this.props.athlete.hip_number, ". ", this.props.athlete.name), 
				React.createElement(Timer, {started: this.props.started, start_time: this.props.start_time}), 
                React.createElement("div", {className: "laps"}, "To Go: ", this.props.athlete.laps)
            )
        );
    }
});

module.exports = Athlete;
