class App extends React.Component {
  render() {
    return React.createElement("div", null, "Hello ", this.props.name);
  }
}

React.render(
        React.createElement(App, null),
        document.getElementById('app')
      );