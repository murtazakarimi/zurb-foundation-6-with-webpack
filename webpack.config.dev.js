const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	target: "web",
	mode: 'development',

	entry: {
		app: './src/app/app.js',
		// Add entries if you want to create more pages
	},

	output: {
		path: path.resolve(__dirname, 'public_html'),
		filename: '[name].js'
	},

	devServer: {
    contentBase: path.join(__dirname, 'public_html'),
    compress: true,
		hot: true,
		open: true,
		// host: ,
    port: 9000
	},

	devtool: 'source-map',

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
		},
		{
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'Fonts/',
                        publicPath: '../Fonts/'
                    }
                }]
            }
	]},

	optimization: {
		minimize: false
	},
  	plugins: [
			new HtmlWebpackPlugin({
				template: __dirname + "/src/public/index.html",
				inject: 'body',
				filename: 'index',
				// Remember to exclude chunks of other pages here
				// excludeChunks: [ 'about' ],
				favicon: './src/public/images/favicon.png'
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
			}),

			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css'
			})
		]

};
