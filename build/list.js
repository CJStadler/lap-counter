

var List = React.createClass({displayName: "List",
 
  render: function() {
    return (
      React.createElement(ReactCSSTransitionGroup, {transitionName: "queue"}, 
        this.props.athletes.map(function(athlete, i) {
            return React.createElement(Athlete, {started: this.props.started, athlete: athlete, key: athlete.hip_number+" "+athlete.laps, start_time: athlete.start_time, lapCompleted: this.props.lapCompleted, i: i});
        }.bind(this))
      )
    );
  }
});
