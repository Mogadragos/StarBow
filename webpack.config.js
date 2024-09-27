const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        browser: "./src/browser/main.ts",
        device: "./src/device/main.ts",
    },
    externals: {
        peerjs: "peerjs",
        QRCode: "QRCode",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[chunkhash:8].js",
        sourceMapFilename: "[name].[chunkhash:8].map",
        chunkFilename: "[id].[chunkhash:8].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "StarBow",
            template: "src/browser.html",
            chunks: ["browser"],
        }),
        new HtmlWebpackPlugin({
            filename: "device.html",
            template: "src/device.html",
            chunks: ["device"],
        }),
    ],
    devServer: {
        static: path.join(__dirname, "public"),
        compress: true,
        port: 4000,
        server: "https",
    },
};
