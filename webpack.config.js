const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "client", "src", "index.tsx"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "client", "dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
  devServer: {
    port: 8000,
    proxy: {
      "/api": "http://localhost:3000",
    },
    static: "./client/dist",
  },
};
