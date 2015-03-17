

var List = React.createClass({
 
  render: function() {
    return (
      <ReactCSSTransitionGroup transitionName="example">{
        this.props.athletes.map(function(athlete, i) {
            return <Athlete athlete={athlete} key={athlete.hip_number+" "+athlete.laps} lapCompleted={this.props.lapCompleted} i={i}/>;
        }.bind(this))
      }</ReactCSSTransitionGroup>
    );
  }
});
