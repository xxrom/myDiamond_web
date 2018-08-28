const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },

  devtool: 'eval',
  devServer: {
    contentBase: './dist',
    hot: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,

      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //       },
      //     },
      //     {
      //       loader: 'postcss-nested',
      //     },
      //     {
      //       loader: 'sass-loader',
      //     },
      //     {
      //       loader: 'postcss-loader',
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                // require('postcss-import'),
                // require('postcss-for'),
                // require('postcss-simple-vars'),
                // require('postcss-custom-properties'),
                require('postcss-nested'),
                // require('postcss-color-function'),
                require('autoprefixer')({
                  browsers: ['last 2 versions', 'ie > 9'],
                }),
              ],
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/',
            },
          },
        ],
      },
    ],
  },

  plugins: [htmlWebpackPlugin, new webpack.HotModuleReplacementPlugin()],
};
