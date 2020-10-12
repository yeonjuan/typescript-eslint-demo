const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jsx|ts|tsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: [
          /\/eslint\/.*\/rule-tester/,
          /\/eslint\/.*\/cli-engine/,
          /\/resolve-from\/*/,
          /\/\@eslint\/.*\/config-array-factory/,
          /\/\@eslint\/.*\/relative-module-resolver/,
          /\/eslint\/eslint\.js/,
          // /\/@typescript-eslint\/experimental-utils\/dist\/ts-eslint/,
          /\/@typescript-eslint\/experimental-utils\/dist\/ts-eslint\/RuleTester.js/,
          /\/@typescript-eslint\/experimental-utils\/dist\/eslint-utils\/RuleTester.js/,
          /\/@typescript-eslint\/.*\/CLIEngine/,
          // /\/@typescript-eslint\/.*\/globby/,
          /\/@typescript-eslint\/.*\/create-program\/createWatchProgram.js/,
          /\.d\.ts$/,
        ],
        use: "null-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: [["@", "src"]].reduce(
      (prev, [alias, origin]) => ({
        ...prev,
        [alias]: path.resolve(__dirname, origin),
      }),
      {}
    ),
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /resolve\-from/,
      path.resolve(__dirname, "./src/modules/resolve-from.js")
    ),
    new webpack.NormalModuleReplacementPlugin(
      /esquery/,
      path.resolve(__dirname, "./node_modules/esquery/dist/esquery.js")
    ),
    new webpack.NormalModuleReplacementPlugin(
      /globby/,
      path.resolve(__dirname, "./src/modules/globby.js")
    ),
    new HtmlPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname, "./assets/favicon.ico"))
  ],
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/",
  },
};
