const path = require('path')
const chalk = require('chalk')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const emoji = require('node-emoji')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env) => {
  const isDevelopment = env.dev
  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
    },
    devtool: false,
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          secure: false,
        },
      },
      compress: true,
      port: 3000,
      historyApiFallback: true,
      open: true,
      static: {
        directory: './dist/',
        publicPath: './public/',
      },
      devMiddleware: {
        stats: {
          colors: true,
          hash: false,
          version: false,
          timings: false,
          assets: false,
          chunks: false,
          modules: false,
          reasons: true,
          children: false,
          source: false,
          errors: true,
          errorDetails: true,
          warnings: true,
          publicPath: false,
          verbose: true,
        },
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          include: path.resolve(__dirname, 'src'),
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['node_modules'],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@services': path.resolve(__dirname, './src/services'),
      },
    },
    plugins: (() => {
      const plugins = [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            { from: './public/images', to: 'images' },
          ],
        }),
        new HtmlWebpackPlugin({
          template: './public/index.template.html',
          filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
          filename: isDevelopment ? '[name].css' : '[name]-[contenthash:8].css',
          chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash:8].css',
        }),
        new ProgressBarPlugin({
          format: `Bundling application... ${emoji.get(
            'package',
          )} [${chalk.yellow.bold(':bar')}] ${chalk.yellow.bold(
            ':percent',
          )} (${chalk.blue.bold(':elapsed seconds')})`,
          clear: false,
        }),
      ]
      if (isDevelopment) {
        plugins.push(new ESLintPlugin({
          context: 'src',
          extensions: ['js', 'jsx', 'ts', 'tsx'],
        }))
      }
      return plugins
    })(),
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
  }
}
