const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

function resolveToProjRoot (relPath) {
  return path.resolve(__dirname, relPath);
}

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
          /\/@typescript-eslint\/experimental-utils\/dist\/ts-eslint\/RuleTester.js/,
          /\/@typescript-eslint\/experimental-utils\/dist\/eslint-utils\/RuleTester.js/,
          /\/@typescript-eslint\/.*\/CLIEngine/,
          /\/@typescript-eslint\/.*\/create-program\/createWatchProgram.js/,
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
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {
          outputPath: "assets",
        },
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
      resolveToProjRoot("src/modules/resolve-from.js")
    ),
    new webpack.NormalModuleReplacementPlugin(
      /esquery/,
      resolveToProjRoot("node_modules/esquery/dist/esquery.js")
    ),
    new webpack.NormalModuleReplacementPlugin(
      /globby/,
      resolveToProjRoot("src/modules/globby.js")
    ),
    new HtmlPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new FaviconsWebpackPlugin(resolveToProjRoot("assets/favicon.png")),
    new CopyPlugin({
      patterns: [
        { from: resolveToProjRoot("assets/share.png"), to: "assets" },
      ],
    }),
  ],
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/",
  },
};
