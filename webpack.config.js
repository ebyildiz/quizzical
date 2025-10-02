// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.js",                          // adjust if your entry lives elsewhere
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: { esmodules: false } }],
              ["@babel/preset-react", { runtime: "automatic" }]
            ],
            plugins: ["@babel/plugin-transform-object-rest-spread"]
          }
        }
      }
    ]
  },
  plugins: [
    // uses your existing index.html as a template and injects the script
    new HtmlWebpackPlugin({ template: "index.html" })
  ],
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname),            // serves your index.html
    port: 8080,
    open: true,
    hot: true
  },
  mode: "development"
};
