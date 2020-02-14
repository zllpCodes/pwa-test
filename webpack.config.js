const path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './src',
        historyApiFallback: {
            rewrites: [{
                from: /^\/$/,
                to: 'index.html'
            }]
        },
        port: 8989,
        open: 'http://localhost:8989/',
        // 用localhost才能缓存数据
        // host:'0.0.0.0'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        })
    ]
};

module.exports = config;