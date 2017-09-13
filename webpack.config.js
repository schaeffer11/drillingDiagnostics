var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path')

const isProduction = process.argv.indexOf('-p') !== -1
console.log('webpack combpile with isProduction=', isProduction)
const distPath = path.join(__dirname, `/dist${ isProduction ? '' : '-dev'}/client`)

const embedFileSize = 65536

module.exports = {
  context: __dirname,
  devtool: isProduction ? 'hidden-source-map' : 'source-map', //cheap-eval-source-map
  entry: {
    app: ['./client/index.js'],
    vendors: [
      'autobind-decorator',
      'classnames',
      'deep-equal',
      'react',
      'react-addons-css-transition-group',
      'react-addons-pure-render-mixin',
      'react-addons-test-utils',
      'react-dom',
      'react-grid-layout',
      'react-measure',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-rpg',
      'react-tabs-redux',
      'redux',
      'redux-immutable',
      'redux-registry',
      'redux-thunk',
    ]
  },
  output: {
    path: distPath + '/js',
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react','stage-0'],
          plugins: ['transform-decorators-legacy',]
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {test: /\.svg$/, loader: `url-loader?limit=${embedFileSize}&mimetype=image/svg+xml`},
      {test: /\.png$/, loader: `url-loader?limit=${embedFileSize}&mimetype=image/png`},
      {test: /\.jpg$/, loader: `url-loader?limit=${embedFileSize}&mimetype=image/jpeg`},
      {test: /\.gif$/, loader: `url-loader?limit=${embedFileSize}&mimetype=image/gif`}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      path.resolve('./client'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new CopyWebpackPlugin([{ from: 'static', to: distPath }]),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' }),
  ]
}
