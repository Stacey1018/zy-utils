const path = require("path")

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    // library: 'zt-common-utils',
    library: {
      name: "zy-utils",
      type: "umd",
    },
    // 打包生成库可以通过esm/commonjs/reqirejs的语法引入
    // libraryTarget: 'umd',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    // rules: [
    //   {
    //     test: /\.(js|jsx|ts|tsx)$/,
    //     exclude: /(node_modules|bower_components)/,
    //     use: {
    //       loader: "babel-loader",
    //     },
    //   },
    // ],
    rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
  },
  plugins: [],
}
