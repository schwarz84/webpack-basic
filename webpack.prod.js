const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports =  {
  mode: 'production',

  output: {
    clean: true,
    filename: 'main.[fullhash].js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: false
        }
      },
      {
        test: /\.css$/,
        exclude: /styles.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
    minimize: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      // filename: "index.html",
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        {from: './src/assets/', to: 'assets/'}
      ]
    })
  ]
};
