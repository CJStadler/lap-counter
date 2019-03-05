const path = require('path');

const APP_DIR = './src';
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  entry: APP_DIR + '/client.jsx',
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        use : [
          { loader : 'jsx-loader?insertPragma=React.DOM&harmony' }
        ]
      }
    ]
  }
};
