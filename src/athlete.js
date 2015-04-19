var React = require('react'),
	Timer = require('./timer.js').timer;

var Athlete = React.createClass({
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
            <div onClick={this.props.lapCompleted.bind(null, this.props.i)} className={classes} >
                <div className="info">{this.props.athlete.hip_number}. {this.props.athlete.name}</div>
				<Timer started={this.props.started} start_time={this.props.start_time} />
                <div className="laps">To Go: {this.props.athlete.laps}</div>
            </div>
        );
    }
});

module.exports = Athlete;
