const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    // generated inside dist/ by default
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // copies images imported in js to dist/images
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // use aliases instead of relative import paths in js
    alias: {
      images: path.resolve(__dirname, 'src/images'),
      dir: path.resolve(__dirname, 'src/dir'),
    },
  },
  plugins: [
    // generate dist/index.html
    new HtmlWebpackPlugin(),
  ],
};
