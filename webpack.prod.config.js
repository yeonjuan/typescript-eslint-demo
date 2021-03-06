const { merge } = require("lodash");
const baseConfig = require("./webpack.base.config");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          comments: false,
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "./",
  },
});
