var Timer = require('./timer.js');

var Athlete = React.createClass({displayName: "Athlete",
    render: function() {
        var classes = "athlete";
        if (this.props.athlete.laps == 1) {
            classes += " bell";
        } else if (this.props.athlete.laps < 1) {
            classes += " finished";
        }
		if (this.props.leader) {
			classes += " leader";
		}
        return (
            React.createElement("div", {onClick: this.props.lapCompleted.bind(this, this.props.i), className: classes}, 
                React.createElement("div", {className: "info"}, this.props.athlete.hip_number, ". ", this.props.athlete.name), 
				React.createElement(Timer, {started: this.props.started, start_time: this.props.start_time}), 
                React.createElement("div", {className: "laps"}, "To Go: ", this.props.athlete.laps)
            )
        );
    }
});

module.exports = Athlete;
