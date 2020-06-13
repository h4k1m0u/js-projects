const path = require('path');

module.exports = {
    entry: './src/app.js',
    output : {
        filename: 'bundle.js'
    },
    devServer: {
        // folder to serve by webpack-dev-server
        contentBase: path.join(__dirname, 'dist')
    }
}
