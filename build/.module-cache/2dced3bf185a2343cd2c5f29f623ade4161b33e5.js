

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
            return React.createElement(Athlete, {athlete: athlete, key: athlete.hip_number+" "+athlete.laps, handleClick: this.handleClick, i: i});
        }.bind(null, this))
      )
    );
  }
});
