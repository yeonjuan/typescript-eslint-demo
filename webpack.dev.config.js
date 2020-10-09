const { merge } = require("lodash");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-eval-source-map",
  devServer: {
    open: true,
    hot: true,
  },
});
