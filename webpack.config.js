const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,         
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,         
        use: [
          "style-loader",       
          "css-loader",        
        ],
      },
    ],
  },
};