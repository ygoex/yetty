const path = require('path');

module.exports = {
  entry: ['./src/assets/scripts/index.js'],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src/assets/scripts'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
