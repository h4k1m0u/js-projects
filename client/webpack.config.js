const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  entry: './src/index.js',
  output: {
    // generated inside dist/ by default
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // load images imported in js & copy them to dist/images
        test: /\.png|\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        // inject style in index.html, translate it to js, then compile it to css
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    // use aliases instead of relative import paths in js
    alias: {
      modules: path.resolve(__dirname, 'src/modules'),
      images: path.resolve(__dirname, 'src/images'),
      scss: path.resolve(__dirname, 'src/scss'),
    },
  },
  plugins: [
    // inject style & js link into template index.html
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
    }),
  ],
};
