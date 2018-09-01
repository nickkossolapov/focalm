const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = (env) => {
  return {
    mode: 'production',
    entry: {
      index: ['@babel/polyfill', './static/src/index.js']
    },
    output: {
      path: __dirname + '/static',
      publicPath: '/',
      filename: 'bundle.js'
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin()
      ]
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
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
  };
};