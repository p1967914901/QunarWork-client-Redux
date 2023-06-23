const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const packageConfig = require('../package.json');

const proxy = packageConfig.proxy ?? {} // 获取 package.json 中的 代理配置

module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", 'sass-loader']
            }
        ]
    },
    plugins: [
        //  等待代码的类型检查结束，然后才提交代码进行编译
        new ForkTsCheckerWebpackPlugin({
            async: false
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
    ],
    devtool: 'eval-cheap-module-source-map',
    mode: 'development',
    devServer: {
        static: '../dist',
        compress: true,
        port: 3000,
        open: true,
        hot: true,
        proxy,
        historyApiFallback: true
    }
}
