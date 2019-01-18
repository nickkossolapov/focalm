const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      index: ['@babel/polyfill', './static/src/index.js']
    },
    output: {
      path: __dirname + '/static',
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new webpack.DefinePlugin({'process.env.API_URL': JSON.stringify(env.API_URL)})
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../static'
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../static'
              }
            },
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
  };
};