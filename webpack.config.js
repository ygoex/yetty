const path = require('path');

module.exports = {
  entry: ['./src/assets/scripts/index.js'],
  output: {
    path: path.resolve(__dirname, 'src/assets/scripts'),
    filename: 'bundle.min.js'
  },
}
