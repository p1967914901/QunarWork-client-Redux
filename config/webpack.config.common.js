const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'scripts/[name].[contenthash].js',
        path: resolve(__dirname, '../dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            // 压缩html资源
            // minify: {
            //   collapseWhitespace: true, //去空格
            //   removeComments: true // 去注释
            // }
        }),
    ],
}
