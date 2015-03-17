
var Athlete = React.createClass({
    render: function() {
        var classes = "item";
        if (this.props.athlete.laps == 1) {
            classes += " bell";
        } else if (this.props.athlete.laps < 1) {
            classes += " finished";
        }
        return (
            <div onClick={this.props.lapCompleted.bind(this, this.props.i)} className={classes} >
                <span className="info">{this.props.athlete.hip_number}. {this.props.athlete.name}</span>
                <span className="laps">To Go: {this.props.athlete.laps}</span>
            </div>
        );
    }
});