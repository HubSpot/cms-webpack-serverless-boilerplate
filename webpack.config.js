const CopyWebpackPlugin = require("copy-webpack-plugin");
const HubSpotAutoUploadPlugin = require("@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin");
const path = require("path");

const fxConfig = ({ portal, autoupload } = {}) => {
  return {
    target: "node",
    entry: {
      fetchLP: ["./src/app.functions/fetchLP.js"],
      helloWorld: ["./src/app.functions/helloWorld.js"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "app.functions/[name].js",
      libraryTarget: 'umd'
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new HubSpotAutoUploadPlugin({
        portal,
        autoupload,
        src: "dist",
        dest: "cms-webpack-serverless-boilerplate",
      }),
      new CopyWebpackPlugin({ patterns: [
        { from: "src/app.functions/serverless.json", to: "app.functions/serverless.json"},
      ]}),
    ],
  };
};

module.exports = [fxConfig];
