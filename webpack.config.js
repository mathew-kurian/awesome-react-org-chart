const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { ESBuildPlugin } = require("awesome-esbuild-loader");

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
    demo: "./src/demo.ts",
  },
  output: {
    path: path.join(__dirname, "public/scripts"),
    filename: "[name].js",
  },
  optimization: {
    minimize: isProduction,
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
            // sourceMap: "external", // Enable sourcemap
            minify: isProduction,
          },
        },
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new ESBuildPlugin(),
  ],
};
