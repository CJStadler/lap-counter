var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var test_data = [
    {hip_number: 1, name: "Cheadle"},
    {hip_number: 2, name: "Regan"},
    {hip_number: 3, name: "Loeb"},
    {hip_number: 4, name: "Meehan"},
    {hip_number: 5, name: "Riffenburgh"},
]


React.render(
  React.createElement(List, {total_laps: 5, athletes: test_data}), document.getElementById('app')
);