const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        main: "./src/index.tsx",
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: optimization(),
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 5200,
        hot: isDev
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
        new HTMLWebpackPlugin({
            minify: {
                collapseWhitespace: isProd
            },
            template: path.join(__dirname, "public", "index.html")
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([
        //     {
        //         from: 'somewhere',
        //         to: 'somewhere'
        //     }
        // ])
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: ["ts-loader"]
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /'node_modules'/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
        ],
    },
};