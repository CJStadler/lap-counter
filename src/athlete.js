
var Athlete = React.createClass({
    render: function() {
        var classes = "athlete";
        if (this.props.athlete.laps == 1) {
            classes += " bell";
        } else if (this.props.athlete.laps < 1) {
            classes += " finished";
        }
        return (
            <div onClick={this.props.lapCompleted.bind(this, this.props.i)} className={classes} >
                <div className="info">{this.props.athlete.hip_number}. {this.props.athlete.name}</div>
				<Timer start_time={this.props.start_time} />
                <div className="laps">To Go: {this.props.athlete.laps}</div>
            </div>
        );
    }
});