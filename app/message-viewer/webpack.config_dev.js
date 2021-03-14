const webpack = require('webpack');
const { ProvidePlugin } = require('webpack');
const path = require('path');
const { readdirSync } = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const stringifyEnv = require('./configs/env');

const tsLinter = new ForkTsCheckerWebpackPlugin({
	async: true,
	eslint: {
		files: './src/**/*.{ts,tsx,js,jsx}',
	},
});

const getDirectories = readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
	.filter((directory) => directory.isDirectory())
	.map((directory) => directory.name)
	.reduce(
		(aliases, folderName) => ({
			...aliases,
			[`$${folderName}`]: path.resolve(__dirname, `src/${folderName}`),
		}),
		{},
	);

module.exports = {
	target: 'web',
	// https://github.com/TypeStrong/ts-loader#transpileonly
	// typescript doesn't do a full type check, it does not have enough
	// information to determine whether an imported name is a type or not
	stats: {
		warningsFilter: /export .* was not found in/,
	},
	// https://webpack.js.org/configuration/mode/#mode-development
	mode: 'development',
	// https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
	devtool: 'eval-cheap-module-source-map',
	entry: './src/hot.ts',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.png', '.svg', '.css'],
		alias: {
			...getDirectories,
		},
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].[hash].js',
		publicPath: '/',
		// https://webpack.js.org/guides/build-performance/#output-without-path-info
		pathinfo: false,
	},
	devServer: {
		progress: true,
		historyApiFallback: true,
		public: 'http://localhost:8080/',
		compress: true,
		hot: true,
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.module\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: {
								getLocalIdent: getCSSModuleLocalIdent,
							},
						},
					},
				],
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		tsLinter,
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, 'public/index.html'),
		}),
		new InterpolateHtmlPlugin(HtmlWebpackPlugin, env),
		new webpack.DefinePlugin(stringifyEnv(env)),
		new ProvidePlugin({
			regeneratorRuntime: 'regenerator-runtime/runtime',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
