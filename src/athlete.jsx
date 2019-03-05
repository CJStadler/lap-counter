var React = require('react'),
	Timer = require('./timer.jsx').timer;

var Athlete = React.createClass({
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
            <div onClick={this.props.lapCompleted.bind(null, this.props.i)} className={classes} >
                <div className="info">{this.props.athlete.hip_number}. {this.props.athlete.name}</div>
				<Timer started={this.props.started} start_time={this.props.start_time} />
                <div className="laps">To Go: {this.props.athlete.laps}</div>
            </div>
        );
    }
});

module.exports = Athlete;
