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

var ____Class8=React.Component;for(var ____Class8____Key in ____Class8){if(____Class8.hasOwnProperty(____Class8____Key)){StatusBar[____Class8____Key]=____Class8[____Class8____Key];}}var ____SuperProtoOf____Class8=____Class8===null?null:____Class8.prototype;StatusBar.prototype=Object.create(____SuperProtoOf____Class8);StatusBar.prototype.constructor=StatusBar;StatusBar.__superConstructor__=____Class8;function StatusBar(){"use strict";if(____Class8!==null){____Class8.apply(this,arguments);}}
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

var ____Class9=React.Component;for(var ____Class9____Key in ____Class9){if(____Class9.hasOwnProperty(____Class9____Key)){Athlete[____Class9____Key]=____Class9[____Class9____Key];}}var ____SuperProtoOf____Class9=____Class9===null?null:____Class9.prototype;Athlete.prototype=Object.create(____SuperProtoOf____Class9);Athlete.prototype.constructor=Athlete;Athlete.__superConstructor__=____Class9;function Athlete(){"use strict";if(____Class9!==null){____Class9.apply(this,arguments);}}
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

var ____Classa=React.Component;for(var ____Classa____Key in ____Classa){if(____Classa.hasOwnProperty(____Classa____Key)){AthleteList[____Classa____Key]=____Classa[____Classa____Key];}}var ____SuperProtoOf____Classa=____Classa===null?null:____Classa.prototype;AthleteList.prototype=Object.create(____SuperProtoOf____Classa);AthleteList.prototype.constructor=AthleteList;AthleteList.__superConstructor__=____Classa;function AthleteList(){"use strict";if(____Classa!==null){____Classa.apply(this,arguments);}}
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

var ____Classb=React.Component;for(var ____Classb____Key in ____Classb){if(____Classb.hasOwnProperty(____Classb____Key)){App[____Classb____Key]=____Classb[____Classb____Key];}}var ____SuperProtoOf____Classb=____Classb===null?null:____Classb.prototype;App.prototype=Object.create(____SuperProtoOf____Classb);App.prototype.constructor=App;App.__superConstructor__=____Classb;
	function App(props) {"use strict";
		____Classb.call(this,props);
		this.state = {
			mode: props.mode,
			total_meters: props.data.distance,
			total_laps: props.data.laps,
			time: 0, // number of seconds since start
			laps_remaining: 0, // calculate this from athletes
			athletes: props.data.athletes
		};
	}
	
	App.prototype.tick=function() {"use strict";
		this.setState({time: this.state.time + 1});
	};
	
	App.prototype.componentDidMount=function() {"use strict";
		this.interval = setInterval(this.tick, 1000);
	};
	App.prototype.componentWillUnmount=function() {"use strict";
		clearInterval(this.interval);
	};
  
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