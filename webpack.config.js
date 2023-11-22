const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: glob.sync('./src/assets/scripts/gulp-modules/*.js').reduce((acc, item) => {
    const path1 = item.split('/');
    // path1.pop();
    const name = path1.pop().replace(/\.js/, '');
    console.warn('\x1b[31m', 'Dont use index.js in gulp-modules folder, it will be ignored');
    if (name === 'index-app') {
      acc[name] = './src/assets/scripts/index-app.js';
    }
    else if (name === 'libs') {
      console.log('\x1b[31m', 'libs script ingrored by webpack');
    }
    else {
      acc[name] = item;
    }
    return { ...acc, 'index-app': './src/assets/scripts/index-app.js'};
  }, {}),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './assets/scripts/'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'immediate-loading';
          },
        },
      },
    },
  },
  plugins: [

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: process.argv.includes('--production')
        }
      }
    }),
  ],
};

module.exports = config;
