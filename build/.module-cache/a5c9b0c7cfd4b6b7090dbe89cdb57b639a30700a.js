

var List = React.createClass({displayName: "List",
  
   
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
