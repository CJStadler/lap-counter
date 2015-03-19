

var List = React.createClass({
 
  render: function() {
    return (
      <ReactCSSTransitionGroup transitionName="queue">{
        this.props.athletes.map(function(athlete, i) {
            return <Athlete athlete={athlete} key={athlete.hip_number+" "+athlete.laps} start_time={athlete.start_time} lapCompleted={this.props.lapCompleted} i={i}/>;
        }.bind(this))
      }</ReactCSSTransitionGroup>
    );
  }
});
