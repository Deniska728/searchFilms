const path = require('path')

module.exports = {
    entry: __dirname + '/src/js/index.js',
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
    }
}  