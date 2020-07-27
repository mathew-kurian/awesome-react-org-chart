const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { ESBuildPlugin } = require("awesome-esbuild-loader");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: process.env.NODE_ENV,
  watch: !isProduction,
  devServer: {
    hot: !isProduction,
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  entry: {
    bundle: "./src/index.tsx",
    spec: "./spec/spec.ts",
  },
  output: {
    path: path.join(__dirname, "public/scripts"),
    filename: "[name].js",
  },
  stats: "minimal",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "awesome-esbuild-loader",
          options: {
            // All options are optional
            target: "es2015", // default, or 'es20XX', 'esnext'
            jsxFactory: "React.createElement",
            jsxFragment: "React.Fragment",
          },
        },
      },
    ],
  },
  devtool: "source-map",
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new ESBuildPlugin(),
  ],
};
