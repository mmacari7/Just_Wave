const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
    entry: {
        app: './client/src/components/app.js'
    },
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, 'client/public'),
        filename: 'bundle.js'
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
        port: 3000
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
