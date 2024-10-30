const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "bundle.js",
      clean: true,
    },
    plugins: [
      new htmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new miniCssExtractPlugin({
        filename: "./styles/main.css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/inline",
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.css$/i,
          use: [miniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.scss$/i,
          use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    }
};