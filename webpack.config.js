const path = require('path');

module.exports = {
    mode: "development",
    target: "node",
    entry: {
        app: "./app.ts",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "./dist"),
        clean: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.ts']
    }
}