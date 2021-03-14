const webpack = require('webpack');
const path = require('path');
const { readdirSync } = require('fs');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const getDirectories = readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name)
	.reduce(
		(aliases, folderName) => ({
			...aliases,
			[`$${folderName}`]: path.resolve(__dirname, `src/${folderName}`),
		}),
		{},
	);

module.exports = () => {
	return {
		mode: 'production',
		output: {
			publicPath: '/messageViewer',
			filename: `App.js`,
			libraryTarget: 'system',
			path: path.resolve(process.cwd(), 'lib'),
		},
		devtool: false,
		optimization: {
			mangleExports: 'size',
			innerGraph: true,
			minimize: true,
			minimizer: [
				new TerserPlugin({
					parallel: true,
					terserOptions: {
						// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
					},
				}),
			],
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json', '.png', '.svg', '.css'],
			alias: {
				...getDirectories,
			},
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					// awesome-typescript-loader is dead (last update 2 years ago)
					loader: 'ts-loader',
					// https://webpack.js.org/guides/build-performance/#typescript-loader
					options: {
						transpileOnly: true,
						experimentalWatchApi: true,
						// [?] https://github.com/TypeStrong/ts-loader#onlycompilebundledfiles
						onlyCompileBundledFiles: true,
						// [?] https://github.com/TypeStrong/ts-loader#experimentalfilecaching
						experimentalFileCaching: true,
					},
				},
				{
					exclude: /\.module\.css$/i,
					test: /\.css$/i,
					use: [
						require.resolve('style-loader'),
						{
							loader: require.resolve('css-loader'),
							options: {
								importLoaders: 1,
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
			],
		},
		plugins: [
			new webpack.ProvidePlugin({
				process: 'process/browser',
			}),
			new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
		],
	};
};
