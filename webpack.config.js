const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],

    entry: {
        server: './src/app/app.ts'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }

};