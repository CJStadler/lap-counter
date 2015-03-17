var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var test_data = [
    {hip_number: 1, name: "Cheadle"},
    {hip_number: 2, name: "Regan"},
    {hip_number: 3, name: "Loeb"},
    {hip_number: 4, name: "Meehan"},
    {hip_number: 5, name: "Riffenburgh"},
]

var Athlete = React.createClass({displayName: "Athlete",
    render: function() {
        var classes = "item";
        if (this.props.athlete.laps == 1) {
            classes += " bell";
        } else if (this.props.athlete.laps < 1) {
            classes += " finished";
        }
        return (
            React.createElement("div", {onClick: this.props.handleClick.bind(this, i), className: classes}, 
                React.createElement("span", {className: "info"}, this.props.athlete.hip_number, ". ", this.props.athlete.name), 
                React.createElement("span", {className: "laps"}, "To Go: ", this.props.athlete.laps)
            )
        );
    }
});

var List = React.createClass({displayName: "List",
  getInitialState: function() {
      console.log("total laps: " +this.props.total_laps);
      athletes = this.props.athletes.map(function(a) {
          // One less because the first time they come by they will have finished a lap.
          a.laps = this.props.total_laps - 1; 
          return a;
      }.bind(this));
      return { 
          total_laps: this.props.total_laps,
          athletes: athletes
      };
  },
   
  handleClick: function(i) {
    athletes = this.state.athletes.slice();
    athlete = athletes.splice(i, 1)[0];
    athlete.laps -= 1;
    athletes.push(athlete)
    this.setState({athletes: athletes});
   
    console.log('Person ' + this.state.athletes[i].n +" will have "+this.state.athletes[i].laps+" laps.");
   
  },

  render: function() {
    return (
      React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
        this.state.athletes.map(function(athlete, i) {
            return React.createElement(Athlete, {athlete: athlete, key: athlete.hip_number+" "+athlete.laps, handleClick: this.props.handleClick});
        }.bind(this))
      )
    );
  }
});

React.render(
  React.createElement(List, {total_laps: 5, athletes: test_data}), document.getElementById('app')
);