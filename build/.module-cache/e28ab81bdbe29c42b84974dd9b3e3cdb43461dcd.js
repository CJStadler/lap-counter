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

var ____Class4=React.Component;for(var ____Class4____Key in ____Class4){if(____Class4.hasOwnProperty(____Class4____Key)){StatusBar[____Class4____Key]=____Class4[____Class4____Key];}}var ____SuperProtoOf____Class4=____Class4===null?null:____Class4.prototype;StatusBar.prototype=Object.create(____SuperProtoOf____Class4);StatusBar.prototype.constructor=StatusBar;StatusBar.__superConstructor__=____Class4;function StatusBar(){"use strict";if(____Class4!==null){____Class4.apply(this,arguments);}}
	StatusBar.prototype.render=function() {"use strict";
		return (
			React.createElement("section", {id: "status-bar"}, 
				React.createElement("div", null, this.props.total_meters), 
				React.createElement("div", null, this.props.time), 
				React.createElement("div", null, this.props.laps_remaining)
			)
		);
	};
;

var ____Class5=React.Component;for(var ____Class5____Key in ____Class5){if(____Class5.hasOwnProperty(____Class5____Key)){Athlete[____Class5____Key]=____Class5[____Class5____Key];}}var ____SuperProtoOf____Class5=____Class5===null?null:____Class5.prototype;Athlete.prototype=Object.create(____SuperProtoOf____Class5);Athlete.prototype.constructor=Athlete;Athlete.__superConstructor__=____Class5;function Athlete(){"use strict";if(____Class5!==null){____Class5.apply(this,arguments);}}
	Athlete.prototype.render=function() {"use strict";
		return (
			React.createElement("div", {class: "athlete"}, 
				React.createElement("span", null, this.props.athlete.number), 
				React.createElement("span", null, this.props.athlete.name), 
				React.createElement("span", null, this.props.athlete.current_lap_time)
			)
		);
	};
;

var ____Class6=React.Component;for(var ____Class6____Key in ____Class6){if(____Class6.hasOwnProperty(____Class6____Key)){AthleteList[____Class6____Key]=____Class6[____Class6____Key];}}var ____SuperProtoOf____Class6=____Class6===null?null:____Class6.prototype;AthleteList.prototype=Object.create(____SuperProtoOf____Class6);AthleteList.prototype.constructor=AthleteList;AthleteList.__superConstructor__=____Class6;function AthleteList(){"use strict";if(____Class6!==null){____Class6.apply(this,arguments);}}
	AthleteList.prototype.render=function() {"use strict";
		return (
			React.createElement("section", {id: "athlete-list"}, 
				this.props.athletes.map(function(athlete) {
					return React.createElement(Athlete, {athlete: athlete});
				})
			)
		);
	};
;

var ____Class7=React.Component;for(var ____Class7____Key in ____Class7){if(____Class7.hasOwnProperty(____Class7____Key)){App[____Class7____Key]=____Class7[____Class7____Key];}}var ____SuperProtoOf____Class7=____Class7===null?null:____Class7.prototype;App.prototype=Object.create(____SuperProtoOf____Class7);App.prototype.constructor=App;App.__superConstructor__=____Class7;
	function App(props) {"use strict";
		____Class7.call(this,props);
		this.state = {
			mode: props.mode,
			total_meters: props.data.distance,
			total_laps: props.data.laps,
			time: 0, // number of seconds since start
			laps_remaining: 0, // calculate this from athletes
			athletes: props.data.athletes
		};
	}
	App.prototype.render=function() {"use strict";
		return (
			React.createElement("div", null, 
				React.createElement(StatusBar, {total_meters: this.state.total_meters, time: this.state.time, laps_remaining: this.state.laps_remaining}), 
				React.createElement(AthleteList, {athletes: this.state.athletes})
			)
		);
	};
;

React.render(
        React.createElement(App, {mode: "race", data: test_data}),
        document.getElementById('app')
      );