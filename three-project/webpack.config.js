const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  plugins: [
    // generate dist/index.html
    new HtmlWebpackPlugin(),
  ],
};
