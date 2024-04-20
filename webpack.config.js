const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        main: "./src/game/index.ts",
        controller: "./src/controller/index.ts",
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
        filename: "[name].[hash:8].js",
        sourceMapFilename: "[name].[hash:8].map",
        chunkFilename: "[id].[hash:8].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "StarBow",
            template: "src/index.html",
            chunks: ["main"],
        }),
        new HtmlWebpackPlugin({
            filename: "controller.html",
            template: "src/controller.html",
            chunks: ["controller"],
        }),
    ],
    devServer: {
        static: path.join(__dirname, "public"),
        compress: true,
        port: 4000,
        server: "https",
    },
};
