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

var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){StatusBar[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;StatusBar.prototype=Object.create(____SuperProtoOf____Class0);StatusBar.prototype.constructor=StatusBar;StatusBar.__superConstructor__=____Class0;function StatusBar(){"use strict";if(____Class0!==null){____Class0.apply(this,arguments);}}
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

var ____Class1=React.Component;for(var ____Class1____Key in ____Class1){if(____Class1.hasOwnProperty(____Class1____Key)){Athlete[____Class1____Key]=____Class1[____Class1____Key];}}var ____SuperProtoOf____Class1=____Class1===null?null:____Class1.prototype;Athlete.prototype=Object.create(____SuperProtoOf____Class1);Athlete.prototype.constructor=Athlete;Athlete.__superConstructor__=____Class1;function Athlete(){"use strict";if(____Class1!==null){____Class1.apply(this,arguments);}}
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

var ____Class2=React.Component;for(var ____Class2____Key in ____Class2){if(____Class2.hasOwnProperty(____Class2____Key)){AthleteList[____Class2____Key]=____Class2[____Class2____Key];}}var ____SuperProtoOf____Class2=____Class2===null?null:____Class2.prototype;AthleteList.prototype=Object.create(____SuperProtoOf____Class2);AthleteList.prototype.constructor=AthleteList;AthleteList.__superConstructor__=____Class2;function AthleteList(){"use strict";if(____Class2!==null){____Class2.apply(this,arguments);}}
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

var ____Class3=React.Component;for(var ____Class3____Key in ____Class3){if(____Class3.hasOwnProperty(____Class3____Key)){App[____Class3____Key]=____Class3[____Class3____Key];}}var ____SuperProtoOf____Class3=____Class3===null?null:____Class3.prototype;App.prototype=Object.create(____SuperProtoOf____Class3);App.prototype.constructor=App;App.__superConstructor__=____Class3;
	function App(props) {"use strict";
		____Class3.call(this,props);
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
				React.createElement(AthleteList, {athletes: this.state.athletes}), 
				React.createElement("div", null, "Hello World")
			)
		);
	};
;

React.render(
        React.createElement(App, {mode: "race", data: test_data}),
        document.getElementById('app')
      );