const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
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
    new HtmlPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
  output: {
    publicPath: "/",
  },
};
