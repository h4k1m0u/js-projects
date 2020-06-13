const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output : {
        // generated inside dist/ by default
        filename: 'bundle.js'
    },
    devServer: {
        // folder to serve by webpack-dev-server
        contentBase: path.join(__dirname, 'dist')
    },
    plugins: [
        // generate dist/index.html
        new HtmlWebpackPlugin()
    ]
}
