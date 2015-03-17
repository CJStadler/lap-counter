class App extends React.Component {
  render() {
    return React.createElement("div", null, "Hello World");
  }
}

React.render(
        React.createElement(App, null),
        document.getElementById('app')
      );