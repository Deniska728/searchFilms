const path = require('path')
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: { main: './src/js/index.js' },
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader'
                  },
                ],
            }
        ]
    },
    devServer: {
        stats: 'errors-only',
        contentBase: './dist/',
        port: 9000,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
}  