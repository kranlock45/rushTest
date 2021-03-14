const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	output: {
		path: path.resolve(process.cwd(), 'lib'),
		filename: 'secretMessage.min.js',
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	devtool: false,
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /\.test\.ts$/,
				loader: 'ts-loader',
				options: {
					experimentalWatchApi: true,
					experimentalFileCaching: true,
				},
			},
		],
	},
};
