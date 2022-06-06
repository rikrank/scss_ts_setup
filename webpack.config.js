const path = require("path");
const publicPath = `${__dirname}/assets`;
const isDevelopment = process.env.NODE_ENV !== "production";

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "inline-source-map" : false,

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        main: "./src/ts/main.ts",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "assets"),
        },
        port: 3000,
    },
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: publicPath,
        // 出力ファイル名
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                // 拡張子 .ts もしくは .tsx の場合
                test: /\.tsx?$/,
                // TypeScript をコンパイルする
                use: "ts-loader",
            },
        ],
    },
    // import 文で .ts や .tsx ファイルを解決するため
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        }),
        ],
    },
    // ES5(IE11等)向けの指定（webpack 5以上で必要）
    target: ["web", "es5"],
};
