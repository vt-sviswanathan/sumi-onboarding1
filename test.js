//    "lint:fix": "eslint './src/**/*.{ts,tsx}'",

// "start": "webpack serve --config webpack.config.ts",
//     "build": "webpack --mode production",
//     "lint": "eslint --ext .js,.ts .",

//
// "scripts": {
// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
// "lint": "eslint --ext .js,.ts .",
// "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
// "eject": "react-scripts eject"
// },

// "start": "webpack serve --open",
//     "build": "webpack --mode production",
//
// "start": "webpack-dev-server --open --mode development --hot",
//     "build": "webpack --mode production",

// import path from 'path'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
//
// module.exports = {
//     mode: 'development',
//     entry: './main.tsx',
//     devtool: 'inline-source-map',
//     output: {
//         path: path.join(__dirname, '/dist'),
//         filename: 'bundle.js',
//     },
//     devServer: {
//         static: './dist',
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//             },
//             {
//                 test: /\.tsx?$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js'],
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './index.html',
//         }),
//     ],

// import HtmlWebpackPlugin from 'html-webpack-plugin'
// import * as path from 'path'
//
// module.exports = {
//   mode: 'development',
//   entry: '../src/index.tsx',
//   output: {
//     path: path.join(__dirname, '/dist'),
//     filename: 'bundle.js',
//   },
//   devtool: 'inline-source-map',
//   devServer: {
//     static: './dist',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.jsx', '.ts', '.js'],
//   },
//   plugins: [new HtmlWebpackPlugin()],
//   // plugins: [
//   //   new HtmlWebpackPlugin({
//   //     template: './index.html',
//   //   }),
//   // ],
// }

// import path from 'path'
// import * as webpack from 'webpack'
// import * as webpackDevServer from 'webpack-dev-server'
// import { Configuration } from 'webpack'
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
//
// const config: Configuration = {
//   entry: './src/index.tsx',
//   module: {
//     rules: [
//       {
//         test: /\.(ts|js)x?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//             ],
//           },
//         },
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js',
//   },
//   // devServer: {
//   //   static: path.join(__dirname, 'build'),
//   //   compress: true,
//   //   port: 4000,
//   // },
//   // devServer: { contentBase: path.join(__dirname, "src") },
//   plugins: [new ForkTsCheckerWebpackPlugin()],
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'build'),
//       publicPath: '/scripts',
//     },
//     hot: true,
//     compress: true,
//     port: 3000,
//   },
// }
//
// export default config
