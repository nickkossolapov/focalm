module.exports = {
  mode: 'production',
  entry: ['./static/src/index.js'],
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
