const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
    entry: './client/src/App.js',

    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        hot: true,
        port: 5000,
        open: true,
        historyApiFallback: true,

        // Works for all calls to /api/ reroutes to localhost:3000/api
        proxy: [{
            context: ['/api'],
            target: "http://localhost:3000"
        }]

    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: './client/public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
