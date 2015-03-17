

var List = React.createClass({displayName: "List",
 
  render: function() {
    return (
      React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
        this.state.athletes.map(function(athlete, i) {
            return React.createElement(Athlete, {athlete: athlete, key: athlete.hip_number+" "+athlete.laps, lapCompleted: this.props.lapCompleted, i: i});
        }.bind(null, this))
      )
    );
  }
});
