'use strict';

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') 

module.exports = {
	entry: {
		index: './src/index/index.js',
		search: './src/search/search.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name]_[chunkhash:8].js"
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /.js$/,
				use: 'babel-loader'
			},
			{
				test: /.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
					{
						loader: 'px2rem-loader',
						options: {
							remUnit: 75,
							remPrecision: 8
						}
					}
				]
			},
			{
				test: /.(png|jpg|gif|jpeg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]_[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: /.(woff|woff2|eot|ttf|otf)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]_[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name]_[contenthash:8].css'
		}),
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano')
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/search/index.html'),
			filename: 'search.html',
			chunkes: ['search'],
			chunks: ['search'],
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false
			}
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index/index.html'),
			filename: 'index.html',
			chunkes: ['index'],
			chunks: ['index'],
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false
			}
		}),
		new CleanWebpackPlugin()
	]
}