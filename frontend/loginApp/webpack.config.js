
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = 8081;
module.exports = {
  mode: 'development',
  output: {
    publicPath: `http://localhost:${port}/`,
  },
  devServer: {
    host: '0.0.0.0',
    port: port,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
        name: 'login_app',
        filename: 'remoteEntry.js',
        exposes: {
          './LoginApp': './src/index',
        },
      }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};