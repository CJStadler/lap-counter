var test_data = {
	mode: "race",
	total_meters: 5000,
	total_laps: 25,
	time: 0,
	athletes: [
		{
			name: "Cheadle",
			number: 1,
			seed: 1080,
			laps_completed: 0,
			current_lap_time: 0,
			position: 0
		},
		{
			name: "Regan",
			number: 2,
			seed: 1070,
			laps_completed: 0,
			current_lap_time: 0,
			position: 0
		},
		{
			name: "Loeb",
			number: 3,
			seed: 1050,
			laps_completed: 0,
			current_lap_time: 0,
			position: 0
		},
		{
			name: "Meehan",
			number: 4,
			seed: 1085,
			laps_completed: 0,
			current_lap_time: 0,
			position: 0
		},
	]
};

class StatusBar extends React.Component {
	render() {
		return (
			React.createElement("section", {id: "status-bar"}, 
				React.createElement("div", null, this.props.total_meters), 
				React.createElement("div", null, this.props.time), 
				React.createElement("div", null, this.props.laps_remaining)
			)
		);
	}
};

class Athlete extends React.Component {
	render() {
		return (
			React.createElement("div", {class: "athlete"}, 
				React.createElement("span", null, this.props.athlete.number), 
				React.createElement("span", null, this.props.athlete.name), 
				React.createElement("span", null, this.props.athlete.current_lap_time)
			)
		);
	}
};

class AthleteList extends React.Component {
	render() {
		return (
			React.createElement("section", {id: "athlete-list"}, 
				this.props.athletes.map(function(athlete) {
					return React.createElement(Athlete, {athlete: athlete});
				})
			)
		);
	}
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: props.mode,
			total_meters: props.data.distance,
			total_laps: props.data.laps,
			time: 0, // number of seconds since start
			laps_remaining: 0, // calculate this from athletes
			athletes: props.data.athletes
		};
	}
	
	tick() {
		this.setState({time: this.state.time + 1});
	}
	
	componentDidMount() {
		this.interval = setInterval(this.tick, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
  
	render() {
		return (
			React.createElement("div", null, 
				React.createElement(StatusBar, {total_meters: this.state.total_meters, time: this.state.time, laps_remaining: this.state.laps_remaining}), 
				React.createElement(AthleteList, {athletes: this.state.athletes})
			)
		);
	}
};

React.render(
        React.createElement(App, {mode: "race", data: test_data}),
        document.getElementById('app')
      );