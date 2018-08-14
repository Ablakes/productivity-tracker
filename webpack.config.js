const path = require("path");
// This allows us to join the variable __dirname with public/
//docs: https://nodejs.org/api/path.html#path_path_join_paths
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.join(__dirname, "dist"),
        // this has to be the absolute path to the file on our machine, that's why we need __dirname(absolute path) along with path.join to attach the public/ folder on the end.
        filename: "js/bundle.js"
    },
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                //the question mark allows this rule to apply to both css and scss (the s is optional)
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}