const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV == 'development';
const isProd = !isDev;

const optimization = () => {
 const config = {
    splitChunks: {
    chunks: 'all'
    }
 }
 if (isProd) {
  config.minimizer = [
    new CssMinimizerPlugin(),
    new TerserPlugin()
    ]
 }
  return config
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname,'./src/index.jsx')],
    },
  output: {
     path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['.js', '.json','.png','.jpg'],
    },
    optimization: optimization(),
    devServer: {
      watchFiles: path.join(__dirname, 'src'),
      port: 8080,
      hot: isDev
    },
    devtool: isDev ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
    {
      test: /\.(c|sa|sc)ss$/i,
      use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {},
      },
      'css-loader',
      'postcss-loader',
      'sass-loader',
      ]
    },
    {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.m?ts$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
      test: /\.m?jsx$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
    {
      test: /\.(png|svg|gif|jpe?g|webp)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name][ext]',
      },
      use: {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          webp: {
            quality: 75,
          }
        }
      }
    },
    {
      test: /\.(woff(2)|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name][ext]',
      }, 
    },
    ]
  }
}