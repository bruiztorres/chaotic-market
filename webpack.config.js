const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = (env, argv) => {
  const prodMode = argv.mode === 'production';
  const envPath = env && env.ENVIRONMENT ? `.env.${env.ENVIRONMENT}` : '.env.default';

  return {
    entry: './src/main.tsx',
    devtool: prodMode ? 'source-map' : 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsConfigPathsPlugin({
        tsconfig: __dirname + '/tsconfig.json'
      })]
    },
    stats: {
      hash: false,
      assets: true,
      timings: true,
      version: false,
      builtAt: false,
      modules: false,
      children: false,
      entrypoints: false,
      assetsSort: '!size',
      excludeAssets: [/\.map$/]
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'js/[name].[hash].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.scss$/,
          use: [
            prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: prodMode,
                prependData: `
                  @import "styles/abstracts/variables";
                `,
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'src')]
                }
              }
            }
          ]
        },
        {
          test: /\.(svg|png|jpe?g)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name() {
                  if (!prodMode) {
                    return '[path][name].[ext]';
                  }

                  return '[contenthash].[ext]';
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      ...(prodMode ? [new CleanWebpackPlugin()] : []),
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin({ filename: 'css/[name].[hash].bundle.css' }),
      new Dotenv({ path: envPath })
    ],
    node: {
      fs: 'empty'
    }
  };
};
