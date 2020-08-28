const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	target: "web",
	mode: 'production',

	entry: {
		app: './src/app/app.js',
		// Add entries if you want to create more pages
	},

	output: {
		filename: '[name]-[chunkhash].min.js',
		path: path.resolve(__dirname, 'public_html')
	},

	module: {
    rules: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: 'babel-loader',
				options: {
          presets: ['@babel/preset-env']
        }
			}
		]},
		{
			test: /\.(sa|sc|c)ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		},
		{
			test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
			use: [
				{
					loader: 'file-loader',
					options: {
						limit: 10000,
						name: "assets/[name].[ext]"
					},
				}
			]
		}
	]},
	optimization: {
		splitChunks: {
      chunks: 'all',
    },
		minimizer: [
			new UglifyJsPlugin(),
			new OptimizeCSSAssetsPlugin({})
		]
	},
  	plugins: [
		new CleanWebpackPlugin(['public_html']),
		new HtmlWebpackPlugin({
			template: __dirname + "/src/public/index.html",
			filename: 'index.html',
			// Remember to exclude chunks of other pages here
			// excludeChunks: [ 'about' ],
			favicon: './src/public/images/favicon.png'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),

		new MiniCssExtractPlugin({
			filename: './[name]-[chunkhash].min.css',
			chunkFilename: '[name].css',
			allChunks: true
		})
	]

};
