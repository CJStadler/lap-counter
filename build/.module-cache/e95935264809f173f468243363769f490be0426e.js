
var Athlete = React.createClass({displayName: "Athlete",
    render: function() {
        var classes = "item";
        if (this.props.athlete.laps == 1) {
            classes += " bell";
        } else if (this.props.athlete.laps < 1) {
            classes += " finished";
        }
        return (
            React.createElement("div", {onClick: this.props.handleClick.bind(null, this, this.props.i), className: classes}, 
                React.createElement("span", {className: "info"}, this.props.athlete.hip_number, ". ", this.props.athlete.name), 
                React.createElement("span", {className: "laps"}, "To Go: ", this.props.athlete.laps)
            )
        );
    }
});